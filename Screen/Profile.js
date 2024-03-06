import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const Profile = () => {
  const { userId } = useContext(UserType); // Ensure userId is correctly retrieved from context
  // console.log("userId:", userId); // Log userId to debug

  const [user, setUser] = useState(null); // Initialize user state as null
  const [order, setOrder] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return; // If userId is not set, return early

        const response = await axios.get(
          `http://10.0.2.2:8000/Profile/${userId}`
        );
        const userData = response.data.user; // Ensure the data structure matches the response
        setUser(userData);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser(); // Call fetchUser inside useEffect
  }, [userId]); // Add userId to dependency array to trigger useEffect when it changes

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!userId) return; // If userId is not set, return early

        const response = await axios.get(
          `http://10.0.2.2:8000/Order/${userId}`
        );
        const orders = response.data.order; // Ensure the data structure matches the response
        setOrder(orders);
      } catch (error) {
        console.log("Error fetching order:", error);
      }
    };

    fetchOrder(); // Call fetchOrder inside useEffect
  }, [userId]); // Add userId to dependency array to trigger useEffect when it changes
  console.log(order);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Home");
    } catch (error) {
      console.error("Error while logging out:", error);
      // Handle errors, if necessary
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <View style={{ alignItems: "center", flex: 1, flexDirection: "row" }}>
          <Ionicons
            name="menu"
            size={30}
            color="black"
            style={{ marginRight: 50 }}
          />
          <Image
            source={require("../assets/ic.png")}
            style={{
              height: height * 0.1,
              width: width * 0.2,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              resizeMode: "contain",
            }}
          />
          <Text style={{ fontSize: 14, color: "#2d3436", fontWeight: "bold" }}>
            NEW
            <Text
              style={{ fontSize: 22, color: "#2d3436", fontWeight: "bold" }}
            >
              Sagar
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "red",
                fontWeight: "bold",
              }}
            >
              Computer
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          backgroundColor: "#e4e5e7",
          position: "relative",
          bottom: 20,

          padding: 5,
          width: width * 0.9,
        }}
      >
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={"gray"}
          style={{ marginHorizontal: 10, fontSize: 18, width: width * 0.75 }}
        />
      </View>
      <Text
        style={{
          marginHorizontal: 10,
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        Welcome {user?.name}
      </Text>
      <View
       style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderColor: "#D0D0D0",
            borderWidth: 1,
            backgroundColor: "#ccc",
            paddingHorizontal: 10,
            marginVertical: 10,
            borderRadius: 50,
            width: width * 0.4,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Your Order
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderColor: "#D0D0D0",
            borderWidth: 1,
            backgroundColor: "#ccc",
            paddingHorizontal: 10,
            marginVertical: 10,
            borderRadius: 50,
            width: width * 0.4,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Your Account
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderColor: "#D0D0D0",
            borderWidth: 1,
            backgroundColor: "#ccc",
            paddingHorizontal: 10,
            marginVertical: 10,
            borderRadius: 50,
            width: width * 0.4,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Buy Again
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderColor: "#D0D0D0",
            borderWidth: 1,
            backgroundColor: "#ccc",
            paddingHorizontal: 10,
            marginVertical: 10,
            borderRadius: 50,
            width: width * 0.4,
            marginHorizontal: 20,
          }}
          onPress={logout}
        >
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 10,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Log Out
          </Text>
        </Pressable>
      
        
      </View>
      <ScrollView horizontal >{order?.map((orderItem, index) => (
          <View key={index}>
            {orderItem.Product.map((product, productIndex) => (
              <Pressable
                key={productIndex}
                style={{
                  
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                flexWrap:'wrap',
                  paddingHorizontal:15
                }}
              >
                <Image
                  source={{ uri: product.image }}
                  style={{ width: width * 0.4, height: height * 0.4 ,resizeMode:"contain",flexWrap:'wrap',}}
                />
             <Text
            style={{
            
              fontSize: 18,
              fontWeight: "bold",
              color: "gray",
              textAlign: "center",
              color:'red'
            }}
          >
           ₹ {product.price}
          </Text>
              </Pressable>
            ))}
          </View>
        ))}</ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
