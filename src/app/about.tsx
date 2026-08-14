import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";

export default function RainDryer() {
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [isRaining, setIsRaining] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [rainValue, setRainValue] = useState(0);

  // 🔥 ดึงข้อมูลจาก PHP
  const fetchData = () => {
    fetch("http://192.168.1.45/api/get_sensor.php")
      .then((res) => res.json())
      .then((data) => {
        setTemperature(parseFloat(data.temperature) || 0);
        setHumidity(parseFloat(data.humidity) || 0);
        setRainValue(parseInt(data.rain) || 0);
        setIsRaining(data.rain > 50);
      })
      .catch((err) => console.log("ERROR:", err));
  };

  // 🔄 โหลดครั้งแรก + รีเฟรชทุก 3 วิ
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔘 ปุ่มเปิด/ปิดระบบ
  const togglePower = () => {
    const newPower = !isPowerOn;
    setIsPowerOn(newPower);

    fetch("http://192.168.1.45/api/control.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        power: newPower ? 1 : 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("API:", data))
      .catch((err) => console.log("ERROR:", err));
  };

  // 📊 สถานะ
  const status = !isPowerOn
    ? "ปิดระบบ"
    : isRaining
      ? "กำลังเก็บผ้า"
      : "กำลังตากผ้า";

  const detail = !isPowerOn
    ? "ระบบไม่ได้ทำงาน"
    : isRaining
      ? "🌧 ตรวจพบน้ำฝน"
      : "☀ ไม่พบฝน";

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/back.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 🔵 วงกลม */}
          <View
            style={[
              styles.circle,
              { backgroundColor: isRaining ? "#69d1c8" : "#18D4B6" },
            ]}
          >
            <Text style={styles.title}>สถานะราวตากผ้า</Text>
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.detail}>{detail}</Text>
          </View>

          {/* 🌧 ค่า Rain */}
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={styles.sensorValue}>
              {rainValue.toString().padStart(3, "0")}
            </Text>
            <Text style={styles.sensorText}>Rain Sensor (%)</Text>
          </View>

          {/* 🔘 ปุ่ม Power */}
          <TouchableOpacity
            style={[
              styles.power,
              { backgroundColor: isPowerOn ? "#3a3230" : "#2ECCB6" },
            ]}
            onPress={togglePower}
          >
            <Text style={styles.powerText}>
              {isPowerOn ? "ปิดการใช้งาน" : "เปิดการใช้งาน"}
            </Text>
          </TouchableOpacity>

          {/* 📊 Card */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardIcon}>🌡</Text>
              <Text style={styles.cardTitle}>อุณหภูมิ</Text>
              <Text style={styles.cardValue}>{temperature}°C</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardIcon}>💧</Text>
              <Text style={styles.cardTitle}>ความชื้น</Text>
              <Text style={styles.cardValue}>{humidity}%</Text>
            </View>
          </View>

          {/* 🎯 เมนู */}
          <View style={styles.actionRow}>

            {/* พยากรณ์ฝน */}
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/Weather")}
            >
              <Text style={styles.icon}>🌧️</Text>
              <Text style={styles.label}>พยากรณ์ฝน</Text>
            </TouchableOpacity>

            {/* กำหนดเวลา */}
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/Time")}
            >
              <Text style={styles.icon}>🕒</Text>
              <Text style={styles.label}>กำหนดเวลา</Text>
            </TouchableOpacity>

          </View>

          {/* 🟢 ปุ่มจำลอง */}
          <TouchableOpacity
            style={styles.testButton}
            onPress={() => {
              const newRain = !isRaining;
              setIsRaining(newRain);

              if (newRain) {
                setRainValue(80);
                setTemperature(25);
                setHumidity(90);
              } else {
                setRainValue(10);
                setTemperature(35);
                setHumidity(40);
              }
            }}
          >
            <Text style={styles.testText}>
              {isRaining ? "จำลองไม่มีฝน" : "จำลองฝนตก"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // 🌈 Layout หลัก
  container: {
    flex: 1,
    backgroundColor: "#CFE8FF",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },

  // 🔵 วงกลมสถานะ
  circle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 8,
    borderColor: "#4A90E2",
    marginTop: 30,
  },

  title: {
    color: "#666",
    fontSize: 16,
    marginBottom: 5,
  },

  status: {
    color: "#2E6FD8",
    fontSize: 40,
    fontWeight: "bold",
  },

  detail: {
    color: "#888",
    fontSize: 16,
    marginTop: 5,
  },

  // 📊 Sensor
  sensorValue: {
    color: "#2E6FD8",
    fontSize: 50,
    fontWeight: "bold",
  },

  sensorText: {
    color: "#666",
    fontSize: 16,
  },

  // 🔴 ปุ่ม Power
  power: {
    backgroundColor: "#FF4D4D",
    padding: 18,
    borderRadius: 15,
    marginTop: 25,
  },

  powerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },

  // 🧊 Card
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  cardIcon: {
    fontSize: 28,
  },

  cardTitle: {
    color: "#666",
    marginTop: 8,
    fontSize: 14,
  },

  cardValue: {
    color: "#2E6FD8",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 5,
  },

  // 🎯 Action Buttons (แก้ให้ปุ่มอยู่ใกล้กันแล้ว)
  actionRow: {
    flexDirection: "row",
    justifyContent: "center", // 👈 สำคัญ
    gap: 50, // 👈 ระยะห่างระหว่างปุ่ม
    marginTop: 30,
  },

  actionBtn: {
    alignItems: "center",
  },

  icon: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#4DD0E1",
    textAlign: "center",
    lineHeight: 55,
    fontSize: 22,
    color: "#fff",
  },

  label: {
    color: "#333",
    marginTop: 6,
    fontSize: 13,
  },

  // 🟢 ปุ่มจำลอง
  testButton: {
    marginTop: 30,
    backgroundColor: "#2ECCB6",
    padding: 18,
    borderRadius: 15,
  },

  testText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
