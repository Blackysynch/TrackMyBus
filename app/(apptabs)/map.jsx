import { Text , View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { EvilIcons } from "@expo/vector-icons";



export default function Map(){
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 3.844119,
                    longitude: 11.501346,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            </MapView>
            

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'red',

    },
    map: {
        height: '100%',
    }

})