import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import useLocation from '@/hooks/useLocation';
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, collection, setDoc, onSnapshot } from "@firebase/firestore";

const MapScreen = () => {
   
  const [userData, setUserData] = useState(null);
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 3.844119, // Initial latitude
    longitude: 11.501346, // Initial longitude
  });
  const [driverName, setDriverName] = useState("");
  const [driverUsername, setDriverUsername] = useState("");

  const {latitude, longitude, errorMsg } = useLocation();
//at this point it was working fine
//get user data


  useEffect(() =>{
    const fetchUserData = async () => {
      try{
        const uid = auth.currentUser?.uid;
      if (!uid) {
        console.log("User not logged in");
        return;
      }
        const userRef = doc(db, 'users',uid);
        const userDoc = await  getDoc(userRef); //await

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          
          // If user is a student, fetch driver's name
          if (data.role === 'Student' && data.driverUID) {
            const driverRef = doc(db, 'users', data.driverUID);
            const driverDoc = await getDoc(driverRef);
            if (driverDoc.exists()) {
              setDriverName(driverDoc.data().name || "Your Driver");
              setDriverUsername(driverDoc.data().username || "Your Driver");
            }
          }
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
      }, []);

//update matker location
  useEffect(() => {
    if (latitude  !== markerLocation.latitude && longitude !== markerLocation.longitude) {
      setMarkerLocation({
        latitude,
        longitude,
      });
    }
  }, [latitude, longitude]);

  console.log("the longitude and latitudes are:", longitude, latitude);


  // driver location gets updated
  useEffect(() => {
    if (userData?.role === "Driver" && latitude && longitude) {
      const updateDriverLocation = async () => {
        try {
          const driverRef = doc(db, "driverLocations", auth.currentUser.uid); // Store location in 'driverLocations'
          await setDoc(driverRef, {
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          console.error("Error updating driver location:", error);
        }
      };
  
      updateDriverLocation();
    }
  }, [latitude, longitude, userData]);

  const driverUID = userData?.driverUID
  //user listens to Driver's location
  useEffect(() => {
    if (userData?.role === "Student") {
      if (!driverUID) {
        console.log("No driver assigned yet");
        return;
      }
      const driverRef = doc(db, "driverLocations", driverUID);
      try {
        const unsubscribe = onSnapshot(driverRef, (doc) => {
          if (doc.exists()) {
            const driverLocation = doc.data();
            setMarkerLocation({
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
            });
          } else {
            console.log("Driver location not found");
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error listening to driver location:", error);
      }
    }
  }, [userData, driverUID]);


  if (errorMsg) {
    return (
      <View>
        <Text>Error: {errorMsg}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text>Loading User data ...</Text>
      </View>
    );
  }


  const description = userData?.role === 'Driver' ? 'Your current position' : `${driverUsername}'s current position`;


return (
  <View style={styles.container}>
    <MapView
    style={styles.map}
    region={{
      latitude: markerLocation.latitude,
      longitude: markerLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    <Marker
      coordinate={{
        latitude: markerLocation.latitude,
        longitude: markerLocation.longitude,
      }}
      title={userData?.role === 'Driver' ? "Your Location" : driverUsername}
      description={description}
    />
  </MapView>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;