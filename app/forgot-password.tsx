import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendLink = async () => {
        if (!email) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter your email address",
            });
            return;
        }

        setLoading(true);
        try {
            await forgotPassword(email);
            Toast.show({
                type: "success",
                text1: "Email Sent",
                text2: "Check your email for the reset link",
            });
            // Optional: navigate back or stay to allow resend
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: typeof error === 'string' ? error : (error.message || "Failed to send email"),
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <CustomHeader title="Forgot Password" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                    Enter your email to receive a password reset link.
                </Text>

                <CustomInput
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Ex: johndoe@gmail.com"
                    keyboardType="email-address"
                />

                <CustomButton
                    title={loading ? "Sending..." : "Send Reset Link"}
                    onPress={handleSendLink}
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
