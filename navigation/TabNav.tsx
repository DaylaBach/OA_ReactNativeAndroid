import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreens from "../screens/home/HomeScreens";
import ProductScreens from "../screens/product/ProductScreens";
import CartScreens from "../screens/cart/CartScreens";
import ThankScreens from "../screens/payment/ThankScreens";
import DeliverScreens from "../screens/deliver/DeliverScreens";
import { SearchBar } from "react-native-screens";
import Profile from "../screens/screensLogin/Profile";
const Tab = createBottomTabNavigator();
const TabNav = () =>{
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName:any;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Product') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              } else if(route.name==='Cart'){
                iconName = focused ? 'cart' : 'cart-outline';
              }else if(route.name==='Profile'){
                iconName = focused ? 'person' : 'person-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown:false
          })}>
          <Tab.Screen name="Home" component={HomeScreens}></Tab.Screen>
          <Tab.Screen name="Product" component={ProductScreens}></Tab.Screen>
          <Tab.Screen name="Cart" component={CartScreens}></Tab.Screen>
          <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
        </Tab.Navigator>
    )
}
export default TabNav;