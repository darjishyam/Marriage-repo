import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import CustomInput from "@/components/CustomInput";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useShagun } from "@/contexts/ShagunContext";
import { useWedding } from "@/contexts/WeddingContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function AddShagunScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  const isEdit = !!id;

  const { addShagun, updateShagun, shagunEntries } = useShagun();
  const { weddingData } = useWedding();
  const { t } = useLanguage();

  const [name, setName] = useState("Moon");
  const [shagunAmount, setShagunAmount] = useState("₹ 2000");
  const [city, setCity] = useState("Surat");
  const [gift1, setGift1] = useState("Gift");
  const [contact, setContact] = useState("9999999999");
  const [wishes, setWishes] = useState("");

  // Initialize with wedding date or today if not found
  const [date, setDate] = useState(
    weddingData?.date ? new Date(weddingData.date) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (isEdit && shagunEntries) {
      const entry = shagunEntries.find((s: any) => s.id === id || s._id === id);
      if (entry) {
        setName(entry.name);
        setShagunAmount(entry.amount.toString());
        setCity(entry.city || "");
        setGift1(entry.gift || "");
        setContact(entry.contact || "");
        setWishes(entry.wishes || "");
        if (entry.date) {
          setDate(new Date(entry.date));
        }
      }
    }
  }, [id, shagunEntries]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'web' && event?.nativeEvent?.target?.value) {
      setDate(new Date(event.nativeEvent.target.value));
      return;
    }
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const handleSave = () => {
    // Validation
    if (!name.trim() || !shagunAmount.trim() || !city.trim() || !gift1.trim() || !contact.trim() || !wishes.trim()) {
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("all_fields_mandatory"),
      });
      return;
    }

    // Contact Number Validation (10 digits)
    const cleanedContact = contact.replace(/\D/g, ""); // Remove non-digits
    const digits = cleanedContact.slice(-10);
    if (cleanedContact.length < 10 || digits.length !== 10) {
      Toast.show({
        type: "error",
        text1: t("error"),
        text2: t("mobile_invalid"),
      });
      return;
    }

    const shagunData = {
      name: name,
      date: date.toISOString(),
      amount: shagunAmount,
      city: city,
      contact: contact,
      gift: gift1,
      wishes: wishes,
      type: 'received',
    };

    if (isEdit) {
      updateShagun(id as string, shagunData);
    } else {
      addShagun(shagunData);
    }
    router.back();
  };

  const handleSaveAndAddAnother = () => {
    handleSave();
  };

  return (
    <ScreenWrapper>
      <CustomHeader title={isEdit ? t("edit_shagun") : t("add_new_shagun")} />

      {/* Form Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CustomInput
          label={t("name")}
          value={name}
          onChangeText={setName}
          placeholder="Moon"
        />

        {/* Date Picker Input */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: '500' }}>
            {t("marriage_date") || "Marriage Date"}
          </Text>

          {Platform.OS === 'web' ? (
            <View style={{
              height: 50,
              backgroundColor: '#FAFAFA',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#EEEEEE',
              justifyContent: 'center',
              paddingHorizontal: 10
            }}>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
                style={{ width: '100%', height: '100%', opacity: 1 }}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  height: 50,
                  backgroundColor: '#FAFAFA',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  paddingHorizontal: 16,
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: 16, color: '#000' }}>{formattedDate}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </>
          )}
        </View>

        <CustomInput
          label={t("shagun_amount")}
          value={shagunAmount}
          onChangeText={setShagunAmount}
          placeholder="₹ 2000"
          keyboardType="numeric"
        />

        <CustomInput
          label={t("city_village")}
          value={city}
          onChangeText={setCity}
          placeholder="Surat"
        />

        <CustomInput
          label={t("gift")}
          value={gift1}
          onChangeText={setGift1}
          placeholder={t("gift")}
        />

        <CustomInput
          label={t("contact_number")}
          value={contact}
          onChangeText={setContact}
          placeholder="99999 99999"
          keyboardType="phone-pad"
          maxLength={10}
          prefix="+91"
        />

        <CustomInput
          label={t("wishes_message")}
          value={wishes}
          onChangeText={setWishes}
          placeholder={t("wishes_placeholder")}
          multiline
        />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {!isEdit && (
          <CustomButton
            title={t("save_and_add_another")}
            onPress={handleSaveAndAddAnother}
            variant="outline"
            style={{ marginBottom: 12 }}
          />
        )}
        <CustomButton
          title={isEdit ? t("update") : t("save")}
          onPress={handleSave}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
});
