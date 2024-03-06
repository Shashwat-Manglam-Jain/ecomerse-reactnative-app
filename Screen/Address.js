import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
const { height, width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { decode } from "base-64";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const Address = () => {
  const [adress, setaddress] = useState("");
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [house, sethouse] = useState("");
  const [area, setarea] = useState("");
  const [landmark, setlandmark] = useState("");
  const [pincode, setpincode] = useState("");
  const { userId, setuserId } = useContext(UserType);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decoded = JSON.parse(decode(token.split(".")[1]));
          const userId = decoded.userId;
          setuserId(userId);
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };
    fetchUser();
  }, []);
  console.log(userId);

  const handleaddaddress = async () => {
    try {
      const address = {
        name: name,
        phoneno: mobile,
        houseno: house,
        street: area,
        landmark: landmark,
        city: area,
        state: area,
        country: adress,
        postalcode: pincode,
      };
      
      const response = await axios.post("http://10.0.2.2:8000/address", { userId, address });
      
      console.log(response.data); // Log response data for debugging
      
      Alert.alert("Successfully Added Address!!");
      setTimeout(() => {
        navigation.goBack();
      }, 500);
      
      // Clear input fields
      setaddress("");
      setmobile("");
      setarea("");
      setlandmark("");
      setpincode("");
      setname("");
    } catch (error) {
      console.log("Failed in adding address:", error);
      Alert.alert("Failed in adding address!");
    }
  };
  

  return (
    <ScrollView>
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
      <View style={{ position: "relative", bottom: 20 }}>
        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 15,
            fontWeight: "bold",
          }}
        >
          Add a new Address
        </Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            width: width * 0.9,

            fontSize: 18,
            marginHorizontal: 15,
          }}
          value={adress}
          onChangeText={(e) => setaddress(e)}
          placeholder="eg Sagar, M.P, India"
        />

        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 15,
            fontWeight: "bold",
          }}
        >
          Full name (First and last name)
        </Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            width: width * 0.9,

            fontSize: 18,
            marginHorizontal: 15,

            fontSize: 18,
          }}
          value={name}
          onChangeText={(e) => setname(e)}
          placeholder="enter your name"
        />
        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 15,
            fontWeight: "bold",
          }}
        >
          Mobile number
        </Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            width: width * 0.9,

            fontSize: 18,
            marginHorizontal: 15,

            fontSize: 18,
          }}
          value={mobile}
          onChangeText={(e) => setmobile(e)}
          placeholder="Mobile No"
        />
        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 15,
            fontWeight: "bold",
          }}
        >
          Flat,House No,Building,Company
        </Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            width: width * 0.9,

            fontSize: 18,
            marginHorizontal: 15,

            fontSize: 18,
          }}
          value={house}
          onChangeText={(e) => sethouse(e)}
        />
        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 15,
            fontWeight: "bold",
          }}
        >
          Area,Street,sector,village
        </Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            width: width * 0.9,

            fontSize: 18,
            marginHorizontal: 15,

            fontSize: 18,
          }}
          value={area}
          onChangeText={(e) => setarea(e)}
        />
        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 15,
            fontWeight: "bold",
          }}
        >
          Landmark
        </Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            width: width * 0.9,

            fontSize: 18,
            marginHorizontal: 15,

            fontSize: 18,
          }}
          value={landmark}
          onChangeText={(e) => setlandmark(e)}
          placeholder="eg near appollo hospital"
        />
        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginVertical: 10,
            marginHorizontal: 15,
            fontWeight: "bold",
          }}
        >
          Pincode
        </Text>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "white",
            width: width * 0.9,

            fontSize: 18,
            marginHorizontal: 15,

            fontSize: 18,
          }}
          value={pincode}
          onChangeText={(e) => setpincode(e)}
          placeholder="Enter Pincode"
        />

        <Pressable onPress={handleaddaddress}>
          <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
              backgroundColor: "#ff0033",
              color: "white",
              padding: 10,
              marginHorizontal: 10,
              fontSize: 20,
              borderRadius: 10,
              fontWeight: "600",
              marginBottom: 15,
            }}
          >
            Add Address
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Address;
