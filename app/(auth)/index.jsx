import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import IctLogo from "@/assets/images/ictlogo.png";
import Feather from "@expo/vector-icons/Feather";
import {Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

//this is the landing page

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <Image source={IctLogo} style={styles.ictlogo} />
      <Text>Know the location of the bus...</Text>
      <Feather name="map" size={190} color="black" style={styles.maplogo} />
      <Link href="/role"   asChild>
        <Pressable>
          <Text style={styles.buttonText} >Login <FontAwesome name="sign-in" size={24} color="black" /></Text>
        </Pressable>
      </Link>
      <Link href="/register-page"  asChild>
        <Pressable>
          <Text style={styles.buttonText} >Register <FontAwesome name="sign-out" size={24} color="black" /></Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default LandingPage;

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
  maplogo: {
    //
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: "center",
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius:10,
    padding: 5
    //backgroundColor: 'red',
    //fontWeight: 'bold',

  }
});
