import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import useLocation from '@/hooks/useLocation';
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "@firebase/firestore";

const MapScreen = () => {
  const {latitude, longitude, errorMsg } = useLocation(); 
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [markerLocation, setMarkerLocation] = useState({
    latitude: 3.844119, // Initial latitude
    longitude: 11.501346, // Initial longitude
  });

//at this point it was working fine
//get user data
  useEffect(() =>{
    const fetchUserData = async () => {
      try{
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };


      fetchUserData();
  }, []);

//update matker location
  useEffect(() => {
    if (latitude && longitude) {
      setMarkerLocation({
        latitude,
        longitude,
      });
    }
  }, [latitude, longitude]);

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
        <Text>Error: No user data available.</Text>
      </View>
    );
  }

  console.log("the longitude and latitudes are:", longitude, latitude);



  if (userData && userData.role === 'Driver') {
    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        initialRegion={{
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
              title="Marker User Title"
              description={"This is a driver position"}
              // description={isDriver ? 'This is a driver position' : 'This is a user position'}
            />
        </MapView>
      </View>
    );
  }
  //for non drivers
    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        initialRegion={{
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
              title="Marker User Title"
              description="This is a user position"
            />
        </MapView>
      </View>
    );
};

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
});

export default MapScreen;