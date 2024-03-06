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
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import Productitem from "./Productitem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { decode } from "base-64";

const Home = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% ",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn9N8tffqmjqTf6B1qyulFkklXXTikAsY-sr24Is84Axv0wD60tl7NqqmzXEjdZjMEztw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrE3iXopX--61uOJxQ-MSX8mqy0braYfjhuSJhvEQ1qizo_gXsqd3IgydMLEg_1AtFVnc&usqp=CAU",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setproduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("electronics");
  const { userId, setuserId } = useContext(UserType);
  const [address, setaddress] = useState([]);
  const [selectedaddress, setselectedaddress] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          const decoded = JSON.parse(decode(token.split(".")[1]));
          // console.log(decoded);
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
  useEffect(() => {
    if (userId) {
      fetchaddress();
    }
  }, [userId, modalVisible]);
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
  // console.log(address)
  // console.log(userId);
  const [items, setItems] = useState([
    { label: "Mens clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "Electronic", value: "electronics" },
    { label: "Womens Clothings", value: "women's clothing" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await axios.get("https://fakestoreapi.com/products");
        setproduct(item.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const naviagtion = useNavigation();
  const cart = useSelector((state) => state.Cart.Cart);
  // console.log(cart);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#f3f4f6", marginBottom: 50 }}>
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
            <Text
              style={{ fontSize: 14, color: "#2d3436", fontWeight: "bold" }}
            >
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

        <Pressable
          style={{
            backgroundColor: "#f52e79",
            marginVertical: 20,
            width: width,
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            bottom: 40,
          }}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons
            name="location-on"
            size={25}
            color="white"
            style={{ marginHorizontal: 20 }}
          />

          {selectedaddress ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginRight: 10,
                color: "white",
                width:width*0.7,
                textTransform:'capitalize'
              }}
              numberOfLines={1}
            >
              Delivered to {selectedaddress.name} - {selectedaddress.phoneno}
            </Text>
          ) : (
            <Text style={{
              fontSize: 16,
              fontWeight: "500",
              marginRight: 10,
              color: "white",
             alignItems:'center',
             justifyContent:'center',
             
            }}    numberOfLines={1}
            >Add an Address - or a pickup point </Text>
          )}

          <AntDesign
            name="down"
            size={24}
            color="white"
            style={{ marginRight: 20 }}
          />
        </Pressable>
        <ScrollView
          style={{
            backgroundColor: "#ffffff",
            position: "relative",
            bottom: 60,
            marginBottom: 130,
          }}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: "white", paddingBottom: 10 }}
          >
            {list.map((val, ind) => (
              <Pressable key={ind} style={{ marginHorizontal: 10 }}>
                <Image
                  source={{ uri: val.image }}
                  style={{
                    height: height * 0.09,
                    width: width * 0.16,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 3,
                  }}
                >
                  {val.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <SliderBox
            images={images}
            disableOnPress={true}
            autoplay={true}
            circleLoop
            ImageComponentStyle={{ width: width }}
          />
          <Text
            style={{
              fontSize: 24,
              color: "#2d3436",
              fontWeight: "bold",
              marginHorizontal: 10,
              marginTop: 20,
            }}
          >
            Trending deals of the Week
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {deals.map((val, ind) => (
              <Pressable
                key={ind}
                onPress={() => {
                  naviagtion.navigate("Info", {
                    id: val.id,
                    title: val.title,
                    oldPrice: val.oldPrice,
                    offer: val.offer,
                    price: val.price,
                    image: val.image,
                    carouselImages: val.carouselImages,
                    color: val.color,
                    size: val.size,
                    value: val,
                  });
                }}
              >
                <Image
                  source={{ uri: val.image }}
                  style={{
                    height: height * 0.35,
                    width: width * 0.5,
                    alignItems: "center",
                    justifyContent: "center",
                    resizeMode: "contain",
                  }}
                />
              </Pressable>
            ))}
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
              fontSize: 24,
              color: "#2d3436",
              fontWeight: "bold",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            Today's Deals
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: "white", paddingBottom: 10 }}
          >
            {offers.map((val, ind) => (
              <Pressable
                key={ind}
                onPress={() => {
                  naviagtion.navigate("Info", {
                    id: val.id,
                    title: val.title,
                    oldPrice: val.oldPrice,
                    offer: val.offer,
                    price: val.price,
                    image: val.image,
                    carouselImages: val.carouselImages,
                    color: val.color,
                    size: val.size,
                    value: val,
                  });
                }}
              >
                <Image
                  source={{ uri: val.image }}
                  style={{
                    height: height * 0.2,
                    width: width * 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    resizeMode: "contain",
                    marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    backgroundColor: "#ff0033",
                    color: "white",
                    padding: 5,
                    marginHorizontal: 10,
                    fontSize: 15,
                    borderRadius: 10,
                  }}
                >
                  Upto {val.offer} off
                </Text>
              </Pressable>
            ))}
          </ScrollView>
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
              fontSize: 22,
              fontWeight: "900",
              marginHorizontal: 10,
              marginVertical: 20,
              color: "black",
            }}
          >
            Shop By Your Favorite Category
          </Text>
          <View
            style={{
              width: width * 0.5,

              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 10,
              textAlign: "center",
              zIndex: 1000,
              fontSize: 20,
            }}
          >
            <DropDownPicker
              style={{
                zIndex: 1000,
                backgroundColor: "#f3f4f6",
                alignItems: "center",
                justifyContent: "center",

                textAlign: "center",
              }}
              placeholder="Choose Category "
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
                fontSize: 15,
              }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
  {product
    .filter((item) => item.category === value)
    .map((val) => (
      <Productitem key={val.id} data={val} />
    ))}
</View>

        </ScrollView>
      </SafeAreaView>
      <BottomModal
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
        height={0.5}
        width={1}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onSwipeOut={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
      >
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: "fff",
          }}
        >
          <Text
            style={{
              fontSize: 19,
              fontWeight: 600,
              marginHorizontal: 10,
              color: "#222f3e",
            }}
          >
            Choose your Location
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 600,
              marginHorizontal: 10,
              color: "gray",
              marginVertical: 10,
            }}
          >
            Select a delivery location to see product availability and delievery
            options
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
       
          >
             {address.map((val, ind) => (
                <Pressable
                  key={ind}
                  onPress={() => {
                    setselectedaddress(val);
                    // console.log(selectedaddress);
                  }}
                  style={{
                    backgroundColor:
                      selectedaddress === val ? "#FBCEB1" : "white",
                    width: width * 0.38,
                    height: height * 0.18,
                  
                    borderColor: "#c8d6e5",
                    borderWidth: 1,
                    overflow: "hidden",
               
                    paddingHorizontal: 10,
                    marginHorizontal:10,
                 
                   paddingBottom:5,
                   alignContent:'center',
                   
                   alignSelf:'center',
                   textAlign:'center',
                   paddingVertical:10
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      width: 120,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        color: "#2d3436",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
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
                      }}
                      color="red"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#2d3436",
                      fontWeight: "500",

                      textTransform: "capitalize",
                    }}
                    numberOfLines={1}
                  >
                    {val.houseno} , {val.landmark}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#2d3436",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                    numberOfLines={2}
                  >
                    {val.city}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#2d3436",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                    numberOfLines={1}
                  >
                    {val.country}
                  </Text>
                </Pressable>
              ))}
            <Pressable
              style={{
                alignItems: "center",
                width: width * 0.38,
                height: height * 0.18,
                justifyContent: "center",
                borderColor: "#c8d6e5",
                borderWidth: 1,

                marginLeft: 10,
                paddingHorizontal: 10,
                marginHorizontal:10,
             
               paddingBottom:5,
               alignContent:'center',
               
               alignSelf:'center',
               textAlign:'center',
               paddingVertical:10
              }}
              onPress={() => {
                setModalVisible(false);
                naviagtion.navigate("Addaddress");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 500,

                  color: "#ff6b6b",
                  textAlign: "center",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>
          <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
            <MaterialIcons
              name="location-on"
              size={25}
              color="#0abde3"
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginRight: 10,
                color: "#0abde3",
              }}
            >
              Enter an Indian Pincode
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
            <MaterialIcons
              name="location-searching"
              size={25}
              color="#0abde3"
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginRight: 10,
                color: "#0abde3",
              }}
            >
              Use My Current location
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
            <AntDesign
              name="earth"
              size={25}
              color="#0abde3"
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginRight: 10,
                color: "#0abde3",
              }}
            >
              Deliver outside Sagar
            </Text>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

// #6dcffc
export default Home;
