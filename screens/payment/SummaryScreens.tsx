import React, { useContext, useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Alert, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../shared/ApiURL";
import axios from "axios";
import { useCartContext } from "../../context/CartProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SummaryScreens = ({route, navigation}:any) => {
    const {cart, setCartStorageFromCart, getCart, setCartStorageFromDetail, totalPrice, getTotalPrice, calcTotalPrice, order, getOrder, setOrderStorage, payment, getPayment, setPaymentStorage}:any = useCartContext();
    const { Logout, userInfo }: any = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    useEffect(() => {

    }, [])

    axios.get(API_URL + 'api/Account/get-account-by-email' + `?email=${userInfo.email}`)
            .then((res) => { 
                let data = res.data;
                setId(data.id)
                setUserName(data.userName)
                setBirthday(data.birthday)
                setEmail(data.email)
                setPhone(data.phone)
            })
            .catch((e) => {
                console.log(`login error ${e}`);
            });

    const postOrderAndPayment = () => {
        console.log(order)
        axios.post(API_URL+'api/Order/create-order', order).
                then((responseO) => {
                    console.log(responseO.data);
                    if (responseO.data.code == 200) {
                        console.log("Create Order Success!")
                        payment.orderId = responseO.data.data.orderId
                        console.log(payment);
                        axios.post(API_URL+'api/Payment/insert-payment', payment).
                            then((responseP) => {
                                if (responseP.data.code == 200) {
                                    console.log("Thêm mới payment thành công");
                                    AsyncStorage.removeItem("PaymentData");
                                    AsyncStorage.removeItem("OrderData");
                                    AsyncStorage.removeItem("TotalCartPrice");
                                    AsyncStorage.removeItem("CartItem");
                                    getCart(); getOrder(); getTotalPrice(); getPayment();
                                    navigation.push('thankscreen');
                                }else {
                                    console.log("Thêm mới payment thất bại");
                                }
                            })
                        
                    } else {
                        showToast(responseO.data.message);
                    }
                }).catch((err) => console.log(err))
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
            <View style={styles.titlePayment}>
                <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={30}/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.titlePaymentText}>Tổng quan</Text>
                </View>
            </View>
            <View style={styles.contact}>
                <View style={styles.address}>
                    <View style={styles.addressEdit}>
                        <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>Địa chỉ</Text>
                        {/* <TouchableOpacity><Text style={{fontSize:18,color:'#FA4319',fontWeight:'bold'}}>Edit</Text></TouchableOpacity> */}
                    </View>
                    <Text style={{fontSize:18,color:'black'}}>{order.address}</Text>
                </View>
                <View style={styles.address}>
                    <View style={styles.addressEdit}>
                        <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>Số điện thoại</Text>
                        {/* <TouchableOpacity><Text style={{fontSize:18,color:'#FA4319',fontWeight:'bold'}}>Edit</Text></TouchableOpacity> */}
                    </View>
                    <Text style={{fontSize:18,color:'black'}}>{order.phone}</Text>
                </View>
                <View style={styles.address}>
                    <View style={styles.addressEdit}>
                        <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>Thanh toán</Text>
                        {/* <TouchableOpacity><Text style={{fontSize:18,color:'#FA4319',fontWeight:'bold'}}>Edit</Text></TouchableOpacity> */}
                    </View>
                    <Text style={{fontSize:18,color:'black'}}>{payment.type}</Text>
                    <Text style={{fontSize:18,color:'black'}}>{payment.bank}</Text>
                </View>

                <View style={styles.address}>
                    <View style={styles.addressEdit}>
                        <Text style={{fontSize:18,fontWeight:'bold',color:'black'}}>Đơn hàng</Text>
                    </View>
                    <FlatList
                        scrollEnabled={false}
                        data={order.listOrderDetail}
                        renderItem={({ item }: any) =>
                            <View style={styles.addressEdit}>
                                <Text style={{fontSize:18,color:'black'}}>{item.name} x {item.quantity}</Text>
                               <Text style={{fontSize:18,color:'black'}}>{item.price} đ</Text>
                            </View>
                        }
                    />    
                    <View style={{width:'100%', height:2,backgroundColor:'#F5EDED'}}></View>
                    <View style={styles.addressTotal}>
                        <Text style={{fontSize:18,color:'black'}}>Tổng tiền</Text>
                        <Text style={{fontSize:18,color:'black'}}>{totalPrice} đ</Text>
                    </View>
                    
                </View>

                
                
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {postOrderAndPayment()}}>
                <Text style={styles.buttonText}>Đặt hàng</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 20,
        height: '100%',
        width: '100%'
    },
    titlePayment: {
        marginTop: 40,
        paddingBottom: 30
    },
    titlePaymentICon: {
        color: 'black',
        fontSize: 35,
        paddingTop: 5,
        justifyContent: 'center'
    },
    titlePaymentText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contact:{
        marginTop:20,
        
    },
    address:{
        borderWidth:1,
        borderColor:'#F5EDED',
        borderRadius:10,
        padding:10,
        marginBottom:10
    },
    addressEdit:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:5
    },
    button:{
        marginTop:20
    },
    buttonText:{
        color:'white',
        backgroundColor:'#FA4319',
        padding:10,
        textAlign:'center',
        justifyContent:'center',
        fontSize:20,
        fontWeight:'bold',
        borderRadius:15
    },
    addressTotal:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:10
    }
})

export default SummaryScreens;

function showToast(message: any) {
    throw new Error("Function not implemented.");
}
