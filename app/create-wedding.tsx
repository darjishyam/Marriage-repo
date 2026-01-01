import { CalendarPicker } from "@/components/CalendarPicker";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWedding } from "@/contexts/WeddingContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function CreateWeddingScreen() {
  const router = useRouter();
  const { createWedding } = useWedding();
  const { t } = useLanguage();
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [groomImage, setGroomImage] = useState<string | null>(null);
  const [brideImage, setBrideImage] = useState<string | null>(null);
  const [marriageDate, setMarriageDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (date: Date) => {
    setMarriageDate(date);
    setShowDatePicker(false);
  };

  const pickImage = async (isGroom: boolean) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(t("permission_denied"), t("permission_denied_msg"));
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      if (isGroom) {
        setGroomImage(imageUri);
      } else {
        setBrideImage(imageUri);
      }
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (groomName.trim() && brideName.trim()) {
      setIsSaving(true);
      try {
        await createWedding({
          groomName: groomName.trim(),
          brideName: brideName.trim(),
          date: marriageDate,
          groomImage: groomImage || undefined,
          brideImage: brideImage || undefined,
        });
        // Navigate back to My Wedding tab
        router.replace("/(tabs)");
      } catch (error: any) {
        console.error("Create wedding error full object:", error);
        const errorMessage = error.response?.data?.message || error.message || "Unknown error";
        alert(`${t("failed_create_wedding")}: ${errorMessage}`);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <ScreenWrapper>
      <CustomHeader title={t("add_new_wedding")} />

      {/* Form Content */}
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <CustomInput
          label={t("groom_name")}
          placeholder="Mirror"
          value={groomName}
          onChangeText={setGroomName}
        />

        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>{t("groom_photo")}</Text>
          <TouchableOpacity onPress={() => pickImage(true)} style={styles.imagePlaceholder}>
            {groomImage ? (
              <Image source={{ uri: groomImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.placeholderContent}>
                <Ionicons name="camera-outline" size={30} color="#999" />
                <Text style={styles.placeholderText}>{t("tap_to_upload")}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomInput
          label={t("bride_name")}
          placeholder="Moon"
          value={brideName}
          onChangeText={setBrideName}
        />

        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>{t("bride_photo")}</Text>
          <TouchableOpacity onPress={() => pickImage(false)} style={styles.imagePlaceholder}>
            {brideImage ? (
              <Image source={{ uri: brideImage }} style={styles.uploadedImage} />
            ) : (
              <View style={styles.placeholderContent}>
                <Ionicons name="camera-outline" size={30} color="#999" />
                <Text style={styles.placeholderText}>{t("tap_to_upload")}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Marriage Date - Custom handled since it's a date picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("marriage_date")}</Text>
          <TouchableOpacity
            style={styles.dateInputContainer}
            onPress={handleDatePress}
          >
            <Text style={styles.dateInputText}>
              {formatDate(marriageDate)}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#999" style={styles.calendarIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={isSaving ? t("saving") : t("save")}
          onPress={handleSave}
          loading={isSaving}
        />
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
              <Text style={styles.modalTitle}>{t("select_date")}</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <CalendarPicker
              selectedDate={marriageDate}
              onDateSelect={handleDateSelect}
              onClose={() => setShowDatePicker(false)}
            />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  inputGroup: {
    marginBottom: 24, // Keep this for the date picker wrapper
  },
  label: {
    fontSize: 14,
    color: "#6F6F6F",
    marginBottom: 6,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9", // Match CustomInput bg
  },
  dateInputText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    height: "100%",
    textAlignVertical: "center",
  },
  calendarIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: Platform.OS === "web" ? "center" : "flex-end",
    alignItems: Platform.OS === "web" ? "center" : undefined,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: Platform.OS === "web" ? 20 : 0,
    borderBottomRightRadius: Platform.OS === "web" ? 20 : 0,
    paddingTop: 20,
    maxHeight: "80%",
    width: Platform.OS === "web" ? "90%" : "100%",
    maxWidth: Platform.OS === "web" ? 400 : undefined,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  imageUploadContainer: {
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignSelf: "center",
    marginTop: 10,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
  },
  placeholderContent: {
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
  },
});
