import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Product } from "../screens/cart/CartScreens";
import { Alert } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const CartItem = React.createContext<any>('');

const CartProvider = ({children}:any) => {
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [payment, setPayment] = useState({});
    const [totalPrice,setTotalPrice] = useState<number>();

    const getPayment = async () => {
        try {
            const value = await AsyncStorage.getItem("PaymentData") ;
            if(value !== null){
                setPayment(JSON.parse(value));
            }else{
                setPayment({})
            }
            return value;
        }
        catch (error) {
        // Error retrieving data
        }
    }

    const setPaymentStorage = async (pushPayment:any) => {
        AsyncStorage.setItem("PaymentData", JSON.stringify(pushPayment), (err)=> {
            if(err){
                console.log("an error");
                throw err;
            }
            console.log("Add success!");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
        getPayment();
    }

    const getOrder = async () => {
        try {
            const value = await AsyncStorage.getItem("OrderData") ;
            if(value !== null){
                setOrder(JSON.parse(value));
            }else{
                setOrder([])
            }
            return value;
        }
        catch (error) {
        // Error retrieving data
        }
    }

    const setOrderStorage = async (pushOrder:any) => {
        AsyncStorage.setItem("OrderData", JSON.stringify(pushOrder), (err)=> {
            if(err){
                console.log("an error");
                throw err;
            }
            console.log("Add success!");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
        getOrder();
    }

    const calcTotalPrice = async (cartItem:Array<Product>) => {
        let ttp:number = 0;
        console.log(totalPrice);
        
        console.log(JSON.stringify(cartItem));
        cartItem.forEach((pro:Product) => {
            console.log(pro.totalPrice);
            ttp += pro.totalPrice;
        })
        console.log(ttp);
        AsyncStorage.setItem("TotalCartPrice", JSON.stringify(ttp), (err)=> {
            if(err){
                console.log("an error");
                throw err;
            }
            console.log("Add success!");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
        getTotalPrice();
    }

    const getTotalPrice = async () => {
        try {
            const value = await AsyncStorage.getItem("TotalCartPrice") ;
            if(value !== null){
                setTotalPrice(JSON.parse(value));
            }else{
                setTotalPrice(0);
            }
            return value;
        }
        catch (error) {
        // Error retrieving data
        }
    }

    const getCart = async () => {
        try {
            const value = await AsyncStorage.getItem("CartItem") ;
            if(value !== null){
                setCart(JSON.parse(value));
            }else{
                setCart([])
            }
            return value;
        }
        catch (error) {
        // Error retrieving data
        }
    }

    const setCartStorageFromCart = async (pushCart:any) => {
        AsyncStorage.setItem("CartItem", JSON.stringify(pushCart), (err)=> {
            if(err){
                console.log("an error");
                throw err;
            }
            console.log("Add success!");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
        getCart();
        calcTotalPrice(cart);
    }

    const setCartStorageFromDetail = async (item:Product) => {
        let newItem = {...item, cartQuantity: 1, totalPrice: item.salePrice}
        if(cart.length == 0){
            const pushCart = [...cart, newItem];
            
            AsyncStorage.setItem("CartItem", JSON.stringify(pushCart), (err)=> {
                if(err){
                    console.log("an error");
                    throw err;
                }
                showToast("Đã thêm mới vào giỏ hàng!");
            }).catch((err)=> {
                console.log("error is: " + err);
            });
            calcTotalPrice(pushCart);
        } else {
            let check = false;
            let newPC = cart.map((proPC:Product) => {
                if(item.productId == proPC.productId){
                    check = true;
                    if((proPC.cartQuantity + 1) > item.quantity){
                        let totalPrice = (proPC.cartQuantity * proPC.salePrice);
                        Alert.alert("Chỉ còn " + proPC.quantity + " sản phẩm trong kho ");
                        return { ...item, cartQuantity: proPC.cartQuantity, totalPrice: totalPrice };
                    }else {
                        let totalPrice = ((proPC.cartQuantity + 1) * proPC.salePrice);
                        return { ...item, cartQuantity: (proPC.cartQuantity + 1), totalPrice: totalPrice };
                    }
                }
                return proPC;
            })
            if(check) {
                AsyncStorage.setItem("CartItem", JSON.stringify(newPC), (err)=> {
                    if(err){
                        console.log("an error");
                        throw err;
                    }
                }).catch((err)=> {
                    console.log("error is: " + err);
                });
                calcTotalPrice(newPC);
            }else{
                const pushCart = [...cart, newItem]
                AsyncStorage.setItem("CartItem", JSON.stringify(pushCart), (err)=> {
                    if(err){
                        console.log("an error");
                        throw err;
                    }
                    showToast("Đã thêm mới vào giỏ hàng!");
                }).catch((err)=> {
                    console.log("error is: " + err);
                });
                
                calcTotalPrice(pushCart);
            }            
        }
        getCart();
    }

    const showToast = (message: any) => {
        Toast.show({
            type: 'success',
            text1: 'Message',
            text2: message
        });
    }
    
    useEffect(() => {
        getCart();
        getTotalPrice();
    },[])

    return(
        <CartItem.Provider value={{cart, setCartStorageFromCart, getCart, setCartStorageFromDetail, totalPrice, getTotalPrice, calcTotalPrice, order, getOrder, setOrderStorage, payment, getPayment, setPaymentStorage}}>
            {children}
        </CartItem.Provider>
    )

}
export const useCartContext = () => React.useContext(CartItem);
export default CartProvider;