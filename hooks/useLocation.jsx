import { StyleSheet, Text, TouchableOpaciy, View } from "react-native";
import React, {useEffect, useState} from 'react';
import * as Location from "expo-location";


//every thign was ok here
const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState("", "");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");


    const getUserLocation =  async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted'){
          setErrorMsg('Permission to location was not granted');
          return;
        }
    
    
        let {coords} = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          timeout: 10000,
        });
    
        if (coords) {
          const {latitude, longitude} = coords;
          // console.log("lat and long is ", latitude, longitude )
          setLatitude(latitude);
          setLongitude(longitude);
    
          // let response = await Location.reverseGeocodeAsync({
          //   latitude,
          //   longitude
          // })
    
          // console.log('USER LOCATION IS', response);
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