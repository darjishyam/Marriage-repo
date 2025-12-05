import { Redirect } from "expo-router";

export default function Index() {
  // Direct redirect to home page (My Wedding screen)
  return <Redirect href="/(tabs)" />;
}
