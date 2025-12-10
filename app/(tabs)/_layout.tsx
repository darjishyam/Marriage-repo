import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: {
          height: Platform.OS === "android" ? 80 : 100,
          paddingBottom: Platform.OS === "android" ? 20 : 30,
          paddingTop: 10,
          position: "absolute",
          backgroundColor: "#000",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Wedding",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chandla"
        options={{
          title: "My Shagun",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
