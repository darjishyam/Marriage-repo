import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvitationListScreen() {
  const router = useRouter();

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
        <Text style={styles.navTitle}>Invitation List</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content - Wrapped in ScrollView for responsiveness */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Empty State Content */}
        <View style={styles.emptyContent}>
          {/* People Icon with Decorative Elements */}
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/images/empty_guest.png")}
              style={{ width: 240, height: 240, resizeMode: "contain" }}
            />
          </View>

          {/* Primary Text */}
          <Text style={styles.primaryText}>No Guests Added</Text>

          {/* Secondary Text */}
          <Text style={styles.secondaryText}>Let's Start Preparing guests list.</Text>

          {/* Add New Guest Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add-guest")}
          >
            <Text style={styles.addButtonText}>Add New Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 16,
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
  scrollContent: {
    flexGrow: 1,
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 64,
  },
  iconContainer: {
    marginBottom: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  secondaryText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 32,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    minWidth: 180,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

