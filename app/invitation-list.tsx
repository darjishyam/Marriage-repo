import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

            {/* People icon */}
            <View style={styles.peopleIconContainer}>
              <View style={styles.peopleGroup}>
                {/* Person 1 */}
                <View style={[styles.personHead, { left: 0, top: 0 }]} />
                <View style={[styles.personBody, { left: 5, top: 20 }]} />
                {/* Person 2 */}
                <View style={[styles.personHead, { left: 35, top: 0 }]} />
                <View style={[styles.personBody, { left: 40, top: 20 }]} />
                {/* Person 3 */}
                <View style={[styles.personHead, { left: 70, top: 0 }]} />
                <View style={[styles.personBody, { left: 75, top: 20 }]} />
              </View>
            </View>
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
  peopleIconContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  peopleGroup: {
    position: "relative",
    width: 105,
    height: 60,
  },
  personHead: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  personBody: {
    position: "absolute",
    width: 10,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#E0E0E0",
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

