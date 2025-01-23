import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import useLocation from '@/hooks/useLocation';

const MapScreen = () => {
  const {latitude, longitude, errorMsg } = useLocation(); 

  const [markerLocation, setMarkerLocation] = useState({
    latitude: 3.844119, // Initial latitude
    longitude: 11.501346, // Initial longitude
  });


  useEffect(() => {
    if (latitude && longitude) {
      setMarkerLocation({
        latitude,
        longitude,
      });
    }
  }, [latitude, longitude]);

  // useEffect(() => {
  //   if (location) {
  //     setMarkerLocation({
  //       latitude: location.latitude,
  //       longitude: location.longitude,
  //     });
  //   }
  // }, [location]);

  // Set up an interval to refresh the location every 5 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //       setMarkerLocation({
  //         latitude: Number(location.latitude),
  //         longitude: Number(location.longitude),
  //       });

  //       console.log('the markerLocation:', markerLocation); // Print the markerLocation state to the console
  //   }, 5000);

  //   return () => clearInterval(interval); // Clean up the interval
  // }, []);



  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      initialRegion={{
        latitude: markerLocation.latitude,
        longitude: markerLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      }
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