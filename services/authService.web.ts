
const WEB_CLIENT_ID = '1062141548138-b076dv3d3c08qk5h137goo3dpb7jhf59.apps.googleusercontent.com';

class AuthService {
    constructor() {
        this.configureGoogleSignIn();
    }

    configureGoogleSignIn() {
        // No-op for web, or pre-load script if desired
    }

    async signInWithGoogle(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof window === 'undefined') {
                reject(new Error("Window is not defined"));
                return;
            }

            // Function to initialize Google Sign In
            const initializeGSI = () => {
                const google = (window as any).google;
                if (!google) {
                    reject(new Error("Google Login script failed to load"));
                    return;
                }

                google.accounts.id.initialize({
                    client_id: WEB_CLIENT_ID,
                    callback: (response: any) => {
                        if (response.credential) {
                            try {
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
                            } catch (e) {
                                reject(e);
                            }
                        } else {
                            reject(new Error("No credential received"));
                        }
                    },
                    auto_select: false,
                    cancel_on_tap_outside: true,
                    ux_mode: 'popup'
                });

                // Explicitly request token using the popup flow
                // This bypasses the automatic "One Tap" prompt which might be blocked by CORS/FedCM
                const tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: WEB_CLIENT_ID,
                    scope: 'email profile openid',
                    callback: (response: any) => {
                        if (response.access_token) {
                            // Fetch user info with the access token
                            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                                headers: { Authorization: `Bearer ${response.access_token}` }
                            })
                                .then(res => res.json())
                                .then(userInfo => {
                                    resolve({
                                        token: response.access_token, // Note: This is an access token, not ID token, but backend might need adjustments or we just use user info
                                        user: {
                                            email: userInfo.email,
                                            id: userInfo.sub,
                                            name: userInfo.name,
                                            photo: userInfo.picture
                                        }
                                    });
                                })
                                .catch(err => reject(err));
                        } else {
                            reject(new Error("No access token received"));
                        }
                    },
                });

                tokenClient.requestAccessToken();
            };

            // Check if script is already present
            if ((window as any).google?.accounts) {
                initializeGSI();
            } else {
                // Load the script dynamically
                const script = document.createElement('script');
                script.src = 'https://accounts.google.com/gsi/client';
                script.async = true;
                script.defer = true;
                script.onload = initializeGSI;
                script.onerror = () => reject(new Error("Failed to load Google GSI script"));
                document.body.appendChild(script);
            }
        });
    }

    async signInWithFacebook(): Promise<any> {
        alert("Facebook Login not implemented for Web yet");
        return null;
    }

    async signInWithPhoneNumber(phoneNumber: string): Promise<any> {
        console.warn("Firebase Auth skipped in Web");
        return null;
    }

    async confirmCode(code: string): Promise<any> {
        console.warn("Confirm code skipped in Web");
        return { user: { uid: 'dummy-uid', email: 'test@example.com' } };
    }

    async signOut() {
        if (typeof window !== 'undefined') {
            const google = (window as any).google;
            if (google) {
                google.accounts.id.disableAutoSelect();
            }
        }
    }

    getCurrentUser() {
        return null;
    }
}

export const authService = new AuthService();
