import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CalendarPicker } from "@/components/CalendarPicker";
import { useShagun } from "@/contexts/ShagunContext";

export default function AddShagunScreen() {
  const router = useRouter();
  const { addShagun } = useShagun();
  const [brideName, setBrideName] = useState("Moon");
  const [groomName, setGroomName] = useState("Mirror");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 1, 14)); // 14-02-2025
  const [shagunAmount, setShagunAmount] = useState("₹ 2000");
  const [gift, setGift] = useState("Gift");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleSave = () => {
    addShagun({
      brideName,
      groomName,
      date: formatDate(selectedDate),
      amount: shagunAmount,
      gift,
      wishes: "happy marriage life",
    });
    router.back();
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
        <Text style={styles.navTitle}>Add New Shagun</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Form Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bride's Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bride's Name</Text>
          <TextInput
            style={styles.input}
            value={brideName}
            onChangeText={setBrideName}
            placeholder="Moon"
            placeholderTextColor="#999"
          />
        </View>

        {/* Groom's Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Groom's Name</Text>
          <TextInput
            style={styles.input}
            value={groomName}
            onChangeText={setGroomName}
            placeholder="Mirror"
            placeholderTextColor="#999"
          />
        </View>

        {/* Select Date Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity
            style={styles.dateInputContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateInputText}>
              {formatDate(selectedDate)}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#999" style={styles.calendarIcon} />
          </TouchableOpacity>
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

        {/* Gift Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gift</Text>
          <TextInput
            style={styles.input}
            value={gift}
            onChangeText={setGift}
            placeholder="Gift"
            placeholderTextColor="#999"
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <CalendarPicker
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onClose={() => setShowDatePicker(false)}
            />
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  dateInputText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  calendarIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  saveButton: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
