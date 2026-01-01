import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShagunBookScreen() {
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
        <Text style={styles.navTitle}>Shagun Book</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content - Wrapped in ScrollView to ensure availability on small screens even if empty */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Empty State Content */}
        <View style={styles.emptyContent}>
          {/* Book Icon with Decorative Elements */}
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

            {/* Book icon */}
            <Ionicons name="book-outline" size={140} color="#E0E0E0" />
          </View>

          {/* Primary Text */}
          <Text style={styles.primaryText}>No Shagun Added</Text>

          {/* Secondary Text */}
          <Text style={styles.secondaryText}>Save your wedding chandla forever</Text>

          {/* Add Shagun Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add-shagun")}
          >
            <Text style={styles.addButtonText}>Add Shagun</Text>
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

