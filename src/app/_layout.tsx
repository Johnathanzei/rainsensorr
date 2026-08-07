import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export default function Layoutt() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerShown: false, // 👈 ใส่ตรงนี้
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "หน้าแรก",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "เกี่ยวกับ",
          tabBarIcon: ({ color }) => (
            <Ionicons name="card-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
