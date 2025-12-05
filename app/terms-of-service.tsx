import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TermsOfServiceScreen() {
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
        <Text style={styles.navTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Last Updated */}
        <Text style={styles.lastUpdated}>Last updated: January 1, 2025</Text>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By accessing and using the Shagun application, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>

          <Text style={styles.sectionTitle}>2. Use License</Text>
          <Text style={styles.sectionText}>
            Permission is granted to temporarily use Shagun for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </Text>

          <Text style={styles.sectionTitle}>3. User Account</Text>
          <Text style={styles.sectionText}>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
          </Text>

          <Text style={styles.sectionTitle}>4. Premium Subscription</Text>
          <Text style={styles.sectionText}>
            Premium subscriptions are billed on a monthly basis and will automatically renew unless cancelled. You may cancel your subscription at any time through your account settings.
          </Text>

          <Text style={styles.sectionTitle}>5. Data Export</Text>
          <Text style={styles.sectionText}>
            Premium users can export their data to PDF format. The exported data is for personal use only and may not be redistributed or used for commercial purposes.
          </Text>

          <Text style={styles.sectionTitle}>6. Privacy</Text>
          <Text style={styles.sectionText}>
            Your use of Shagun is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
          </Text>

          <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
          <Text style={styles.sectionText}>
            In no event shall Shagun or its suppliers be liable for any damages arising out of the use or inability to use the materials on Shagun's application.
          </Text>

          <Text style={styles.sectionTitle}>8. Modifications</Text>
          <Text style={styles.sectionText}>
            Shagun may revise these terms of service at any time without notice. By using this application you are agreeing to be bound by the then current version of these terms of service.
          </Text>

          <Text style={styles.sectionTitle}>9. Contact Information</Text>
          <Text style={styles.sectionText}>
            If you have any questions about these Terms of Service, please contact us at support@shagun.com
          </Text>
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
    paddingTop: 24,
    paddingBottom: 40,
  },
  lastUpdated: {
    fontSize: 12,
    color: "#999",
    marginBottom: 24,
  },
  content: {
    gap: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
  },
});

