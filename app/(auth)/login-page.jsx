import React, { useState} from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Alert, TextInput } from "react-native";
import IctLogo from "@/assets/images/ictlogo.png";
import Feather from "@expo/vector-icons/Feather";
import {Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

//this is the landing page

const LoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handlePress = () => {
    // Disable the button
    setIsButtonDisabled(true);

    // Show an alert or perform an action
    Alert.alert("Button Pressed", "The button has been temporarily disabled.");

    // Re-enable the button after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };



  return (
    <View style={styles.container}>
        <Image source={IctLogo} style={styles.ictlogo} />
        <FontAwesome name="user-circle" size={100} color="black" style={styles.userlogo} />
        <TextInput 
            style={styles.input}
            placeholder="Email address"
            value={email}
            editable={true}
        />
        <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
        />

`       <Link href="/(apptabs)/map"  asChild>
        <Pressable>
          <Text style={styles.buttonText}> OK</Text>
        </Pressable>
        </Link>

        <Link href="/register-page"  asChild>
        <Pressable>
          <Text style={styles.buttonText} >Sign up </Text>
        </Pressable>
      </Link>

      <FontAwesome name='road' size={200} color="black" style={styles.roadlogo} />
    </View>
  );
};

export default LoginPage;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    ictlogo: {
        width: '20%',
        height: '20%',
        resizeMode: 'contain',
        position: 'absolute',
        top: '5%',
        left: '0%'
    },
    userlogo: {
        resizeMode: "contain",
        justifyContent: "center",
        marginTop: '50%'
    },
    roadlogo: {
        resizeMode: 'contain'
    },
    input: {
        fontSize: 15,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        borderColor: 'black',
        width: '60%',
        borderWidth: 1,
        borderRadius:10,
        marginTop: '10%',
        paddingTop: 5
    },
    password: {
        marginTop: 15
    },
    buttonText: {
      padding: 7,
      width: 100,
      alignItems: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
      backgroundColor: 'black',
      marginTop: 5,
      borderWidth: 1,
      borderRadius: 25,
    },
    disabledButton: {
      backgroundColor: '#ccc', // Change button color when disabled
    },
  });