import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PurchasePremiumScreen() {
  const router = useRouter();
  const { t } = useLanguage();

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
        <Text style={styles.navTitle}>{t("purchase_premium")}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Card */}
        <View style={styles.premiumCard}>
          {/* Title with Crown */}
          <View style={styles.titleContainer}>
            <Ionicons name="diamond" size={28} color="#FFD700" />
            <Text style={styles.cardTitle}>Shagun</Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.featureText}>{t("ads_free")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.featureText}>{t("export_shagun_pdf")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.featureText}>{t("export_guest_pdf")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.featureText}>{t("export_expense_pdf")}</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.featureText}>{t("support")}</Text>
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.pricingContainer}>
            <Text style={styles.price}>₹120 /{t("per_month")}</Text>
            <View style={styles.saveTag}>
              <Text style={styles.saveTagText}>Save 25%</Text>
            </View>
          </View>

          {/* Purchase Button */}
          <TouchableOpacity style={styles.purchaseButton}>
            <Ionicons name="logo-apple" size={20} color="#FFF" style={styles.appleIcon} />
            <Text style={styles.purchaseButtonText}>{t("pay_apple")}</Text>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  premiumCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8A0030",
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 12,
  },
  pricingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    gap: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  saveTag: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saveTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  purchaseButton: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
  },
  appleIcon: {
    marginRight: 8,
  },
  purchaseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

