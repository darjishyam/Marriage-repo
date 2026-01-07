import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { token } = useLocalSearchParams();
    const { resetPassword } = useAuth();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleResetPassword = async () => {
        if (!token) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Invalid or missing token",
            });
            return;
        }

        if (!password || !confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "All fields are mandatory",
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Passwords do not match",
            });
            return;
        }

        setLoading(true);
        try {
            await resetPassword(token as string, password);
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Password reset successfully",
            });
            router.replace("/login");
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: typeof error === 'string' ? error : (error.message || "Failed to reset password"),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <CustomHeader title="Reset Password" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>New Password</Text>
                <Text style={styles.subtitle}>
                    Create a new strong password for your account.
                </Text>

                <CustomInput
                    label="New Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    onRightIconPress={() => setShowPassword(!showPassword)}
                    rightIcon={showPassword ? "eye-off" : "eye"}
                />

                <CustomInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••"
                    secureTextEntry={!showConfirmPassword}
                    onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    rightIcon={showConfirmPassword ? "eye-off" : "eye"}
                />

                <CustomButton
                    title={loading ? "Resetting..." : "Reset Password"}
                    onPress={handleResetPassword}
                    loading={loading}
                    style={{ marginTop: 20 }}
                />
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 24,
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 10,
        color: "#000",
    },
    subtitle: {
        color: "#6F6F6F",
        fontSize: 16,
        marginBottom: 30,
    },
});
