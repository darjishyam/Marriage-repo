import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    deleteAccount as deleteAccountAction,
    forgotPassword as forgotPasswordAction,
    login as loginAction,
    logout as logoutAction,
    register as registerAction,
    reloadUser as reloadUserAction,
    resetPassword as resetPasswordAction,
    signInWithApple as signInWithAppleAction,
    signInWithFacebook as signInWithFacebookAction,
    signInWithGoogle as signInWithGoogleAction,
    verifyOtp as verifyOtpAction
} from '../store/slices/authSlice';

// We keep the interface to satisfy existing code, mostly inferred
export function useAuth() {
    const dispatch = useAppDispatch();
    const { user, isLoading, isDemo } = useAppSelector(state => state.auth);

    const login = async (email: string, password: string) => {
        await dispatch(loginAction({ email, password })).unwrap();
    };

    const register = async (name: string, email: string, mobile: string, password: string, firebaseVerified?: boolean) => {
        const result = await dispatch(registerAction({ name, email, mobile, password, firebaseVerified })).unwrap();
        return result;
    };

    const verifyOtp = async (mobile: string, otp: string) => {
        await dispatch(verifyOtpAction({ mobile, otp })).unwrap();
    };

    const logout = async () => {
        await dispatch(logoutAction());
    };

    const reloadUser = async () => {
        await dispatch(reloadUserAction());
    };

    const deleteAccount = async () => {
        await dispatch(deleteAccountAction());
    };

    const signInWithGoogle = async () => {
        await dispatch(signInWithGoogleAction()).unwrap();
    };

    const signInWithFacebook = async () => {
        await dispatch(signInWithFacebookAction()).unwrap();
    };

    const signInWithApple = async () => {
        await dispatch(signInWithAppleAction()).unwrap();
    };

    const forgotPassword = async (email: string) => {
        await dispatch(forgotPasswordAction({ email })).unwrap();
    };

    const resetPassword = async (token: string, password: string) => {
        return await dispatch(resetPasswordAction({ token, password })).unwrap();
    };

    return {
        user,
        isLoading,
        isDemo,
        login,
        register,
        verifyOtp,
        logout,
        reloadUser,
        deleteAccount,
        signInWithGoogle,
        signInWithFacebook,
        signInWithApple,
        forgotPassword,
        resetPassword
    };
}

// Dummy Provider to prevent crashes if I missed removing it somewhere, but ideally unused.
export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
