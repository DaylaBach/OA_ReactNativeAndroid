import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import useLocalStorageState from "use-local-storage-state/src/useLocalStorageState";
import { API_URL } from "../../shared/ApiURL";
import { useCartContext } from "../../context/CartProvider";
import { Quantifier } from "./Quantifier";

export interface Product {
    productId:string,
    productName:string,
    quantity:number,
    salePrice:number,
    price:number,
    address:string,
    status:boolean,
    description:string,
    createdDate:Date,
    updatedDate:Date,
    image:string,
    categoryId:string,
    cartQuantity:number,
    totalPrice:number
}

const CartScreens = ({route,navigation}:any) =>{

    const{cart, setCartStorageFromCart, getCart, setCartStorageFromDetail, totalPrice, calcTotalPrice}:any = useCartContext();

    const checkCart = () => {
        if(cart.length > 0){
            navigation.push('address')
        }else{
            Alert.alert('Giỏ hàng trống!');
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
                        <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>Giỏ hàng</Text>
                    </View>
                    
                    <FlatList
                        scrollEnabled={false}
                        data={cart}
                        renderItem={({ item }: any) =>
                        <View style={styles.mainItem}>
                            <Image source={{uri:API_URL + 'api/Product/get-product-image?image='+item.image}} style={styles.imgItem}></Image>
                            <View style={styles.mainItemMid}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'#17202A'}}>{item.productName}</Text>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'#FA4319'}}>{item.salePrice} đ</Text>
                            </View>
                            <Quantifier pro={item}/>

                        </View>
                        }
                    />

                    <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate('Product')}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#17202A'}}>+ Mua thêm hàng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.check} onPress={() => checkCart()}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#FDFEFE'}}>Checkout</Text>
                        <Text style={{fontSize:25,fontWeight:'bold',color:'#FDFEFE'}}>{totalPrice} đ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        height:'100%',
        width:'100%',
        padding:20,
        marginTop:20
    },
    mainItem:{
        width:'100%',
        height:100,
        marginTop:20,
        borderRadius:20,
        backgroundColor:'#ECF0F1',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    imgItem:{
        width:'20%',
        height:'100%',
        borderRadius:20
    },
    mainItemMid:{
        padding:15,
        width:'40%',
    },
    mainItemRight:{
        width:'40%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    quantity:{
        height:40,
        width:90,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:15,
        backgroundColor:'#A6ACAF',
        borderColor:'#A6ACAF'
    },
    trash:{
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
    code:{
        marginVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    check:{
        width:'100%',
        height:50,
        paddingHorizontal:10,
        backgroundColor:'#FA4319',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})
export default CartScreens;