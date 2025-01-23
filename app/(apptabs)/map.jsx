import { Text , View, StyleSheet } from "react-native";
// import MapView from 'react-native-maps';
import { EvilIcons } from "@expo/vector-icons";
import { WebView } from 'react-native-webview';

import useLocation from "@/hooks/useLocation";

export default function Map(){
    const {latitude, longitude, errorMsg} = useLocation();
    
    return (
        <View style={styles.container}>
            {/* <MapView style={styles.map}
                initialRegion={{
                    latitude: 3.844119,
                    longitude: 11.501346,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            </MapView> */}

            <WebView
                source={{ uri: 'https://testmap-five.vercel.app' }}
                style={styles.webView}
            />

            

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // backgroundColor: 'red',

    },
    map: {
        height: '0%',
    },
    webView: {
        flex: 1,
        height: '100%',
    }

})




// import { Text , View, StyleSheet } from "react-native";
// import MapView, { Marker } from 'react-native-maps';
// import { EvilIcons } from "@expo/vector-icons";
// import { useEffect , useState} from "react";
// import Geolocation from 'react-native-geolocation-service';

// {/* <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /> */}
// {/* <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /> */}



// export default function Map(){

//     const [region, setRegion] = useState({
//       latitude: 3.844119,
//       longitude: 11.501346,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });


//     useEffect(() => {
//         const geolocation = Geolocation;

//     if (geolocation){
//         const watchId = geolocation.watchPosition(
//             (position) => {
//               console.log(position);
//               setRegion({
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//               });

//             },
//             (error) => {
//               console.log(error);
//             },
//             {
//               enableHighAccuracy: true,
//               distanceFilter: 10,
//             }
//           );
//         }  else {
//             console.log('Not available')
//         }
//         // const watchID = navigator.geolocation.watchPosition(
//         //     (position) => {
//         //       setRegion({
//         //         latitude: position.coords.latitude,
//         //         longitude: position.coords.longitude,
//         //         latitudeDelta: 0.0922,
//         //         longitudeDelta: 0.0421,
//         //       });
//         //     },
//         //     (error) => console.log(error),
//         //     {
//         //       enableHighAccuracy: true,
//         //       timeout: 20000,
//         //       maximumAge: 1000,
//         //     //   distanceFilter: 1
//         //     }
//         //   );
//            return () => {
//             Geolocation.clearWatch(watchId);
//             // navigator.geolocation.clearWatch(watchID);
//            }
//         , []);

//     return (
//         <View style={styles.container}>
//             <MapView style={styles.map} initialRegion={region}
//                 // initialRegion={{
//                 //     latitude: 3.844119,
//                 //     longitude: 11.501346,
//                 //     latitudeDelta: 0.0922,
//                 //     longitudeDelta: 0.0421,
//                 // }}
//             >
//                 <Marker 
//                     coordinate={{
//                         latitude: region.latitude,
//                         longitude: region.longitude,
//                     }}
//                     title="Driver's Location"
//                     description="this is the drivers current location"
//                 />
//             </MapView>
            

//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         backgroundColor: 'red',

//     },
//     map: {
//         height: '100%',
//     }

// })