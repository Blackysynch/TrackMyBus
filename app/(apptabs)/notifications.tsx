import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

//this page will change according to the user or driver
const NotificationsPage  =() => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Feather name="upload" size={24} color="black" />
      <Text>notif</Text>
    </View>
  );
}


export default NotificationsPage;


