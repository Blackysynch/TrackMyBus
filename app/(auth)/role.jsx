import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import IctLogo from "@/assets/images/ictlogo.png";
import Feather from "@expo/vector-icons/Feather";
import {Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

//this is the landing page

const Role = () => {
  return (
    <View style={styles.container}>
      <Image source={IctLogo} style={styles.ictlogo} />
      <Link href="/login-page"   asChild>
        <Pressable>
          <Text style={styles.buttonText} >Student </Text>
        </Pressable>
      </Link>
      <Link href="/login-page"  asChild>
        <Pressable>
          <Text style={styles.buttonText} > Driver</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  ictlogo: {
    width: "60%",
    height: "40%",
    resizeMode: "contain",
    justifyContent: "center",
  },
  buttonText: {
    width: '70%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: "center",
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius:10,
    padding: 5

  }
});
