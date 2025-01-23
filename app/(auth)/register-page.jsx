import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Alert, TextInput } from "react-native";
import IctLogo from "@/assets/images/ictlogo.png";
import {Link , useRouter} from "expo-router";
// import FontAwesome from '@expo/vector-icons/FontAwesome';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc} from "@firebase/firestore";

//this is the landing page

const RegisterPage = () => {
  
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState('Student'); //default is student
    
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (!username || !email || !phoneNumber || !password || !role) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created")
      const user = userCredential.user;//this is before major change
      
      try{
      // Step 3: Save additional user data to Firestore
      await setDoc(doc(db, "/users", user.uid), {
        username,
        email,
        phoneNumber,
        role,
        location: null,// location ? new GeoPoint(location.latitude, location.longitude) : null,
        // location: {
        //   latitude: location.latitude,
        //   longitude: location.longitude,
        // },
        createdAt: new Date().toISOString(),
      });
      console.log("User data saved to Firestore");
    }catch (error) {
      console.error("Error saving user data to Firestore:", error.message);
    }

      router.replace("/login-page");
      console.log('User details saved');
      // Redirect to login page or home page after successful registration
      console.log("User  registered and details saved:", user.uid);
      //Alert.alert("Success", "Registration successful!");

    } catch (error) {
      console.error('Error occurred:', error);
      console.error("Error registering user:", error.message);
    } finally {
      setLoading(false);
      const router = useRouter();
      router.replace('/login-page');
    }
  };



  return (
    <View style={styles.container}>
      <Image source={IctLogo} style={styles.ictlogo} />
      <TextInput
        style={styles.input}
        placeholder="UserName"
        value={username}
        editable={true}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ICTU - Email"
        value={email}
        editable={true}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phoneNumber}
        editable={true}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        editable={true}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        
        editable={true}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Role (student/driver)"
        value={role}
        editable={true}
        onChangeText={(text) => setRole(text)}
      />

      {/* <Link asChild> */}
        <Pressable
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Registering..." : "Register"}</Text>
        </Pressable>
      {/* </Link> */}
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