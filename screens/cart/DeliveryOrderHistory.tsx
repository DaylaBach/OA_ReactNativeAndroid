import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, ImageBackground, ScrollView, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { API_URL } from "../../shared/ApiURL";

const DeliveryOrderHistory = ({ navigation, route }: any) => {
    const { item } = route.params;
    const [product, setProduct] = useState('');

    const getOrderDetail = () => {
        return fetch(API_URL + 'api/OrderDetail/get-orderdetail-by-orderid?id=' + `${item.orderId}`).
            then((respone) => respone.json())
            .then((data) => {
                setProduct(data.data);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getOrderDetail();

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#f7f7f7'} barStyle={"dark-content"} />
                        <View style={styles.headerOrderHistory}>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                <Icon name="chevron-small-left" style={styles.titleHeaderICon} />
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', paddingLeft: 70 }}>Chi tiết đơn hàng</Text>
                        </View>
            <Text style={{fontSize:15,fontWeight:'bold',color:'black',marginTop:10,paddingHorizontal:20}}>Mã đơn: {item.orderId}</Text> 
            <FlatList
                data={product}
                renderItem={({ item }: any) =>
                    <View style={styles.header}>
                        <View style={{marginTop: 10,paddingHorizontal:20,paddingVertical:10}}>
                            {/* <Text style={{fontSize:16,fontWeight:'bold',color:'black',marginBottom:5}}>Mã đơn: {item.orderId}</Text> */}
                            <View style={{ flexDirection: 'row',marginBottom:10}}>
                                <View style={styles.imageBackGround}>
                                    <Image source={{ uri: API_URL + 'api/Product/get-product-image?image=' + item.product.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                                </View>
                                <View style={styles.menuOrder}>
                                    <View style={styles.menuOrderInLeft}>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{ color: '#FA4319', fontWeight: 'bold', fontSize: 25 }}>{item.product.productName}</Text>
                                            <Text style={{ color: 'gray', fontSize: 18 }}>Số lượng: {item.quantity}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ paddingLeft: 10, color: 'black', fontWeight: 'bold', fontSize: 18 }}>Price: {item.price}</Text>

                                </View>
                            </View>

                            {/* <View style={{marginVertical: 5}}>
                                <Text style={{ backgroundColor: 'gray', height: 1, width: '100%' }}></Text>
                            </View>
                            <View style={styles.total}>
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>ToTal</Text>
                                <Text style={{ color: '#ee8c73', fontSize: 18, fontWeight: 'bold' }}>{item.price}</Text>
                            </View> */}
                        </View>
                    </View>
                }
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    header: {
        marginTop: 10

    },
    headerOrderHistory: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginTop:30
    },
    titleHeaderICon: {
        color: 'black',
        fontSize: 35,
        paddingTop: 5,
        justifyContent: 'center'
    },
    imageBackGround: {

    },
    menuOrder: {

    },
    menuOrderIn: {
    },
    menuOrderInLeft: {

    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

export default DeliveryOrderHistory;