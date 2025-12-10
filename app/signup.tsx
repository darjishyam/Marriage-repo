import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
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

          {/* Titles */}
          <Text style={styles.title}>Create a New Account</Text>
          <Text style={styles.subtitle}>Fill full all the details.</Text>

          {/* Inputs */}
          <Text style={styles.label}>Name</Text>
          <TextInput placeholder="moon" style={styles.input} />

          <Text style={styles.label}>Email Address</Text>
          <TextInput placeholder="moon@gmail.com" style={styles.input} />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="+91 99999 99999"
            style={styles.input}
            keyboardType="phone-pad"
          />

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.divider}>OR</Text>

          {/* Apple */}
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={22} color="black" style={{ marginRight: 10 }} />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* Google */}
          <TouchableOpacity style={styles.socialButton}>
            <RNImage
              source={require("../assets/images/Google.png")}
              style={{ width: 22, height: 22, marginRight: 10, resizeMode: 'contain' }}
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity style={styles.socialButton}>
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: "#1877F2",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10
            }}>
              <FontAwesome
                name="facebook"
                size={16}
                color="#FFF"
              />
            </View>
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>

          {/* Bottom Link */}
          <Text style={styles.bottomText}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => router.push("/login")}
            >
              Login
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
    backgroundColor: "#FFF",
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
    marginLeft: -8, // Align with text visually
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
    marginBottom: 20,
    marginTop: 8,
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
    marginBottom: 16,
    backgroundColor: "#F9F9F9", // Slight bg for inputs
  },
  button: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  divider: {
    textAlign: "center",
    marginVertical: 20,
    color: "#6F6F6F",
    fontSize: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  socialText: {
    fontSize: 16,
    color: "#000",
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
