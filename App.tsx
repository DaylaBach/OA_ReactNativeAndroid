import React from 'react';
import HomeScreens from './screens/home/HomeScreens';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailScreens from './screens/detail/DetailScreens';
import SubscribeScreens from './screens/subscribe/SubscribeScreens';
import ProductScreens from './screens/product/ProductScreens';
import CartScreens from './screens/cart/CartScreens';
import DeliverScreens from './screens/deliver/DeliverScreens';
import VerifyScreens from './screens/account/VerifyScreens';
import MapScreens from './screens/map/MapScreens';
import SignInScreens from './screens/account/SignInScreens';
import StartScreens from './screens/start/StartScreens';
import StartLoginScreens from './screens/account/StartLoginScreens';
import ForgotScreens from './screens/account/ForgotScreens';
import SignUpScreens from './screens/account/SignUpSreens';
import PaymentScreens from './screens/payment/PaymentScreens';
import SummaryScreens from './screens/payment/SummaryScreens';
import ThankScreens from './screens/payment/ThankScreens';
import CancelSreens from './screens/payment/CancelSreens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './navigation/TabNav';
import CartProvider from './context/CartProvider';
import AuthProvider from './context/AuthContext';
import TrangDau from './screens/introduction/TrangDau';
import StartLunchTime from './screens/introduction/StartLunchTime';
import StartExpress from './screens/introduction/StartExpress';
import GetStarted from './screens/screensLogin/GetStarted';
import EditProfile from './screens/screensLogin/EditProfile';
import SignIn from './screens/screensLogin/SignIn';
import SignUp from './screens/screensLogin/SignUp';
import ForgetPassword from './screens/screensLogin/ForgetPassword';
import ChangPassword from './screens/screensLogin/ChangePassword';
import CheckPassCode from './screens/screensLogin/CheckPassCode';
import StartLogin from './screens/screensLogin/StartLogin';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Order from './screens/cart/Order';
import DeliveryOrderHistory from './screens/cart/DeliveryOrderHistory';
import CancelOrder from './screens/cart/CancelOrder';

const Stack = createNativeStackNavigator();
const App = () =>{
  return(
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
              <Stack.Screen name="TrangDau" component={TrangDau}/>
              {/* <Stack.Screen name="StartLunchTime" component={StartLunchTime}/>
              <Stack.Screen name="StartExpress" component={StartExpress}/>
              <Stack.Screen name="GetStarted" component={GetStarted}/> */}
              <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
              <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
              <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
              <Stack.Screen name='home' component={TabNav}></Stack.Screen>
              <Stack.Screen name='detail' component={DetailScreens}></Stack.Screen>
              <Stack.Screen name='address' component={DeliverScreens}></Stack.Screen>
              <Stack.Screen name='payment' component={PaymentScreens}></Stack.Screen>
              <Stack.Screen name='summary' component={SummaryScreens}></Stack.Screen>
              <Stack.Screen name="ForgetPassword" component={ForgetPassword}></Stack.Screen>
              <Stack.Screen name="ChangePassword" component={ChangPassword}></Stack.Screen>
              <Stack.Screen name="CheckPassCode" component={CheckPassCode}></Stack.Screen>
              <Stack.Screen name="StartLogin" component={StartLogin}></Stack.Screen>
              <Stack.Screen name="thankscreen" component={ThankScreens}></Stack.Screen>
              <Stack.Screen name="Order" component={Order}></Stack.Screen>
              <Stack.Screen name="DeliveryOrderHistory" component={DeliveryOrderHistory}></Stack.Screen>
              <Stack.Screen name="CancelOrder" component={CancelOrder}></Stack.Screen>
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  )
}
export default App;
