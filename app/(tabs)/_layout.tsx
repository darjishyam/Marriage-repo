import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          position: "absolute",
          backgroundColor: "#000",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Wedding",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chandla"
        options={{
          title: "My Shagun",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
