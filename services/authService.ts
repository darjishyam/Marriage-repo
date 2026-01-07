import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';

const WEB_CLIENT_ID = '1062141548138-b076dv3d3c08qk5h137goo3dpb7jhf59.apps.googleusercontent.com';

class AuthService {
    constructor() {
        this.configureGoogleSignIn();
    }

    configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }

    async signInWithGoogle(): Promise<any> {
        try {
            if ((Platform.OS as string) === 'web') {
                return new Promise((resolve, reject) => {
                    const google = (window as any).google;
                    if (!google) {
                        reject(new Error("Google Login script not loaded"));
                        return;
                    }

                    google.accounts.id.initialize({
                        client_id: WEB_CLIENT_ID,
                        use_fedcm_for_prompt: false,
                        callback: (response: any) => {
                            if (response.credential) {
                                // Decode JWT to get user info (optional, or let backend do it)
                                const jwt = response.credential;
                                // Simple decode for UI (payload is part 2)
                                const payload = JSON.parse(atob(jwt.split('.')[1]));

                                resolve({
                                    token: jwt,
                                    user: {
                                        email: payload.email,
                                        id: payload.sub,
                                        name: payload.name,
                                        photo: payload.picture
                                    }
                                });
                            } else {
                                reject(new Error("No credential received"));
                            }
                        }
                    });

                    // Show the prompt (One Tap / Account Chooser with 'use_fedcm_for_prompt': true default)
                    google.accounts.id.prompt((notification: any) => {
                        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                            console.log("Google prompt skipped details:", {
                                isNotDisplayed: notification.isNotDisplayed(),
                                isSkippedMoment: notification.isSkippedMoment(),
                                skippedReason: notification.getSkippedReason ? notification.getSkippedReason() : "unknown",
                                isDisplayMoment: notification.isDisplayMoment(),
                            });
                            // If it's origin_mismatch, we can alert the user
                            if (notification.getSkippedReason && notification.getSkippedReason() === "origin_mismatch") {
                                alert("Google Sign-In Failed: Origin Mismatch. Please add http://localhost:8081 (and 8082) to Authorized Origins in Google Cloud Console.");
                            }
                        }
                    });
                });
            }

            if ((Platform.OS as string) !== 'web') {
                await GoogleSignin.hasPlayServices();
            }
            const userInfo = await GoogleSignin.signIn();
            const { idToken, user } = userInfo.data || {};

            if (!idToken || !user) {
                throw new Error('Google Sign-In failed to return user data');
            }

            return { token: idToken, user: user };
        } catch (error: any) {
            console.error('Detailed Google Sign-In Error:', JSON.stringify(error, null, 2));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signin in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available or outdated');
            } else {
                console.error('Check your google sign in configuration', error);
                throw error;
            }
            return null;
        }
    }

    async signInWithApple(): Promise<any> {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            return {
                token: credential.identityToken,
                user: {
                    email: credential.email,
                    name: credential.fullName ? `${credential.fullName.givenName || ''} ${credential.fullName.familyName || ''}`.trim() : null,
                    id: credential.user
                }
            };
        } catch (e: any) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
                return null; // User canceled
            }
            throw e;
        }
    }

    async signInWithFacebook(): Promise<any> {
        throw new Error('Not implemented: Platform specific module should be loaded');
    }

    async signInWithPhoneNumber(phoneNumber: string): Promise<any> {
        console.warn("Firebase Auth skipped in Expo Go");
        return null; // Implement actual Firebase Phone Auth if needed
    }

    async confirmCode(code: string): Promise<any> {
        console.warn("Confirm code skipped in Expo Go");
        return { user: { uid: 'dummy-uid', email: 'test@example.com' } };
    }

    async signOut() {
        try {
            await GoogleSignin.signOut();
            // await auth().signOut();
        } catch (error) {
            console.error(error);
        }
    }

    getCurrentUser() {
        // return auth().currentUser;
        return null;
    }
}

export const authService = new AuthService();
