import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { useCartContext } from "../../context/CartProvider";
import { Product } from "./CartScreens";
import { Card } from "react-native-paper";
import React from "react";
import { Alert } from "react-native";

const CartItemQuantity = React.createContext<any>('');

export const Quantifier = ({pro}:any) =>{
    const{cart, setCartStorageFromCart, getCart, setCartStorageFromDetail, totalPrice, calcTotalPrice}:any = useCartContext();

    const removeFromCart = async (item : Product) => {
        try {
            // Filter out the item to be removed
            const updatedItems = cart.filter((p: Product) => p.productId !== item.productId);
            // Save the updated cart items to AsyncStorage
            AsyncStorage.setItem('CartItem', JSON.stringify(updatedItems));
            calcTotalPrice(updatedItems);
            getCart();
            console.log('Item removed from cart:', item);
        } catch (error) {
          console.log('Error removing item from cart:', error);
        }
    }

    const increaseQty = (p:Product) =>{
        let quantity = p.cartQuantity + 1;
        if(quantity > p.quantity){
            quantity = p.quantity;
            Alert.alert("Only " + p.quantity + " Products left ");
        }
        let updatedCart = cart.map((p: Product) => {
            if (p.productId === pro.productId) {
              let totalPrice = (quantity * pro.salePrice);
              return { ...pro, cartQuantity: quantity, totalPrice: totalPrice };
            }
            return p;
        });
        setCartStorageFromCart(updatedCart);
        calcTotalPrice(updatedCart);
        getCart();
    };
    const decreaseQty = (p:Product) => {
        let quantity = p.cartQuantity - 1;
        if(quantity < 1){
            removeFromCart(p);
        }
        else{
            let updatedCart = cart.map((p: Product) => {
                if (p.productId === pro.productId) {
                  let totalPrice = (quantity * pro.salePrice);
                  return { ...pro, cartQuantity: quantity, totalPrice: totalPrice };
                }
                return p;
            });
            setCartStorageFromCart(updatedCart);
            calcTotalPrice(updatedCart);
            getCart();
        }
    }

    return(
        <View style={styles.mainItemRight}>
            <View style={styles.quantity}>  
                <TouchableOpacity onPress={() => decreaseQty(pro)}>
                    <Icon name="remove" size={20} color={"#FDFEFE"}/>
                </TouchableOpacity>
                <TextInput style={{color:'#FDFEFE'}} keyboardType="numeric" value={pro.cartQuantity.toString()}></TextInput>
                <TouchableOpacity onPress={() => increaseQty(pro)}>
                    <Icon name="add" size={20} color={"#FDFEFE"}/>
                </TouchableOpacity>
            </View>
            <View style={styles.trash}>
                <TouchableOpacity onPress={() => removeFromCart(pro)}>
                    <Icon name="trash-outline" size={20} color={"#FDFEFE"}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
})