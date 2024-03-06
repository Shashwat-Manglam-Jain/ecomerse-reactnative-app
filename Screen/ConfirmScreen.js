import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
const { height, width } = Dimensions.get("window");
import { Ionicons, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../redux/CartReducer";
import RazorpayCheckout from 'react-native-razorpay';

const ConfirmScreen = () => {
  const { userId, setuserId } = useContext(UserType);
  const steps = [
    { Title: "Address", Content: "Address Form" },
    { Title: "Delivery", Content: "Delivery Options" },
    { Title: "Payment", Content: "Payment Details" },
    { Title: "Placed Order", Content: "Order Summary" },
  ];
  const [current, setcurrent] = useState(0);
  const [address, setaddress] = useState([]);
  const [selectedoption, setselectedoption] = useState("");
  useEffect(() => {
    if (userId) {
      fetchaddress();
    }
  }, [userId]);
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
  const [selectedaddress, setselectedaddress] = useState([]);
  const [option, setoption] = useState(false);
  const cart = useSelector((state) => state.Cart.Cart) || [];
  // console.log(cart);
  const navigation = useNavigation();
  const total = cart.map((item) => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
const dispatch=useDispatch()
  const handleSubmit = async () => {
    try {
      const orderItem = {
        userId: userId,
        cartItem: cart,
        totalPrice: total,
        shippingAddress: selectedaddress,
        paymentmethod:selectedoption,
      };
      const response = await axios.post(
        `http://10.0.2.2:8000/Order`,orderItem
      );
     if (response.status===200) { setcurrent(4);
      navigation.navigate("Order")
      dispatch( cleanCart())
      console.log("Order Successfully Created",response.data);
     }
    } catch (error) {
      console.log("error in doing order!!", error);
      Alert.alert("Error in doing Payment", error);
    }
  };
const pay=async()=>{
  try {
    const options = {
      description: "Adding To Wallet",
      currency: "INR",
      name: "new Sagar Computer",
      key: " rzp_test_6YWTwaNc8vSDC7",
      amount: total ,
      prefill: {
        email: "void@razorpay.com",
        contact: "9191919191",
        name: "RazorPay Software",
      },
      theme: { color: "#F37254" },
    };

    const data = await RazorpayCheckout.open(options);

    console.log(data)

    const orderItem = {
      userId: userId,
      cartItem: cart,
      totalPrice: total,
      shippingAddress: selectedaddress,
      paymentmethod:selectedoption,
    };
    const response = await axios.post(
      `http://10.0.2.2:8000/Order`,orderItem
    );
   if (response.status===200) { setcurrent(4);
    navigation.navigate("Order")
    dispatch( cleanCart())
    console.log("Order Successfully Created",response.data);
   }
  } catch (error) {
    console.log("error in doing order!!", error);
    Alert.alert("Error in doing Payment", error);
  }
}
  return (
    <SafeAreaView style={{ marginTop: 35, marginHorizontal: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {steps.map((val, ind) => (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {ind > 0 && (
              <View
                style={[
                  {
                    backgroundColor: "green",
                    height: 3,
                    width: width * 0.25,
                    position: "absolute",
                    top: 18,
                    right: 45,
                  },
                  ind <= current && { backgroundColor: "green" },
                ]}
              />
            )}
            <View
              style={[
                {
                  backgroundColor: "#ccc",
                  height: 40,
                  width: 40,
                  alignItems: "center",
                  borderRadius: 20,
                  justifyContent: "center",
                  zIndex: 100,
                },
                ind < current && { backgroundColor: "green" },
              ]}
            >
              {ind < current ? (
                <Text
                  style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
                >
                  <Entypo name="check" size={24} color="white" />
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
                >
                  {ind + 1}
                </Text>
              )}
            </View>
            <Text
              style={{
                marginTop: 10,
                marginHorizontal: 10,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {val.Title}
            </Text>
          </View>
        ))}
      </View>
      <ScrollView
        style={{ marginHorizontal: 10, marginBottom: 75 }}
        showsVerticalScrollIndicator={false}
      >
        {current == 0 && (
          <View>
            <Text
              style={{
                marginVertical: 20,
                marginHorizontal: 10,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Select Delivery Address
            </Text>
            {address.map((val, ind) => (
              <View
                key={ind}
                style={{
                  borderBlockColor: "#D0D0D0",
                  borderWidth: 2,
                  marginLeft: 15,
                  marginRight: 15,
                  marginBottom: 10,
                  borderRightColor: "#D0D0D0",
                  borderLeftColor: "#D0D0D0",
                  paddingHorizontal: 15,
                  marginBottom: 25,
                  flexDirection: "row",
                }}
              >
                <Pressable
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                  }}
                >
                  {selectedaddress && selectedaddress._id == val._id ? (
                    <FontAwesome5 name="dot-circle" size={24} color="#4bae4f" />
                  ) : (
                    <Entypo
                      name="circle"
                      size={24}
                      color="gray"
                      onPress={() => {
                        setselectedaddress(val);
                      }}
                    />
                  )}
                </Pressable>
                <View style={{ paddingRight: 10 }}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      paddingTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        color: "#2d3436",
                        fontWeight: "bold",
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
                      textTransform: "capitalize",
                      paddingRight: 10,
                    }}
                  >
                    {val.houseno} , {val.landmark}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#2d3436",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    {val.city}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#2d3436",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    {val.country}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#2d3436",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    phoneno : {val.phoneno}
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: "#2d3436",
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    pin code : {val.postalcode}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    <Pressable
                      style={{
                        color: "#2d3436",
                        fontWeight: "500",

                        marginTop: 10,
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

                        textAlign: "center",
                        marginHorizontal: 10,
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
                        Remove
                      </Text>
                    </Pressable>
                  </View>
                  {selectedaddress && selectedaddress._id == val._id && (
                    <Pressable
                      style={{
                        color: "#2d3436",
                        fontWeight: "500",

                        textAlign: "center",
                        marginBottom: 10,
                        marginRight: 20,
                      }}
                      onPress={() => {
                        setcurrent(1);
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

                          fontSize: 17,
                          borderRadius: 10,
                          fontWeight: "600",
                          marginBottom: 15,
                          textAlign: "center",
                        }}
                      >
                        Delivered to this Address
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
        {current == 1 && (
          <View>
            <Text
              style={{
                marginVertical: 20,
                marginHorizontal: 10,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Choose Your delivery options
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
                justifyContent: "center",
                backgroundColor: "#ffffff",
                padding: 5,
              }}
            >
              {option ? (
                <FontAwesome5 name="dot-circle" size={24} color="#4bae4f" />
              ) : (
                <Entypo
                  name="circle"
                  size={24}
                  color="gray"
                  onPress={() => {
                    setoption(!option);
                  }}
                />
              )}

              <Text
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    marginVertical: 20,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "normal",
                    color: "green",
                  }}
                >
                  Tomorrow by 10pm
                </Text>
                <Text
                  style={{
                    marginVertical: 20,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "normal",
                    color: "black",
                  }}
                >
                  - FREE delivery for your first Order
                </Text>
              </Text>
            </Pressable>
            <Pressable
              style={{
                color: "#2d3436",
                fontWeight: "500",

                textAlign: "center",
                marginBottom: 10,
                marginTop: 30,
                justifyContent: "center",
              }}
              onPress={() => {
                setcurrent(2);
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

                  fontSize: 17,
                  borderRadius: 10,
                  fontWeight: "600",
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        )}

        {current == 2 && (
          <View>
            <Text
              style={{
                marginVertical: 20,
                marginHorizontal: 10,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Select your payment Method
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",

                borderColor: "#D0D0D0",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                paddingHorizontal: 10,
                marginBottom: 30,
              }}
            >
              {selectedoption == "cash" ? (
                <FontAwesome5 name="dot-circle" size={24} color="#4bae4f" />
              ) : (
                <Entypo
                  name="circle"
                  size={24}
                  color="gray"
                  onPress={() => {
                    setselectedoption("cash");
                  }}
                />
              )}

              <Text
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                Cash on Delivery
              </Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",

                borderColor: "#D0D0D0",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                paddingHorizontal: 10,
                marginBottom: 10,
              }}
            >
              {selectedoption == "card" ? (
                <FontAwesome5 name="dot-circle" size={24} color="#4bae4f" />
              ) : (
                <Entypo
                onPress={() => {
                  setselectedoption("card");
                  Alert.alert("UPI/Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      text: "OK",
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />)}

              <Text
                style={{
                  marginVertical: 6,
                  marginHorizontal: 10,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                UPI / Credit or debit card
              </Text>
            </Pressable>
            <Pressable
              style={{
                color: "#2d3436",
                fontWeight: "500",

                textAlign: "center",
                marginBottom: 10,
                marginTop: 30,
                justifyContent: "center",
              }}
              onPress={() => {
                setcurrent(3);
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

                  fontSize: 17,
                  borderRadius: 10,
                  fontWeight: "600",
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        )}

        {current == 3 && selectedoption == "cash" && (
          <View>
            <Text
              style={{
                marginVertical: 20,
                marginHorizontal: 10,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Order Now
            </Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",

                borderColor: "#D0D0D0",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                paddingHorizontal: 10,
                marginBottom: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 10,
                    alignContent: "center",

                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 19,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Save 5% and never run out
                </Text>
                <Text
                  style={{
                    marginHorizontal: 10,
                    alignContent: "center",

                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "normal",
                    color: "black",
                    marginBottom: 10,
                  }}
                >
                  Turn on auto Delivery
                </Text>
              </View>

              <FontAwesome5 name="chevron-right" size={24} color="black" />
            </Pressable>
            <Pressable
              style={{
                paddingBottom: 10,

                borderColor: "#D0D0D0",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                paddingHorizontal: 10,
                marginBottom: 30,
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  alignContent: "center",

                  alignItems: "center",

                  fontSize: 19,
                  fontWeight: "normal",
                  color: "gray",
                }}
              >
                Shipping to {selectedaddress.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "normal",
                    color: "gray",
                  }}
                >
                  Items
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "normal",
                    color: "gray",
                  }}
                >
                  ₹ {total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "normal",
                    color: "gray",
                  }}
                >
                  Delivery
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "normal",
                    color: "gray",
                  }}
                >
                  ₹ 0
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Order Total
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    marginHorizontal: 10,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "normal",
                    color: "red",
                  }}
                >
                  ₹ {total}
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "column",
                alignItems: "center",

                borderColor: "#D0D0D0",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                paddingHorizontal: 10,
                marginBottom: 10,
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  marginVertical: 6,
                  marginHorizontal: 10,

                  fontSize: 17,
                  fontWeight: "normal",
                  color: "gray",
                }}
              >
                Pay With
              </Text>
              <Text
                style={{
                  marginHorizontal: 10,

                  fontSize: 19,
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Pay on delivery (Cash)
              </Text>
            </Pressable>
            <Pressable
              style={{
                color: "#2d3436",
                fontWeight: "500",

                textAlign: "center",
                marginBottom: 10,
                marginTop: 30,
                justifyContent: "center",
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor: "#ff0033",
                  color: "white",
                  padding: 10,

                  fontSize: 17,
                  borderRadius: 10,
                  fontWeight: "600",
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Place your order
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmScreen;
// color="#4bae4f"
