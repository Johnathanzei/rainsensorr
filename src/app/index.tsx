import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <ImageBackground
      source={require("../../assets/back.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        {/* ชื่อระบบด้านบน */}
        <Text style={styles.header}>
          ระบบราวตากผ้าอัจฉริยะ
        </Text>

        {/* ชื่อห้อง */}
        <Text style={styles.room}>
          ห้องซักผ้า
        </Text>

        {/* การ์ดราวตากผ้า */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.icon}>
            🧺
          </Text>

          <Text style={styles.cardTitle}>
            ราวตากผ้าอัจฉริยะ
          </Text>

          <Text style={styles.status}>
            กำลังทำงาน
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 25,
  },

  header: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
  },

  room: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
  },

  card: {
    width: "100%",
    height: 180,
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: 25,
    padding: 25,
    justifyContent: "space-between",
  },

  icon: {
    fontSize: 35,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  status: {
    color: "#aaa",
    fontSize: 16,
  },
});