import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        
        <Text style={styles.backArrow}>←</Text>

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

        <Text style={{ textAlign: "center", marginTop: 20 }}>
  Don't have an account?{" "}
  <Text style={{ fontWeight: "700" }} onPress={() => router.push("/signup")}>
    Sign Up
  </Text>
</Text>


      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#FFFFFF",
  },
  backArrow: {
    fontSize: 26,
    marginBottom: 20,
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
});
