import React, { useState} from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Alert, TextInput } from "react-native";
import IctLogo from "@/assets/images/ictlogo.png";
import Feather from "@expo/vector-icons/Feather";
import {Link } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

//this is the landing page

const RegisterPage = () => {

     const [uname, setName] = useState('');
     const [email, setEmail] = useState('');
     const [phoneNumber, setPhoneNumber] = useState('');
     const [password, setPassword] = useState('');
     const [password2, setPassword2] = useState('');
     const [isValidEmail, setIsValidEmail] = useState(false);

     const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//     const handlePress = () => {
//     // Disable the button
//     setIsButtonDisabled(true);

//     // Show an alert or perform an action
//     Alert.alert("Button Pressed", "The button has been temporarily disabled.");

//     // Re-enable the button after 3 seconds (3000 milliseconds)
//     setTimeout(() => {
//       setIsButtonDisabled(false);
//     }, 3000);
//   };


  return (
    <View style={styles.container}>
      <Image source={IctLogo} style={styles.ictlogo} />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={uname}
        editable={true}
      />
      <TextInput
        style={styles.input}
        placeholder="ICTU - Email"
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phoneNumber}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={password2}
        secureTextEntry
      />
      `{" "}
      <Link href="/login-page" asChild>
        <Pressable>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </Link>
      <Link href="/login-page" asChild>
        {/* NB: we need a redirection once sign up is complete */}
        <Pressable>
          <Text style={styles.buttonText}>Login </Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default RegisterPage;



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
        fontWeight: 'bold',
        width: '60%',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:10,
        marginTop: '5%',
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
      marginTop: 15,
      borderWidth: 1,
      borderRadius: 25,
    },
    disabledButton: {
      backgroundColor: '#ccc', // Change button color when disabled
    },
  });