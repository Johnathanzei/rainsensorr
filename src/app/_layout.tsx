import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layoutt() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerShown: false,
      }}
    >
      {/* หน้าแรก */}
      <Tabs.Screen
        name="index"
        options={{
          title: "หน้าแรก",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      {/* เกี่ยวกับ */}
      <Tabs.Screen
        name="about"
        options={{
          title: "เกี่ยวกับ",
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={24} color={color} />
          ),
        }}
      />

      {/* กำหนดเวลา */}
      <Tabs.Screen
        name="Time"
        options={{
          title: "กำหนดเวลา",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time-outline" size={24} color={color} />
          ),
        }}
      />

      {/* พยากรณ์ฝน */}
      <Tabs.Screen
        name="Weather"
        options={{
          title: "พยากรณ์ฝน",
          tabBarIcon: ({ color }) => (
            <Ionicons name="rainy-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}