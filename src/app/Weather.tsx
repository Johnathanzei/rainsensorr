import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from "react-native";

interface Weather {
  temperature: number;
  temperature_status: string;
  humidity: number;
  humidity_status: string;
  rain_probability: number;
  advice: string;
  weather_message: string;
  weather_status: string;
  update_time: string;
}

export default function Weather() {
  const SERVER = "http://192.168.1.45/apijame/";

  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      const response = await fetch(SERVER + "weather.php");
      const json = await response.json();

      if (json.status === "success") {
        setWeather(json.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = () => {
    if (!weather) {
      return "ต่ำ";
    }

    if (weather.rain_probability >= 70) {
      return "สูง";
    }

    if (weather.rain_probability >= 40) {
      return "ปานกลาง";
    }

    return "ต่ำ";
  };

  const getAdvice = () => {
    if (!weather) {
      return "";
    }
    return weather.advice;
  };

  const getWeatherMessage = () => {
    if (!weather) {
      return "";
    }
    return weather.weather_message;
  };

  const getHumidityStatus = () => {
    if (!weather) {
      return "";
    }
    return weather.humidity_status;
  };

  const getTemperatureStatus = () => {
    if (!weather) {
      return "";
    }
    return weather.temperature_status;
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
     source={require("../../assets/back.jpg")}

      resizeMode="cover"
      blurRadius={1}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>พยากรณ์ฝน</Text>
              <Text style={styles.subtitle}>
                ข้อมูลสภาพอากาศสำหรับการตัดสินใจตากผ้า
              </Text>
            </View>

            {/* วงกลมโอกาสฝนตก */}
            <View style={styles.ringContainer}>
              <View style={styles.ringOuter}>
                <View style={styles.ringInner}>
                  <Text style={styles.cloudIcon}>🌧️</Text>
                  <Text style={styles.rainTitle}>โอกาสฝนตก</Text>
                  <Text style={styles.rainValue}>
                    {weather?.rain_probability}%
                  </Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{getStatus()}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* การ์ดความชื้น และ อุณหภูมิ */}
            <View style={styles.row}>
              {/* ความชื้น */}
              <View style={styles.infoCardBlue}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.iconContainerBlue}>
                    <Text style={styles.cardIcon}>💧</Text>
                  </View>
                  <Text style={styles.cardLabel}>ความชื้น</Text>
                </View>

                <Text style={styles.blueValue}>{weather?.humidity}%</Text>

                <View style={styles.badgeBlue}>
                  <Text style={styles.badgeBlueText}>{getHumidityStatus()}</Text>
                </View>
              </View>

              {/* อุณหภูมิ */}
              <View style={styles.infoCardOrange}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.iconContainerOrange}>
                    <Text style={styles.cardIcon}>🌡️</Text>
                  </View>
                  <Text style={styles.cardLabel}>อุณหภูมิ</Text>
                </View>

                <Text style={styles.orangeValue}>{weather?.temperature}°C</Text>

                <View style={styles.badgeOrange}>
                  <Text style={styles.badgeOrangeText}>
                    {getTemperatureStatus()}
                  </Text>
                </View>
              </View>
            </View>

            {/* คำแนะนำตากผ้า */}
            <View style={styles.adviceCard}>
              <View style={styles.adviceHeaderRow}>
                <View
                  style={[
                    styles.clothingIconCircle,
                    {
                      backgroundColor:
                        weather?.weather_status === "danger"
                          ? "#EF4444"
                          : weather?.weather_status === "warning"
                          ? "#F59E0B"
                          : "#22C55E",
                    },
                  ]}
                >
                  <Text style={styles.clothingIconText}>👕</Text>
                </View>

                <View style={styles.adviceTitlesColumn}>
                  <Text style={styles.adviceTitleText}>คำแนะนำ</Text>
                  <Text
                    style={[
                      styles.adviceSubtitleText,
                      {
                        color:
                          weather?.weather_status === "danger"
                            ? "#DC2626"
                            : weather?.weather_status === "warning"
                            ? "#D97706"
                            : "#15803D",
                      },
                    ]}
                  >
                    {getWeatherMessage()}
                  </Text>
                </View>
              </View>

              <View style={styles.advicePoints}>
                <Text style={styles.advicePointItem}>• {getAdvice()}</Text>
                <Text style={styles.advicePointItem}>
                  • ข้อมูลจากการวิเคราะห์โอกาสฝนตก
                </Text>
              </View>

              <View
                style={[
                  styles.weatherStatusBadge,
                  {
                    backgroundColor:
                      weather?.weather_status === "danger"
                        ? "#FEE2E2"
                        : weather?.weather_status === "warning"
                        ? "#FEF3C7"
                        : "#DCFCE7",
                  },
                ]}
              >
                <Text style={styles.weatherStatusCheck}>
                  {weather?.weather_status === "danger"
                    ? "⚠️"
                    : weather?.weather_status === "warning"
                    ? "🌦️"
                    : "☑️"}
                </Text>

                <Text
                  style={[
                    styles.weatherStatusLabel,
                    {
                      color:
                        weather?.weather_status === "danger"
                          ? "#DC2626"
                          : weather?.weather_status === "warning"
                          ? "#D97706"
                          : "#15803D",
                    },
                  ]}
                >
                  {getWeatherMessage()}
                </Text>
              </View>
            </View>

            {/* เวลาอัปเดต */}
            <View style={styles.updateCardShort}>
              <Text style={styles.updateTitle}>🕒 อัปเดตล่าสุด: </Text>
              <Text style={styles.updateValue}>{weather?.update_time}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(235,245,255,0.65)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF7FF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#607D8B",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
  },
  ringContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  ringOuter: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: "#60A5FA",
    shadowColor: "#3B82F6",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 6,
  },
  ringInner: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cloudIcon: {
    fontSize: 32,
    marginBottom: 2,
  },
  rainTitle: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "600",
  },
  rainValue: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#2563EB",
    marginVertical: 2,
  },
  statusBadge: {
    marginTop: 4,
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 15,
  },
  statusText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoCardBlue: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  infoCardOrange: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconContainerBlue: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  iconContainerOrange: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  cardIcon: {
    fontSize: 18,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
  },
  blueValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0284C7",
    marginVertical: 4,
  },
  orangeValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#EA580C",
    marginVertical: 4,
  },
  badgeBlue: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 2,
  },
  badgeBlueText: {
    fontSize: 12,
    color: "#0369A1",
    fontWeight: "600",
  },
  badgeOrange: {
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 2,
  },
  badgeOrangeText: {
    fontSize: 12,
    color: "#C2410C",
    fontWeight: "600",
  },
  adviceCard: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#DCFCE7",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  adviceHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  clothingIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  clothingIconText: {
    fontSize: 26,
  },
  adviceTitlesColumn: {
    flex: 1,
  },
  adviceTitleText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E293B",
  },
  adviceSubtitleText: {
    fontSize: 19,
    fontWeight: "bold",
  },
  advicePoints: {
    marginBottom: 12,
    paddingLeft: 4,
  },
  advicePointItem: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 22,
  },
  weatherStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  weatherStatusCheck: {
    fontSize: 14,
    marginRight: 6,
  },
  weatherStatusLabel: {
    fontSize: 13,
    fontWeight: "bold",
  },
  updateCardShort: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  updateTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  updateValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#334155",
  },
});