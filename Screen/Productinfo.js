import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const Productinfo = ({}) => {
  const [addtocart, setaddtocart] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const AddToCarts = (item) => {
    setaddtocart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setaddtocart(false);
    }, 60000);
  };
  const cart = useSelector((state) => state.Cart.Cart);
  console.log(cart);
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          color: "#2d3436",

          position: "relative",
          bottom: 17,
          backgroundColor: "white",
          marginBottom: 153,
        }}
        key={route.params.id}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          {route.params.carouselImages.map((val, ind) => (
            <View>
              <ImageBackground
                source={{ uri: val }}
                style={{
                  height: height * 0.5,
                  width: width,
                  padding: 10,
                  paddingTop: 10,

                  resizeMode: "contain",
                }}
                key={ind}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",

                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ff0033",
                      width: 50,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 15,
                      }}
                    >
                      {route.params.offer || "10%"} off
                    </Text>
                  </View>
                  <Pressable
                    style={{
                      backgroundColor: "#e4e5e7",
                      width: 50,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                      flexDirection: "row",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={28}
                      color="black"
                    />
                  </Pressable>
                </View>
                <Pressable
                  style={{
                    backgroundColor: "#e4e5e7",
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                    flexDirection: "row",
                    marginTop: "auto",
                  }}
                >
                  <AntDesign name="hearto" size={28} color="black" />
                </Pressable>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>

        <Text
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "800",
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: "white",
          }}
        >
          {route.params.title}
        </Text>
        <Text
          style={{
            fontSize: 24,
            color: "#2d3436",
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          ₹ {Math.round(route.params.price)}
        </Text>

        <View
          style={{
            borderBlockColor: "#f3f4f6",
            borderWidth: 2,
            width: width,
            marginTop: 15,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            fontWeight: "100",
            textAlign: "center",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#2d3436",
              fontWeight: "100",
              marginHorizontal: 5,
              marginTop: 10,
            }}
          >
            Color:
          </Text>
          <Text
            style={{
              fontSize: 19,
              color: "#2d3436",
              fontWeight: "bold",

              marginTop: 10,
            }}
          >
            {route.params.color}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            fontWeight: "100",
            marginHorizontal: 10,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#2d3436",
              fontWeight: "100",
              marginHorizontal: 5,
              marginTop: 10,
            }}
          >
            Size:
          </Text>
          <Text
            style={{
              fontSize: 19,
              color: "#2d3436",
              fontWeight: "bold",

              marginTop: 10,
            }}
          >
            {route.params.size}
          </Text>
        </View>
        <View
          style={{
            borderBlockColor: "#f3f4f6",
            borderWidth: 2,
            width: width,
            marginTop: 15,
          }}
        />
        <Text
          style={{
            fontSize: 19,
            color: "#2d3436",
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Total: ₹{route.params.price}
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: "#62c1e5",
            fontWeight: "800",
            marginHorizontal: 10,

            marginTop: 10,
          }}
        >
          Free delevery by tomorrow 3PM Order with in 10hr 30min{" "}
        </Text>
        <View
          style={{
            backgroundColor: "#ffffff",

            width: width,
            marginTop: 10,
            flexDirection: "row",

            flex: 1,
          }}
        >
          <MaterialIcons name="location-on" size={30} style={{marginLeft:10}} color="black" />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "900",
              marginHorizontal: 10,
              color: "black",
            }}
          >
            Delivered to Shashwat - Sagar 470004{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "green",
            fontWeight: "bold",
            marginHorizontal: 20,
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          IN Stock
        </Text>
        <Pressable
          onPress={() => {
            AddToCarts(route.params.value);
          }}
        >
          {addtocart ? (
            <Text
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                backgroundColor: "#ff0033",
                color: "white",
                padding: 10,
                marginHorizontal: 10,
                fontSize: 20,
                borderRadius: 10,
                fontWeight: "600",
                marginBottom: 5,
              }}
            >
              Added to Cart
            </Text>
          ) : (
            <Text
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                backgroundColor: "#ff0033",
                color: "white",
                padding: 10,
                marginHorizontal: 10,
                fontSize: 20,
                borderRadius: 10,
                fontWeight: "600",
                marginBottom: 5,
              }}
            >
              Add to Cart
            </Text>
          )}
        </Pressable>
        <Pressable>
          <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              backgroundColor: "#ff0033",
              color: "white",
              padding: 10,
              marginHorizontal: 10,
              fontSize: 20,
              borderRadius: 10,
              fontWeight: "600",
              marginBottom: 40,
            }}
          >
            Buy Now
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Productinfo;
