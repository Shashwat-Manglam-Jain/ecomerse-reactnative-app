import { View, Text, Image, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
const { height, width } = Dimensions.get("window");
const Productitem = ({ data ,key }) => {
  const [addtocarts, setaddtocart] = useState(false);
  const dispatch = useDispatch();
  const addedToCart = (val) => {
    setaddtocart(true);
    dispatch(addToCart(val));
    setTimeout(() => {
      setaddtocart(false);
    }, 60000);
  };
  const cart = useSelector((state) => state.Cart.Cart);

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }} key={key}
    >
      <Pressable>
        <Image
          source={{ uri: data.image }}
          style={{
            height: height * 0.33,
            width: width * 0.4,
            alignItems: "center",
            justifyContent: "center",
            resizeMode: "contain",
          }}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            color: "#2d3436",
            fontWeight: "bold",
            marginHorizontal: 10,

            width: width * 0.35,
          }}
        >
          {data.title}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: "#2d3436",
              fontWeight: "bold",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            ₹ {Math.round(data.price)}
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: "#ffa41c",
              fontWeight: "bold",
              marginHorizontal: 5,
              marginTop: 10,
            }}
          >
            {data.rating.rate} rating
          </Text>
        </View>
        <Pressable onPress={() => addedToCart(data)}>
          {addtocarts ? (
            <Text
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                backgroundColor: "#ffa41c",
                color: "white",
                padding: 5,
                marginHorizontal: 5,
                fontSize: 15,
                borderRadius: 10,
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
                backgroundColor: "#ffd814",
                color: "black",
                padding: 5,
                marginHorizontal: 5,
                fontSize: 15,
                borderRadius: 10,
              }}
            >
              Add to Cart
            </Text>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

export default Productitem;
