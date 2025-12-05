import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PurchasePremiumScreen() {
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
        <Text style={styles.navTitle}>Purchase Premium</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="diamond" size={80} color="#FFD700" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Upgrade to Premium</Text>

        {/* Description */}
        <Text style={styles.description}>
          Unlock all premium features and enjoy an ad-free experience with PDF export capabilities.
        </Text>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.featureText}>Export data to PDF without ads</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.featureText}>Unlimited entries</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.featureText}>Priority support</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.featureText}>Advanced analytics</Text>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.pricingContainer}>
          <Text style={styles.price}>₹ 299</Text>
          <Text style={styles.pricePeriod}>per month</Text>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>Purchase Premium</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By purchasing, you agree to our Terms of Service and Privacy Policy. Subscription will auto-renew unless cancelled.
        </Text>
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
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 32,
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
    alignItems: "center",
    marginBottom: 32,
  },
  price: {
    fontSize: 48,
    fontWeight: "700",
    color: "#000",
  },
  pricePeriod: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  purchaseButton: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  purchaseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  terms: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
});

