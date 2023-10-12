import React,{useContext, useEffect, useState} from "react";
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, TextInput, View, StatusBar, FlatList, Alert, ToastAndroid } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '../../shared/ApiURL';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCartContext } from "../../context/CartProvider";
import { Product } from "../cart/CartScreens";
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { AuthContext } from "../../context/AuthContext";

const DetailScreens = ({route,navigation}:any) =>{
    const {item} = route.params;
    const{cart, setCartStorageFromCart, getCart, setCartStorageFromDetail, totalPrice, calcTotalPrice}:any = useCartContext();
    const [comments, setComments] = useState([]);
    const [inputComment, setInputComment] = useState('');
    const [accountId, setAccountId] = useState('');
    const { Logout, userInfo }: any = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [birthday, setBirthday] = useState('');
    let data: any;
    useEffect(() => {
        getApiComments()
    }, [])

    axios.get(API_URL + 'api/Account/get-account-by-email' + `?email=${userInfo.email}`)
        .then((res) => {
            data = res.data;
            setAccountId(data.data.id);
            setUserName(data.data.userName);
            setBirthday(data.data.birthday);
        })
        .catch((e) => {
            console.log(`login error ${e}`);
    });

    const getApiComments = () => {
        return fetch(API_URL+'api/Comment/get-comment-by-productId?productId='+item.productId).
            then((respone) => respone.json())
            .then((data) => {
                setComments(data.data)
            })
            .catch(err => console.log(err))
    }
    const showToast = (message: any) => {
        Toast.show({
            type: 'error',
            text1: 'Message',
            text2: message
        });
    }

    const postComments = () => {
        let formData = {
            question: inputComment,
            productId: item.productId,
            AccountId: accountId
        }
        console.log(formData);
        axios.post(API_URL+'api/Comment/insert-comment', formData).
            then((response) => {
                console.log(response.data);
                if (response.data.code == 200) {
                    getApiComments();
                } else {
                    showToast(response.data.message);
                }
            }).catch((err) => console.log(err))
    }

    // AsyncStorage.removeItem("CartItem");
    
    return(
        <ScrollView>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"}/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Icon name="cart-outline" size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>{item.productName}</Text>
                </View>
                <View style={styles.main}>
                    <Image source={{uri:API_URL + 'api/Product/get-product-image?image='+item.image}} style={styles.imgSet}></Image>
                </View>
                <View>
                    {/* <Text style={{fontSize:20,fontWeight:'bold',color:'#17202A'}}>Quantity:{item.quantity}</Text> */}
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>Mô tả</Text>
                    <Text style={{fontSize:16,color:'#17202A'}}>{item.description}</Text>
                </View>
                <View style={styles.total}>
                    <Text style={{fontSize:25,color:'#17202A'}}>Giá thành</Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>{item.salePrice} đ</Text>
                </View>
                {/* <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',marginBottom:20}}>
                    <Text style={{fontSize:20,color:'#17202A'}}>Orders are acceepted:</Text>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#17202A'}}> MON - SAT</Text>
                </View> */}
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.order} onPress={() => setCartStorageFromDetail(item)}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#FDFEFE'}}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputComments}>
                    <View style={styles.inputCommentsLeft}>
                        <TextInput
                            placeholder="Bình luận ..."
                            placeholderTextColor={'black'}
                            style={{ fontSize: 20, justifyContent: 'center', paddingLeft: 10 }}
                            onChangeText={(value) => setInputComment(value)}
                        />
                    </View>
                    <TouchableOpacity style={{ padding: 5 }} onPress={() => postComments()}>
                        <Icon name="send-sharp" size={25} color={"#C0392B"} style={{ paddingRight: 10 }} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    scrollEnabled={false}
                    data={comments}
                    renderItem={({ item }: any) =>
                        <View style={styles.mainItem}>
                            <View style={styles.mainItemRight}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#17202A' }}>{item.account.userName}</Text>
                                <Text style={{ fontSize: 15, color: '#17202A' }}>{item.question}</Text>
                            </View>
                        </View>
                    }
                />
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
        padding:20
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20,
        marginTop:40
    },
    title:{
        alignItems:'center',
        marginBottom:20
    },
    main:{
        marginBottom:20,
        alignItems:'center'
    },
    imgSet:{
        width:'100%',
        height:200,
        borderRadius:20,
        marginBottom:20
    },
    mainItem:{
        width:'100%',
        height:150,
        marginTop:20,
        borderRadius:20,
        backgroundColor:'#ECF0F1',
        flexDirection:'row'
    },
    imgItem:{
        width:'33.33%',
        height:'100%',
        borderRadius:20
    },
    mainItemRight:{
        padding:15,
        width:'66.77%'
    },
    price:{
        paddingTop:15,
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        height:40,
        width:90,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:80,
        borderWidth:1,
        borderRadius:15,
        backgroundColor:'#A6ACAF'
    },
    total:{
        marginTop:30,
        marginBottom:20,
        alignItems:'center'
    },
    order:{
        width:'100%',
        height:50,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:'#FA4319',
        borderColor:'#FA4319',
    },
    star:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center'
    },
    inputComments: {
        flexDirection: 'row',
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputCommentsLeft: {
        flexDirection: 'row'
    }
})
export default DetailScreens;