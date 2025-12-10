import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image as RNImage, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();  // ✅ FIXED

  return (
    <View style={styles.container}>

      {/* Back Arrow */}
      <Text style={styles.backArrow} onPress={() => router.back()}>←</Text>

      {/* Titles */}
      <Text style={styles.title}>Create a New Account</Text>
      <Text style={styles.subtitle}>Full fill all the details.</Text>

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
      <View style={styles.socialButton}>
        <Ionicons name="logo-apple" size={22} color="black" style={{ marginRight: 10 }} />
        <Text style={styles.socialText}>Continue with Apple</Text>
      </View>

      {/* Google */}
      <View style={styles.socialButton}>
        <RNImage
          source={require("../assets/images/Google.png")}
          style={{ width: 22, height: 22, marginRight: 10, resizeMode: 'contain' }}
        />
        <Text style={styles.socialText}>Continue with Google</Text>
      </View>

      {/* Facebook */}
      <View style={styles.socialButton}>
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
      </View>

      {/* Bottom Link */}
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Already have an account?{" "}
        <Text
          style={{ fontWeight: "700" }}
          onPress={() => router.push("/login")}  // ✅ FIXED
        >
          Login
        </Text>
      </Text>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#FFF",
  },

  backArrow: {
    fontSize: 26,
    marginBottom: 20,
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
    marginBottom: 16,
  },

  socialText: {
    fontSize: 16,
    color: "#000",
  },

  bottomText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#6F6F6F",
  },

  link: {
    color: "#000",
    fontWeight: "600",
  },
});
