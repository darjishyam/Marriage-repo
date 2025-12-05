import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function OtpScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.backArrow} onPress={() => router.back()}>←</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 40, backgroundColor: "#FFF" },
  backArrow: { fontSize: 26, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 10 },
  subtitle: { color: "#6F6F6F", fontSize: 16, marginBottom: 30 },
  otpContainer: { flexDirection: "row", justifyContent: "space-between" },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#E6E6E6",
    textAlign: "center",
    fontSize: 24,
  },
  button: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  resend: { marginTop: 20, textDecorationLine: "underline", color: "#6F6F6F" },
});
