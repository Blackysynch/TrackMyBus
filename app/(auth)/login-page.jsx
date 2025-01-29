import React, { useRef, useState} from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert, TextInput } from "react-native";
import IctLogo from "@/assets/images/ictlogo.png";
import {Link, useRouter } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth , db} from '@/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc } from "@firebase/firestore";
//import { doc, getDoc, collection, getDocs } from "@firebase/firestore";
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in:", user.uid);
        router.replace("/(apptabs)/testmap"); // Update login redirect to match new tab layout

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User role:', userData.role);
        } else {
          console.log('No user data found');
        }
        // const userId = auth.currentUser.uid;
        // const profileCollectionRef = collection(db, 'users', userId, 'profile'); // Reference the profile collection



        // getDocs(profileCollectionRef).then((querySnapshot) => {
        //   if (!querySnapshot.empty) {
        //     querySnapshot.forEach((profileDoc) => {
        //       const profileId = profileDoc.id; // Get the profile document ID
        //       const detailsDocRef = doc(db, 'users', userId, 'profile', profileId, 'details'); // Reference the details document
        
        //       getDoc(detailsDocRef).then((detailsDocSnap) => {
        //         if (detailsDocSnap.exists()) {
        //           const detailsData = detailsDocSnap.data(); // Get the details data
        //           console.log('Details:', detailsData);
        //         } else {
        //           console.log('No details document found for profile:', profileId);
        //         }
        //       }).catch((error) => {
        //         console.error('Error fetching details:', error);
        //       });
        //     });
        //   } else {
        //     console.log('No profile documents found for user:', userId);
        //   }
        // }).catch((error) => {
        //   console.error('Error fetching profile:', error);
        // });


        // const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // const user = userCredential.user;

        // const userRef = collection(db, "users", user.uid, "profile");

        // getDocs(userRef).then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     const profileId = doc.data();
        //     const detailsRef = doc(db, "users", user.uid, "profile", profileId, "details");
        
        //     getDoc(detailsRef).then((querySnapshot) => {
        //       querySnapshot.forEach((doc) => {
        //         const detailsData = doc.data();
        //         console.log('Details:', detailsData);
        //       });
        //     }).catch((error) => {
        //       console.error('Error fetching details:', error);
        //     });
        //   });
        // }).catch((error) => {
        //   console.error('Error fetching profile:', error);
        // });
        // const profileRef = doc(userRef, "profile");
        // const detailsRef = doc(profileRef, profileRef.id)
        // const dataRef = doc(detailsRef, value )


        // console.log(dataRef)

        // getDoc(profileRef).then((docSnap) => {
        //   if (docSnap.exists()) {
        //     const userData = docSnap.data();

        //     const profileId = Object.keys(userData)[0];
        //     const role = userData[profileId].role;
        //     console.log('Role:', role);

        //     // Navigate to the next screen
        //     router.replace('/(apptabs)/map');
        // } else {
        //   console.log('No data available');
        // }
        // // Get the user's data from the Realtime Database
        // // const userDocRef = doc(db, "users", user.uid);
        // // const profileDocRef = doc(userDocRef, "profile");
        // // const querySnapshot = await getDoc(profileDocRef);


        // // querySnapshot.forEach((doc) => {
        // //   const profileData = doc.data();
        // //   const profileId = Object.keys(profileData)[0];
        // //   const userData = profileData[profileId];
        // //   const roleValue = userData.role;


  
        // //   console.log('Role:', roleValue);
  
        // //   // Navigate to the next screen
        // //   router.replace('/(apptabs)/map');
        // // });
        // }).catch((error) => {
        //   console.error('Error fetching role:', error);
        // });
      } catch (error) {
        Alert.alert('Error', error.message);
        console.log('Error', error.message);
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