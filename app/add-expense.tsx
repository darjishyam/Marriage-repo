import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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

export default function AddExpenseScreen() {
  const router = useRouter();
  const [expenseFor, setExpenseFor] = useState("Moon");
  const [totalAmount, setTotalAmount] = useState("₹ 2000");
  const [paidDepositAmount, setPaidDepositAmount] = useState("₹ 1000");
  const [pendingAmount, setPendingAmount] = useState("₹ 1000");

  const handleSaveAndAddAnother = () => {
    // TODO: Save expense and reset form
    setExpenseFor("Moon");
    setTotalAmount("₹ 2000");
    setPaidDepositAmount("₹ 1000");
    setPendingAmount("₹ 1000");
  };

  const handleSave = () => {
    // TODO: Save expense and navigate back
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Add New Expense</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Expense For Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expense For</Text>
            <TextInput
              style={styles.input}
              value={expenseFor}
              onChangeText={setExpenseFor}
              placeholder="Moon"
              placeholderTextColor="#999"
            />
          </View>

          {/* Total Amount Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Amount</Text>
            <TextInput
              style={styles.input}
              value={totalAmount}
              onChangeText={setTotalAmount}
              placeholder="₹ 2000"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* Paid Deposit Amount Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Paid Deposit Amount</Text>
            <TextInput
              style={styles.input}
              value={paidDepositAmount}
              onChangeText={setPaidDepositAmount}
              placeholder="₹ 1000"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* Pending Amount Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pending Amount</Text>
            <TextInput
              style={styles.input}
              value={pendingAmount}
              onChangeText={setPendingAmount}
              placeholder="₹ 1000"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveAndAddButton}
            onPress={handleSaveAndAddAnother}
          >
            <Text style={styles.saveAndAddButtonText}>Save And Add Another</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  saveAndAddButton: {
    backgroundColor: "#FFFFFF",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 12,
  },
  saveAndAddButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

