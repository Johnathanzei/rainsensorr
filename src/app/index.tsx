import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
const app = () => {
  return(
    <View style={styles.container}>
      <Text>Johnathanzeiei</Text>
      <Text>{""}</Text>
      <Image
        source={require("./pic/1.jpg")}
        style={styles.image}
      />
      <Text>{""}</Text>
      <Link href="/about"> เกี่ยวกับ </Link>
    </View>
  )
}
export default app  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
});