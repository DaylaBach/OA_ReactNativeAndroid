import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { API_URL } from "../../shared/ApiURL";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useCartContext } from "../../context/CartProvider";
import { Product } from "../cart/CartScreens";
import SelectDropdown from "react-native-select-dropdown";

export interface OrderDetailPost {
    price:Number,
    quantity:Number,
    productId:string
}

const DeliverScreens = ({navigation}:any) =>{
    const {cart, setCartStorageFromCart, getCart, setCartStorageFromDetail, totalPrice, calcTotalPrice, setOrderStorage, setPaymentStorage}:any = useCartContext();
    const { Logout, userInfo }: any = useContext(AuthContext);
    const [checked, setChecked] = React.useState(0);
    const [acAddress, setAcAddress] = useState([]);
    const [newAddress, setNewAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [bank, setBank] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [pmt, setPmt] = useState('Tiền mặt');
    const paymentType = ["Tiền mặt", "Chuyển khoản"];
    const [inputBank, setInputBank] = useState(false);
    
    useEffect(() => {
        fetch(API_URL + 'api/Account/get-account-by-email' + `?email=${userInfo.email}`).then((respone) => respone.json())
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
        getApiAccountAddress();
    }, [id, checked, newAddress]);

    const getApiAccountAddress = () => {
        fetch(API_URL + `api/Address/get-address-by-accountId?accountId=${id}`).
            then((respone) => respone.json())
            .then((data) => {
                setAcAddress(data.data)
            }
            )
            .catch(err => console.log(err))
    }
   
    const getApiDeleteAddress = (addressId:any) => {
        // console.log(acAddress[0]);
        return fetch(API_URL + `api/Address/delete-address-account?addressId=${addressId}`).
            then((respone) => respone.json())
            .then((data) => {
                Toast.show({
                    text1: 'Message',
                    text2: data.message
                });
                showToast(data.message);
                getApiAccountAddress();
            }
            )
            .catch(err => console.log(err))
    }

    const showToast = (message: any) => {
        Toast.show({
            type: 'error',
            text1: 'Message',
            text2: message
        });}

    const postAccountAddress = () => {
        let formData = {
            address: newAddress,
            AccountId: id
        }
        if(formData.address == ""){
            showToast("Bạn chưa nhập gì")
        }else{

            axios.post(API_URL+'api/Address/insert-address-account', formData).
                then((response) => {
                    if (response.data.code == 200) {
                        setNewAddress('');
                        getApiAccountAddress();
                    } else {
                        showToast(response.data.message);
                    }
                }).catch((err) => console.log(err))
        }
    }

    const saveOrderAndPayment = () => {
        if(acAddress.length > 0){
            let ad:any = acAddress[checked];
            // let od:OrderDetailPost = {price : 0, quantity: 0, productId : ""}
            let listOD = cart.map((pro:Product) => {
                return {name: pro.productName, quantity: pro.cartQuantity, price: pro.salePrice, productId: pro.productId };
            });

            let formOrderData = {
                totalPrice: totalPrice,
                phone : phone,
                email : email,
                address : ad.address,
                state : 0,
                accountId : id,
                listOrderDetail : listOD
            }
            let formPaymentData = {
                type : pmt,
                amount : totalPrice,
                bank: pmt == "Chuyển khoản" ? bank + " - " + cardNumber : "",
                orderId : ''
            }
            let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(formOrderData.phone !== "" && formOrderData.address !== "" && formOrderData.email !== "") {
                if (!regexEmail.test(formOrderData.email)) {
                    showToast("Email không đúng định dạng!")
                }else {
                    if(pmt == "Chuyển khoản"){
                        if(bank !== "" && cardNumber !== ""){
                            setOrderStorage(formOrderData);
                            setPaymentStorage(formPaymentData);
                            navigation.navigate('summary');
                        }else{
                            showToast("Bạn chưa nhập thông tin ngân hàng")
                        }
                    }else{
                        setOrderStorage(formOrderData);
                        setPaymentStorage(formPaymentData);
                        navigation.navigate('summary');
                    }            
                }
            }else {
                showToast("Xin vui lòng nhập đầy đủ thông tin email - số đt - địa chỉ!")
            }
        }else{
            showToast("Bạn chưa chọn địa chỉ!")
        }
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"}/>
                <View>
                     <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={30}/>
                    </TouchableOpacity>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>Thông tin giao hàng</Text>
                    </View>
                    <ScrollView style={styles.containeraddress}>
                    <FlatList
                        scrollEnabled={false}
                        data={acAddress}
                        renderItem={({item, index}:any) =>
                            <View style={styles.mainItem}>
                            <View style={styles.mainItemMid}>
                                <Text style={{fontSize:15,color:'#17202A'}}>{item.address}</Text>
                            </View>
                            <View style={styles.mainItemRight}>
                                <View>
                                    <RadioButton
                                        value="0"
                                        status={ checked === index ? 'checked' : 'unchecked' }
                                        color="#FA4319"
                                        onPress ={() => { setChecked(index)}}
                                    />
                                </View>
                            </View>
                            <View style={styles.trash}>
                                <TouchableOpacity onPress={() => getApiDeleteAddress(item.addressId)}>
                                    <Icon name="trash-outline" size={20} color={"#FDFEFE"}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                    />
                    </ScrollView>
                    <View style={styles.add}>
                        <View>
                        <TextInput placeholder="New address" value={newAddress} onChangeText={(value) => setNewAddress(value)} placeholderTextColor={'black'} />
                        </View>
                        <TouchableOpacity style={styles.addRight} onPress={() => postAccountAddress()}>
                            <Icon name="add" size={30} color={"#FDFEFE"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.add}>
                        <View>
                        <TextInput placeholder="Your Email" onChangeText={(value) => setEmail(value)} placeholderTextColor={'black'} value={email} />
                        </View>
                    </View>
                    <View style={styles.add}>
                        <View>
                        <TextInput placeholder="Your Phone" keyboardType="numeric" onChangeText={(value) => setPhone(value)} placeholderTextColor={'black'} value={phone} />
                        </View>
                    </View>
                    <View style={styles.add}>
                        <SelectDropdown
                            defaultValue={paymentType[0]}
	                        data={paymentType}
	                        onSelect={(selectedItem, index) => {
                                if(selectedItem == "Chuyển khoản"){
                                    setPmt(selectedItem);
                                    setInputBank(true);
                                }else {
                                    setPmt(selectedItem);
                                    setInputBank(false);
                                }
	                        }}
	                        buttonTextAfterSelection={(selectedItem, index) => {
	                        	return selectedItem
	                        }}
	                        rowTextForSelection={(item, index) => {
	                        	return item
	                        }}
                        />
                    </View>
                    {inputBank ? (
                        <View style={styles.add}>
                        <View>
                            <TextInput  placeholder="Bank" onChangeText={(value) => setBank(value)} placeholderTextColor={'black'} value={bank} />
                            <TextInput  placeholder="Card Number" onChangeText={(value) => setCardNumber(value)} placeholderTextColor={'black'} value={cardNumber} />
                        </View>
                    </View>
                    ) : (
                        null
                    )} 


                    <TouchableOpacity style={styles.app} onPress={() => saveOrderAndPayment()}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#FDFEFE'}}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FDFEFE',
        height:'100%',
        width:'100%',
        padding:20,
        marginTop:15
    },
    containeraddress:{
        flex:1,
        backgroundColor:'#FDFEFE',
        height:215,
        width:'100%',
        paddingVertical:10
    },
    mainItem:{
        width:'100%',
        height:80,
        marginTop:20,
        borderRadius:20,
        backgroundColor:'#ECF0F1',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    imgItem:{
        width:'30%',
        height:'100%',
        borderRadius:20
    },
    mainItemMid:{
        padding:15,
        width:'60%',
    },
    mainItemRight:{
        width:'10%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    add:{
        marginVertical:10,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#ECF0F1',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#ECF0F1'
    },
    addRight:{
        height:40,
        width:40,
        marginLeft:5,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:15,
        backgroundColor:'#FA4319',
        borderColor:'#FA4319'
    },
    app:{
        width:'100%',
        height:50,
        paddingHorizontal:10,
        backgroundColor:'#FA4319',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 50
    },
    trash:{
        height:50,
        width:40,
        marginLeft:5,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:15,
        backgroundColor:'#FA4319',
        borderColor:'#FA4319'
    },
    dropdown:{
        width:200
    }
})
export default DeliverScreens;