import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");
const OrderScreen = () => {
    const navigation=useNavigation()
    useEffect(() => {
     setTimeout(()=>{
        navigation.navigate("Home")
     },2000)
    }, [])
    
  return (
    <View>
      <LottieView source={require("../assets/sparkle.json")}   style={{
          height: height,
          position: "absolute",
        
          width: width,
          alignSelf: "center",
        }} autoPlay loop />
      
      <LottieView source={require("../assets/thumbs.json")}  style={{
          height: height,
          position: "absolute",
        
          width: width,
          alignSelf: "center",
        }} autoPlay loop />
    </View>
  );
};

export default OrderScreen;
