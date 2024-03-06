import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    SafeAreaView,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Alert,

} from "react-native";

const { height, width } = Dimensions.get("window");





const Login = () => {
    const [pass, setpass] = useState('');
    const [email, setemail] = useState('');
    const navigation = useNavigation()

    useEffect(() => {
        const CheckLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken")
                if (token) {
                    navigation.replace("Main")
                }
            } catch (error) {
                console.log(error);
            }
        }

        CheckLoginStatus()

    }, [])
 

    const handlelogin = () => {
        const user = { email: email, password: pass }
        axios.post("http://10.0.2.2:8000/login", user)
            .then((res) => {
                console.log(res);
                const token = res.data.token;
                AsyncStorage.setItem("authToken", token)
                Alert.alert("Successfully Login!!")
                navigation.replace("Main")

            })
            .catch((err) => {
                console.log('Login Failed!!', err);
                Alert.alert("Login Failed",
                    { err })
            })
    }

   
    return (
        <SafeAreaView
            style={{
                backgroundColor: "white",
                paddingTop: 20,
                alignItems: "center",


            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    backgroundColor: "white",

                    alignItems: "center",


                }}
            >
                <Image
                    source={require("../assets/ic.png")}
                    style={{
                        height: height * 0.2,
                        width: width * 0.4,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10,
                        resizeMode:'contain'
                    }}
                />
                <Text style={{ fontSize: 14, color: "#2d3436", fontWeight: "bold" }}>
                    NEW
                    <Text style={{ fontSize: 22, color: "#2d3436", fontWeight: "bold" }}>
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

                <KeyboardAvoidingView
                    style={{
                        padding: 20,
                        width: width * 0.9,
                        marginHorizontal: 10,
                        marginVertical: 20,
                        backgroundColor: "#f3f4f6",
                    }}
                >
                    <Text style={{ fontSize: 30, color: "#2d3436", fontWeight: "bold", marginBottom: 5, marginLeft: 5 }}>
                        Sign in
                    </Text>
                    <Text style={{ fontSize: 18, color: "#2d3436", fontWeight: "600", marginVertical: 10, marginHorizontal: 5 }}>
                        Email or mobile phone number
                    </Text>
                    <TextInput
                        style={{
                            padding: 10,
                            backgroundColor: "white",
                            borderColor: "gray",
                            borderWidth: 1,
                            fontSize: 18,
                        }}
                        value={email}
                        onChangeText={(e) => setemail(e)}
                    />
                    <Text style={{ fontSize: 18, color: "#2d3436", fontWeight: "600", marginVertical: 10, marginHorizontal: 5 }}>
                        Password
                    </Text>
                    <TextInput
                        style={{
                            padding: 10,
                            backgroundColor: "white",
                            borderColor: "gray",
                            borderWidth: 1,
                            fontSize: 18,
                            marginBottom: 10
                        }}
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={(e) => setpass(e)}
                    />
                    <Pressable style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                    }} onPress={handlelogin}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#2d3436",
                                backgroundColor: "#25CCF7",
                                alignContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 20,
                                marginVertical: 20,
                                padding: 10,
                                width: width * 0.85,
                                textAlign: 'center',
                            }}
                        >
                            Continue
                        </Text>
                    </Pressable>
                </KeyboardAvoidingView>
                <View>
                    <View style={{ borderBlockColor: 'gray', borderWidth: 1, width: width * 0.9 }} />
                    <Text style={{ fontSize: 16, color: "gray", marginVertical: 10, backgroundColor: "white", position: 'relative', textAlign: 'center', margin: 120, bottom: 22 }}>New to App?</Text>

                </View>
                <Pressable>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#2d3436",
                            backgroundColor: "#dfe6e9",
                            alignContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            padding: 10,
                            width: width * 0.85,
                            textAlign: 'center',
                            marginBottom: 10

                        }}
                        onPress={() => navigation.navigate('Signin')}
                    >
                        Create your  account
                    </Text>

                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
