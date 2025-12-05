import { Redirect } from "expo-router";

export default function OnboardingIndex() {
  // Redirect to home page instead of onboarding
  return <Redirect href="/(tabs)" />;
}

