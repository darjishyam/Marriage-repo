import { useShagun } from "@/contexts/ShagunContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddShagunScreen() {
  const router = useRouter();
  const { addShagun } = useShagun();
  const [name, setName] = useState("Moon");
  const [shagunAmount, setShagunAmount] = useState("₹ 2000");
  const [city, setCity] = useState("Surat");
  const [gift1, setGift1] = useState("Gift");
  const [contact, setContact] = useState("+91 99999 99999");
  const [gift2, setGift2] = useState("Gift");

  const handleSave = () => {
    addShagun({
      brideName: name,
      groomName: "",
      date: new Date().toISOString(),
      amount: shagunAmount,
      gift: gift1,
      wishes: gift2,
    });
    router.back();
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Add New Shagun</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Name Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Moon"
              placeholderTextColor="#999"
            />
          </View>

          {/* Shagun Amount Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Shagun Amount</Text>
            <TextInput
              style={styles.input}
              value={shagunAmount}
              onChangeText={setShagunAmount}
              placeholder="₹ 2000"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* City/Village Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City/Village</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Surat"
              placeholderTextColor="#999"
            />
          </View>

          {/* Gift Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gift</Text>
            <TextInput
              style={styles.input}
              value={gift1}
              onChangeText={setGift1}
              placeholder="Gift"
              placeholderTextColor="#999"
            />
          </View>

          {/* Contact Number Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              value={contact}
              onChangeText={setContact}
              placeholder="+91 99999 99999"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>

          {/* Gift Field 2 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gift</Text>
            <TextInput
              style={styles.input}
              value={gift2}
              onChangeText={setGift2}
              placeholder="Gift"
              placeholderTextColor="#999"
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#666",
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
    fontWeight: "600",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
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
