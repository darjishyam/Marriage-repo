import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { user, isLoading: authLoading } = useAuth();
  const { hasCompletedOnboarding, isLoading: onboardingLoading } = useOnboarding();

  if (authLoading || onboardingLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
