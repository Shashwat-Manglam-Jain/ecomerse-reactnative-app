import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
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
    TouchableOpacity,
} from "react-native";

const { height, width } = Dimensions.get("window");

const Signup = () => {
    const navigation = useNavigation();
    const [name, setname] = useState('');
    const [pass, setpass] = useState('');
    const [email, setemail] = useState('');

   

    const handlesubmit = () => {
        const user = { name, email, password: pass };
      
        axios.post('http://10.0.2.2:8000/signup', user)
          .then((res) => {
            console.log(res);
            Alert.alert(
              "Registered Successfully",
              "Now you have to verify email",
              "Check your email"
            );
            setname("");
            setpass("");
            setemail("");
          })
          .catch((error) => {
            Alert.alert(
                'Registration Error !!',
                `Failed to register. Please try again.`,
                {error}
               
              );
              
            console.log("Registration failed", error);
          });
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: "white",
                paddingTop:20,
                alignItems: "center",
                justifyContent: "space-between",
                
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
                        marginVertical: 10,
                        backgroundColor: "#f3f4f6",
                    }}
                >
                    <Text style={{ fontSize: 30, color: "#2d3436", fontWeight: "bold", marginBottom: 5, marginLeft: 5 }}>
                        Create Account
                    </Text>
                    <Text style={{ fontSize: 18, color: "#2d3436", fontWeight: "600", marginVertical: 10, marginHorizontal: 5 }}>
                        Your Name
                    </Text>
                    <TextInput
                        style={{
                            padding: 10,
                            backgroundColor: "white",
                            borderColor: "gray",
                            borderWidth: 1,
                            fontSize: 18,
                        }}
                        value={name}
                        onChangeText={(text) => setname(text)}
                    />

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
                        onChangeText={(text) => setemail(text)}
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
                            marginBottom: 20
                        }}
                        
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={(text) => setpass(text)}
                    />
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}    onPress={handlesubmit}>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#2d3436",
                                backgroundColor: "#25CCF7",
                                alignContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: 20,

                                padding: 10,
                                width: width * 0.85,
                                textAlign: 'center',

                            }}
                         
                        >
                            Continue
                        </Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>

                <Pressable>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#2d3436",
                            backgroundColor: "#dfe6e9",
                            alignContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                            padding: 10,
                            width: width * 0.85,
                            textAlign: 'center',

                        }}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Already have an account?
                    </Text>

                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;
