import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Home';
import Login from '../Screen/Login';
import Signup from '../Screen/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Profile from '../Screen/Profile';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Productinfo from '../Screen/Productinfo';
import Addaddress from '../Screen/Addaddress';
import Address from '../Screen/Address';
import Cartitem from '../Screen/Cart';
import ConfirmScreen from '../Screen/ConfirmScreen';
import OrderScreen from '../Screen/OrderScreen';





const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel:"",
            tabBarLabelStyle:{color:'black',display:'none'},
            headerShown:false,
            tabBarIcon:({focused})=>
            focused?(<Entypo name="home" size={24} color="#f52e79" />)
            :(<AntDesign name="home" size={24} color="black" />)

        }}/>

<Tab.Screen name="Profile" component={Profile} options={{
            tabBarLabel:"Profile",
            tabBarLabelStyle:{color:'black',display:'none'},
            headerShown:false,
            tabBarIcon:({focused})=>
            focused?(<Ionicons name="person" size={24} color="#f52e79" />)
            :(<Ionicons name="person-outline" size={24} color="black" />)

        }}/>


<Tab.Screen name="Cart" component={Cartitem} options={{
            tabBarLabel:"Cart",
            tabBarLabelStyle:{color:'black',display:'none'},
            headerShown:false,
            tabBarIcon:({focused})=>
            focused?(<AntDesign name="shoppingcart" size={24} color="#f52e79" />)
            :(<AntDesign name="shoppingcart" size={24} color="black" />)

        }}/>
      </Tab.Navigator>
    );
  }




const Stacknavigation = () => {
    return (<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signin" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Info" component={Productinfo} options={{ headerShown: false }} />
            <Stack.Screen name="Addaddress" component={Addaddress} options={{ headerShown: false }} />
            <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
            <Stack.Screen name="Confirm" component={ConfirmScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Stacknavigation