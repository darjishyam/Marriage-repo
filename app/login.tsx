import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Arrow */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Log In</Text>
          <Text style={styles.subtitle}>Log in with Phone Number</Text>

          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            placeholder="+91 99999 99999"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => router.push("/otp")}
          >
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Don't have an account?{" "}
            <Text style={styles.link} onPress={() => router.push("/signup")}>
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backArrow: {
    fontSize: 26,
    color: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#6F6F6F",
    marginTop: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#6F6F6F",
    marginBottom: 6,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
  },
  button: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  bottomText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#6F6F6F",
  },
  link: {
    color: "#000",
    fontWeight: "700",
  },
});
