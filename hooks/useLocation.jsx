import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";

//every thign was ok here
const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [latitude, setLatitude] = useState(3.844119); // Initial latitude
    const [longitude, setLongitude] = useState(11.501346); // Initial longitude


    const getUserLocation =  async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted'){
          setErrorMsg('Permission to location was not granted');
          return;
        }
    
    
        let {coords} = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 10000,
        });
    
        if (coords) {
          const {latitude, longitude} = coords;
          // console.log("lat and long is ", latitude, longitude )
          setLatitude(latitude);
          setLongitude(longitude);
    
        }
      };

      useEffect(() => {
        const intervalID = setInterval(getUserLocation, 2000);

        return () => clearInterval(intervalID);
      }, [])
    
    return { latitude, longitude, errorMsg};
};

export default useLocation

const styles = StyleSheet.create({})