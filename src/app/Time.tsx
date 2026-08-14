import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";

type Schedule = {
  id: number;
  startTime: string;
  endTime: string;
};

export default function Time() {
  const API = "http://192.168.1.45/student_api";

  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // ตรวจสอบเวลา HH:MM
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  // จัดรูปแบบเวลา เช่น 0730 → 07:30
  const formatTime = (text: string) => {
    let value = text.replace(/\D/g, "").slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }

    return value;
  };

  // ล้างข้อมูลในฟอร์ม
  const resetForm = () => {
    setModalVisible(false);
    setStartTime("");
    setEndTime("");
  };

  // โหลดข้อมูลจากฐานข้อมูล
  const fetchSchedule = async () => {
    try {
      const response = await fetch(`${API}/schedule.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "get",
        }),
      });

      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  // โหลดข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    fetchSchedule();
  }, []);

  // เพิ่มกำหนดเวลา
  const saveSchedule = async () => {
    if (!startTime || !endTime) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกเวลา");
      return;
    }

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      Alert.alert(
        "แจ้งเตือน",
        "กรุณากรอกเวลาให้ถูกต้อง เช่น 07:30"
      );
      return;
    }

    try {
      const response = await fetch(`${API}/schedule.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add",
          startTime,
          endTime,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        Alert.alert(
          "บันทึกไม่สำเร็จ",
          result.message || "ไม่สามารถบันทึกข้อมูลได้"
        );
        return;
      }

      Alert.alert("สำเร็จ", "เพิ่มกำหนดเวลาสำเร็จ");

      resetForm();
      fetchSchedule();
    } catch (error) {
      console.log("SAVE ERROR:", error);

      Alert.alert(
        "เกิดข้อผิดพลาด",
        "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"
      );
    }
  };

  // ลบกำหนดเวลา
  const deleteSchedule = (id: number) => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณต้องการลบกำหนดเวลานี้หรือไม่?",
      [
        {
          text: "ยกเลิก",
          style: "cancel",
        },
        {
          text: "ลบ",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API}/schedule.php`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  action: "delete",
                  id,
                }),
              });

              const result = await response.json();

              if (!result.success) {
                Alert.alert(
                  "ลบไม่สำเร็จ",
                  result.message || "ไม่สามารถลบข้อมูลได้"
                );
                return;
              }

              Alert.alert(
                "สำเร็จ",
                "ลบกำหนดเวลาเรียบร้อย"
              );

              fetchSchedule();
            } catch (error) {
              console.log("DELETE ERROR:", error);

              Alert.alert(
                "เกิดข้อผิดพลาด",
                "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"
              );
            }
          },
        },
      ]
    );
  };

  // เปิดหน้าต่างเพิ่มกำหนดเวลา
  const openAddModal = () => {
    setStartTime("");
    setEndTime("");
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={require("../../assets/back.jpg")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>

        <Text style={styles.title}>
          ตั้งเวลาเก็บผ้า
        </Text>

        {/* ปุ่มเพิ่ม */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={openAddModal}
        >
          <Text style={styles.addText}>
            + เพิ่มกำหนดเวลา
          </Text>
        </TouchableOpacity>

        {/* รายการกำหนดเวลา */}
        <FlatList
          data={schedule}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({ item }) => (
            <View style={styles.card}>

              <View style={styles.timeBox}>

                <Text style={styles.time}>
                  🌞 เวลาเริ่ม : {item.startTime}
                </Text>

                <Text style={styles.time}>
                  🌙 เวลาจบ : {item.endTime}
                </Text>

              </View>

              {/* ปุ่มลบ */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteSchedule(item.id)}
              >
                <Text style={styles.buttonText}>
                  ลบ
                </Text>
              </TouchableOpacity>

            </View>
          )}
        />

        {/* หน้าต่างเพิ่มกำหนดเวลา */}
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent
        >
          <View style={styles.modalBackground}>

            <View style={styles.modalBox}>

              <Text style={styles.modalTitle}>
                เพิ่มกำหนดเวลา
              </Text>

              {/* เวลาเริ่ม */}
              <Text style={styles.label}>
                🌞 เวลาเริ่ม
              </Text>

              <TextInput
                style={styles.input}
                placeholder="07:00"
                value={startTime}
                keyboardType="number-pad"
                maxLength={5}
                selectTextOnFocus
                onChangeText={(text) =>
                  setStartTime(formatTime(text))
                }
              />

              {/* เวลาจบ */}
              <Text style={styles.label}>
                🌙 เวลาจบ
              </Text>

              <TextInput
                style={styles.input}
                placeholder="17:00"
                value={endTime}
                keyboardType="number-pad"
                maxLength={5}
                selectTextOnFocus
                onChangeText={(text) =>
                  setEndTime(formatTime(text))
                }
              />

              {/* บันทึก */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveSchedule}
              >
                <Text style={styles.buttonText}>
                  บันทึก
                </Text>
              </TouchableOpacity>

              {/* ยกเลิก */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={resetForm}
              >
                <Text style={styles.buttonText}>
                  ยกเลิก
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  backgroundImage: {
    resizeMode: "cover",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 25,
    textShadowColor: "#000",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 6,
  },

  addButton: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },

  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },

  timeBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 15,
    padding: 12,
    marginTop: 5,
  },

  time: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },

  deleteButton: {
    backgroundColor: "#EF5350",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 22,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1976D2",
    marginBottom: 20,
  },

  label: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 17,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: "#43A047",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },

  cancelButton: {
    backgroundColor: "#9E9E9E",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
});