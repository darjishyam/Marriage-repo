import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            Please check your phone to see the verification code.
          </Text>

          <View style={styles.otpContainer}>
            <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
            <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
            <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
            <TextInput style={styles.otpBox} maxLength={1} keyboardType="number-pad" />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>

          <Text style={styles.resend}>Resend Code In 29 Sec</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollContent: { padding: 24, flexGrow: 1 },
  backArrow: { fontSize: 26, marginBottom: 20, color: '#000' },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 10, color: '#000' },
  subtitle: { color: "#6F6F6F", fontSize: 16, marginBottom: 30 },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    width: "100%",
    maxWidth: 320, // Constrain width on web/tablets
    alignSelf: "center", // Center the container
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#E6E6E6",
    textAlign: "center",
    fontSize: 24,
    color: '#000',
  },
  button: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  resend: { marginTop: 20, textDecorationLine: "underline", color: "#6F6F6F", textAlign: 'center' },
});
