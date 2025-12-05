import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ExpensesScreen() {
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
        <Text style={styles.navTitle}>Expenses</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Empty State Content */}
      <View style={styles.emptyContent}>
        {/* Dollar Icon with Decorative Elements */}
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
          
          {/* Dollar icon in circle */}
          <View style={styles.dollarIconContainer}>
            <Text style={styles.dollarIcon}>$</Text>
          </View>
        </View>

        {/* Primary Text */}
        <Text style={styles.primaryText}>No Expense Added</Text>

        {/* Secondary Text */}
        <Text style={styles.secondaryText}>Start Managing your Wedding expenses</Text>

        {/* Add Expense Button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push("/add-expense")}
        >
          <Text style={styles.addButtonText}>Add Expense</Text>
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
  emptyContent: {
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
  dollarIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  dollarIcon: {
    fontSize: 60,
    fontWeight: "300",
    color: "#E0E0E0",
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
    borderRadius: 10,
    minWidth: 180,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

