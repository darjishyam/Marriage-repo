import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DeleteAccountScreen() {
  const router = useRouter();

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic
    // After deletion, navigate to login or home
    router.push("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Delete Account</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Trash Icon with Decorative Elements */}
        <View style={styles.iconContainer}>
          {/* Decorative dots */}
          <View style={[styles.decorativeDot, { top: 30, left: 50 }]} />
          <View style={[styles.decorativeDot, { top: 70, right: 60 }]} />
          <View style={[styles.decorativeDot, { bottom: 50, left: 40 }]} />
          <View style={[styles.decorativeDot, { bottom: 70, right: 50 }]} />
          <View style={[styles.decorativeDot, { top: 50, left: 20 }]} />
          <View style={[styles.decorativeDot, { top: 90, right: 30 }]} />

          {/* Decorative circles */}
          <View style={[styles.decorativeCircle, { top: 40, right: 40 }]} />
          <View style={[styles.decorativeCircle, { bottom: 60, left: 60 }]} />
          <View style={[styles.decorativeCircle, { top: 20, right: 20 }]} />

          {/* Decorative stars */}
          <View style={[styles.decorativeStar, { top: 60, left: 30 }]} />
          <View style={[styles.decorativeStar, { bottom: 40, right: 30 }]} />

          {/* Trash icon */}
          <Ionicons name="trash-outline" size={140} color="#E0E0E0" />
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Delete Account</Text>

        {/* Warning Text */}
        <Text style={styles.warningText}>
          Are you sure you want to delete your account? This action is irreversible. Once deleted, you will lose access to your account permanently, and all associated data will be erased.
        </Text>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 8 : 16,
    paddingBottom: 12,
    borderBottomWidth: 0,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 88 : 64,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 48,
    alignItems: "center",
    justifyContent: "center",
    width: 240,
    height: 240,
  },
  decorativeDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },
  decorativeCircle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  decorativeStar: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "#D0D0D0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
    textAlign: "center",
  },
  warningText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    minWidth: 200,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

