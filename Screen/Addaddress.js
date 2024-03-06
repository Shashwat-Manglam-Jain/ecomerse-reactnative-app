import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";

const { height, width } = Dimensions.get("window");
const Addaddress = () => {
  const [address, setaddress] = useState([]);
  const { userId, setuserId } = useContext(UserType);
  const navigation = useNavigation();
  useEffect(() => {
  
      fetchaddress();
   
  }, []);
  useFocusEffect(useCallback(
    () => {
      fetchaddress()
    },
    [],
  ))


  
  const fetchaddress = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/address/${userId}`
      );
      const { address } = response.data;
      setaddress(address);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(address);
  return (
    <ScrollView
      style={{ backgroundColor: "white", height: "auto" }}
      showsVerticalScrollIndicator={false}
    >
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
      <View style={{ position: "relative", bottom: 20 }}>
        <Text
          style={{
            fontSize: 22,
            color: "#2d3436",
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          Your Address
        </Text>
        <View
          style={{
            borderBlockColor: "#f3f4f6",
            borderWidth: 2,
            width: width,
            marginTop: 15,
          }}
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Address");
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "#2d3436",
              fontWeight: "500",
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: "white",
              textAlign: "center",
            }}
          >
            Add a new Address
          </Text>
          <AntDesign
            name="right"
            size={24}
            color="black"
            style={{ marginTop: 10, marginHorizontal: 10 }}
          />
        </Pressable>
        <View
          style={{
            borderBlockColor: "#f3f4f6",
            borderWidth: 2,
            width: width,
            marginTop: 15,
          }}
        />
      </View>
      <View
      
      >
        {address.map((val, ind) => (
          <View key={ind}  style={{
            borderBlockColor: "#D0D0D0",
            borderWidth: 2,
            marginLeft: 15,
            marginRight: 15,
            marginBottom:10,
            borderRightColor:'#D0D0D0',
            borderLeftColor:'#D0D0D0',
            paddingHorizontal:15,
            marginBottom:25
          }}>
            <View style={{ alignItems: "center", flexDirection: "row",paddingTop:10 }}>
              <Text
                style={{
                  fontSize: 17,
                  color: "#2d3436",
                  fontWeight: "bold",

                  backgroundColor: "white",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                {val.name}
              </Text>
              <Ionicons
                name="location"
                size={24}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 10,
                }}
                color="red"
              />
            </View>
            <Text
              style={{
                fontSize: 17,
                color: "#2d3436",
                fontWeight: "500",
                textTransform:'capitalize',
                backgroundColor: "white",
              }}
              numberOfLines={1}
            >
              {val.houseno} , {val.landmark}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: "#2d3436",
                fontWeight: "500",
                textTransform:'capitalize',
                backgroundColor: "white",
              }}
            >
              {val.city}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: "#2d3436",
                fontWeight: "500",
                textTransform:'capitalize',
                backgroundColor: "white",
              }}
            >
              {val.country}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: "#2d3436",
                fontWeight: "500",
                textTransform:'capitalize',
                backgroundColor: "white",
              }}
            >
              phoneno : {val.phoneno}{" "}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: "#2d3436",
                fontWeight: "500",
                textTransform:'capitalize',
              }}
            >
              pin code : {val.postalcode}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                textTransform:'capitalize',
                
              }}
            >
              <Pressable
                style={{
                 
                  color: "#2d3436",
                  fontWeight: "500",
                 
                  marginTop: 10,
                  backgroundColor: "white",
                 
                }}
              >
                <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              
              backgroundColor: "#ff0033",
              color: "white",
              padding: 10,
       
              fontSize: 15,
              borderRadius: 10,
              fontWeight: "600",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
           Edit
          </Text>
              </Pressable>
              <Pressable
                style={{
              
                  color: "#2d3436",
                  fontWeight: "500",
                  marginTop: 10,
                  backgroundColor: "white",
                  textAlign: "center",
                  marginHorizontal:10
                }}
              >
               <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              
              backgroundColor: "#ff0033",
              color: "white",
              padding: 10,
       
              fontSize: 15,
              borderRadius: 10,
              fontWeight: "600",
              marginBottom: 15,
              textAlign: "center"
          
            }}
          >
            Remove
          </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      
    </ScrollView>
  );
};

export default Addaddress;
