import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const app = () => {
  const [name,setName] = useState("Golf")
  const singer: string = "P'To";
  const weight: number = 2000;
  const study: boolean = false;
  const [age, setAge] = useState(25);
  return(
    <View style={styles.container}>
      <Text>My name is {singer} </Text>
      <Text>Hello Mama! </Text>
      <Text>เพิ่งเปิดเทอมเหลือเงิน {weight} </Text>
      <Text>วันนี้เรียนง่ายจัง {study.toString()} </Text>
      <Text>My react App : Your Name</Text>
      <Text>my age : {name} </Text>
      <Button
        title="change the name"
        onPress = {() => setName("eiei")}
      />
      <Text>
        อายุ {age} ปี
      </Text>

    <View style ={styles.row}>
      <Button
        title="+"
        onPress={() => setAge(age + 1)}
      />
      <Button
        title="-"
        onPress={() => setAge(age - 1)}
      />
      <Button
        title="Reset"
        onPress={() => setAge(25)}
      />
      </View>
    </View>
  )
}
 
export default app  

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});