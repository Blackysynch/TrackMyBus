import React, { useState} from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Alert, TextInput } from "react-native";
import IctLogo from "@/assets/images/ictlogo.png";
import Feather from "@expo/vector-icons/Feather";
import {Link, useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
//this is the landing page


const LoginPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleLogin = async () => {
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      setLoading(true);
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace('/(apptabs)/map'); //redirect to map page
        Alert.alert('Success', 'Login successful!');
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
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
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
            style={styles.input}
            placeholder="Password"
            value={password}
            editable={true}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
        />

`       
        <Pressable
        onPress={handleLogin}
        >
          <Text style={styles.buttonText}> Login</Text>
          
        </Pressable>

        <Link href="/register-page"  asChild>
        <Pressable>
          <Text style={styles.buttonText} >Register </Text>
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