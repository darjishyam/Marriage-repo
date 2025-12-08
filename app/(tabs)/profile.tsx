import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("hi_moon")} 👋</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image 
            source={require("../../assets/images/bride.jpg")}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Moon</Text>
            <Text style={styles.profileEmail}>moon@gmail.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>{t("edit")}</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {/* Purchase Premium */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push("/purchase-premium")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="diamond-outline" size={22} color="#FFD700" />
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemText}>{t("purchase_premium")}</Text>
                <Text style={styles.menuItemSubtext}>{t("export_data_pdf")}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {/* Change Language */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowLanguageModal(true)}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="globe-outline" size={22} color="#000" />
              <Text style={styles.menuItemText}>{t("change_language")}</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.changeButtonText}>{t("change")}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>

          {/* Terms of Service */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push("/terms-of-service")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="document-text-outline" size={22} color="#000" />
              <Text style={styles.menuItemText}>{t("terms_of_service")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {/* Delete Account */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push("/delete-account")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="trash-outline" size={22} color="#000" />
              <Text style={styles.menuItemText}>{t("delete_account")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {/* Contact Us */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="mail-outline" size={22} color="#000" />
              <Text style={styles.menuItemText}>{t("contact_us")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {/* Connect on Instagram */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="logo-instagram" size={22} color="#E4405F" />
              <Text style={styles.menuItemText}>{t("connect_instagram")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {/* Log out */}
          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="log-out-outline" size={22} color="#000" />
              <Text style={styles.menuItemText}>{t("log_out")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Change Language Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowLanguageModal(false)}
          />
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t("change_language")}</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Language Options */}
            <View style={styles.languageOptions}>
              <TouchableOpacity 
                style={styles.languageOption}
                onPress={() => setLanguage("English")}
              >
                <View style={styles.radioButton}>
                  {language === "English" && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.languageOptionText}>English</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.languageOption}
                onPress={() => setLanguage("Gujrati")}
              >
                <View style={styles.radioButton}>
                  {language === "Gujrati" && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.languageOptionText}>ગુજરાતી</Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Text style={styles.cancelButtonText}>{t("cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => setShowLanguageModal(false)}
              >
                <Text style={styles.saveButtonText}>{t("save")}</Text>
              </TouchableOpacity>
            </View>
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
    paddingBottom: Platform.OS === "ios" ? 88 : 64,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    flexGrow: 1,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginLeft: 0,
  },
  menuItemSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF0000",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  languageOptions: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  languageOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  modalActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  saveButton: {
    flex: 1,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
