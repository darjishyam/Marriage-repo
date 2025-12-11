import { LanguageProvider } from "@/contexts/LanguageContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { ShagunProvider } from "@/contexts/ShagunContext";
import { WeddingProvider } from "@/contexts/WeddingContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <WeddingProvider>
        <ShagunProvider>
          <LanguageProvider>
            <StatusBar style="dark" />
            <View style={styles.container}>
              <View style={styles.content}>
                <Stack
                  screenOptions={{ headerShown: false }}
                  initialRouteName="index"
                >
                  <Stack.Screen name="onboarding" />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="signup" />
                  <Stack.Screen name="otp" />
                  <Stack.Screen name="shagun-book" />
                  <Stack.Screen name="add-shagun" />
                  <Stack.Screen name="expenses" />
                  <Stack.Screen name="add-expense" />
                  <Stack.Screen name="invitation-list" />
                  <Stack.Screen name="add-guest" />
                  <Stack.Screen name="purchase-premium" />
                  <Stack.Screen name="terms-of-service" />
                  <Stack.Screen name="delete-account" />

                  {/* Tabs - Home page */}
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
              </View>
            </View>
          </LanguageProvider>
        </ShagunProvider>
      </WeddingProvider>
    </OnboardingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Neutral background for outside area on web
    alignItems: "center", // Center the content on web
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 500, // Constrain width on web
    backgroundColor: "#fff", // Ensure app content has white background
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
