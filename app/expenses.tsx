import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpensesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
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
          <Image
            source={require("../assets/images/empty_expense.png")}
            style={{ width: 240, height: 240, resizeMode: "contain" }}
          />
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

