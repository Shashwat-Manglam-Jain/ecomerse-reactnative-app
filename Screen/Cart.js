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
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";


const { height, width } = Dimensions.get("window");

const Cartitem = () => {
  const cart = useSelector((state) => state.Cart.Cart) || [];
  console.log(cart);
const navigation=useNavigation()
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((prev, curr) => prev + curr, 0);

  console.log(total);
  const dispatch=useDispatch()

  const incrementQnty=(value)=>{
dispatch(incrementQuantity(value))

  }
  const decrementQnty=(val)=>{
    dispatch( decrementQuantity(val))
  }
const deleteitem=(val)=>{
  dispatch(  removeFromCart(val))
}
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "auto" }}>
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
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "600",
            marginHorizontal: 15,

            backgroundColor: "white",
          }}
        >
          Subtotal :
        </Text>
        <Text
          style={{
            fontSize: 21,
            color: "#2d3436",
            fontWeight: "bold",
            marginHorizontal: 10,

            backgroundColor: "white",
          }}
        >
          ₹{total}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          color: "#2d3436",
          fontWeight: "600",
          marginHorizontal: 15,

          backgroundColor: "white",
        }}
      >
        EMI details Available
      </Text>
      <Pressable onPress={()=>{total===0?null:navigation.navigate("Confirm")}}>
        <Text
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            backgroundColor: "#ffd814",
            color: "black",
            padding: 10,
            marginHorizontal: 10,
            fontSize: 16,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          Proceed to Buy ({cart.length}) items
        </Text>
      </Pressable>
      <ScrollView
        style={{ backgroundColor: "white", marginBottom: 295 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            borderBlockColor: "#f3f4f6",
            borderWidth: 2,
            width: width,
            marginTop: 15,
          }}
        />
          {cart.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: "#2d3436" }}>
              Your cart is empty
            </Text>
          </View>
        ) : (
        cart.map((val, ind) => {
          if (!val) return null;
          return( <View key={ind}>
            <View
              style={{
                flexDirection: "row",
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: val.image }}
                style={{
                  height: height * 0.28,
                  width: width * 0.35,
                  padding: 10,
                  paddingTop: 10,
                  resizeMode: "contain",
                }}
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  width: width * 0.33,
                  marginHorizontal: 15,
                  marginTop: 20,
                }}
                numberOfLines={10}
              >
                {val.title}
              </Text>
              <View>
                <Text
                  style={{
                    fontSize: 21,
                    color: "#2d3436",
                    fontWeight: "bold",

                    marginTop: 20,
                    backgroundColor: "white",
                  }}
                >
                  ₹{val.price}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: "green",
                    fontWeight: "600",
                  }}
                >
                  In Stock
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    gap: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
            
                  {val.quantity > 1 ? (
                    <Pressable
                      style={{ backgroundColor: "gray" }}
                      onPress={() => decrementQnty(val)}
                    >
                     <AntDesign name="minussquare" size={24} color="white" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => decrementQnty(val)}
                    >
                     <AntDesign name="delete" size={25} color="red" />
                    </Pressable>
                  )}
                  <Text
                    style={{
                      fontSize: 21,
                      color: "#34495e",
                      fontWeight: "600",
                      backgroundColor: "white",
                    }}
                  >
                    {val.quantity}
                  </Text>
                  
                  <Pressable style={{ backgroundColor: "gray" }}  onPress={()=>incrementQnty(val)}>
                  <AntDesign name="plussquare" size={24} color="white" />
                  </Pressable>
                </View>
             <Pressable onPress={()=>deleteitem(val)}>
             <Text
                  style={{
                    fontSize: 18,
                    color: "gray",
                    fontWeight: "600",
                    backgroundColor: "white",
                    borderColor: "#ecf0f1",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    marginTop:20
                  }}
                >
                  Delete
                </Text>
             </Pressable>
              </View>
            </View>

            <View
              style={{
                borderBlockColor: "#f3f4f6",
                borderWidth: 2,
                width: width,
                marginTop: 15,
              }}
            />
          </View>)
         
            }))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cartitem;
