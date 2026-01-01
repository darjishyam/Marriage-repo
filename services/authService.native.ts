import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

const WEB_CLIENT_ID = '1062141548138-b076dv3d3c08qk5h137goo3dpb7jhf59.apps.googleusercontent.com';

class AuthService {
    constructor() {
        this.configureGoogleSignIn();
    }

    configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            offlineAccess: true,
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
                                const jwt = response.credential;
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

                    google.accounts.id.prompt((notification: any) => {
                        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                            console.log("Google prompt skipped details:", notification);
                        }
                    });
                });
            }

            if ((Platform.OS as string) !== 'web') {
                await GoogleSignin.hasPlayServices();
                try {
                    await GoogleSignin.signOut();
                    await GoogleSignin.revokeAccess(); // Force account chooser
                } catch (e) {
                    console.log("Sign out/revoke error (ignored):", e);
                }
            }
            const userInfo = await GoogleSignin.signIn();
            const { idToken, user } = userInfo.data || {};

            if (!idToken || !user) {
                throw new Error('Google Sign-In failed to return user data');
            }

            return { token: idToken, user: user };
        } catch (error: any) {
            console.error('Detailed Google Sign-In Error:', JSON.stringify(error, null, 2));
            return null;
        }
    }

    async signInWithFacebook(): Promise<any> {
        try {
            if ((Platform.OS as string) === 'web') {
                alert("Facebook Login not implemented for Web yet");
                return null;
            }

            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

            if (result.isCancelled) {
                console.log("Login cancelled");
                return null;
            }

            // Get Access Token
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                throw new Error("Something went wrong obtaining access token");
            }

            // Fetch clean profile data using Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,name,email,picture.type(large)`);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Graph API returned ${response.status}: ${text}`);
            }

            const profile = await response.json();

            return {
                token: data.accessToken,
                user: {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    photo: profile.picture?.data?.url
                }
            };

        } catch (error: any) {
            console.error("Facebook Login Error:", error);
            throw error;
        }
    }

    async signInWithPhoneNumber(phoneNumber: string): Promise<any> {
        console.warn("Firebase Auth skipped in Expo Go");
        return null;
    }

    async confirmCode(code: string): Promise<any> {
        console.warn("Confirm code skipped in Expo Go");
        return { user: { uid: 'dummy-uid', email: 'test@example.com' } };
    }

    async signOut() {
        try {
            await GoogleSignin.signOut();
            LoginManager.logOut();
        } catch (error) {
            console.error(error);
        }
    }

    getCurrentUser() {
        return null;
    }
}

export const authService = new AuthService();
