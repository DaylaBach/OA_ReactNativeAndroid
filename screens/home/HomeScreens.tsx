import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, SectionList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '../../shared/ApiURL';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const HomeScreens = ({ navigation }: any) => {
    const { Logout, userInfo }: any = useContext(AuthContext);
    const [newPro, setNewPro] = useState([]);
    const [proOBQ, setProOBQ] = useState([]);
    const [userName, setUserName] = useState('');
    let data:any;

    axios.get(API_URL + 'api/Account/get-account-by-email' + `?email=${userInfo.email}`)
    .then((res) => {
        data = res.data;
        // console.log(data);
        setUserName(data.data.userName);
    })
    .catch((e) => {
        console.log(`login error ${e}`);
    });
    useEffect(() => {

        fetch( API_URL +'api/Product/getnew-product-user?PageNumber=1&PageSize=4').
            then((respone) => respone.json())
            .then((data) => {
                setNewPro(data.data);
                
            }
            )
            .catch(err => console.log(err))
    }, [newPro])

    useEffect(() => {
        fetch( API_URL +'api/Product/get-product-user-orderby-quantity-desc?PageNumber=1&PageSize=4').
            then((respone) => respone.json())
            .then((data) => {
                setProOBQ(data.data);                
            }
            )
            .catch(err => console.log(err))
    }, [proOBQ])

    return (
        <ScrollView >
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#F6F7F9'} barStyle={"dark-content"} />
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Text style={{ fontSize: 20, paddingRight: 10, fontWeight: 'bold', color: '#17202A', marginTop:20 }}>Xin chào {userName}</Text>
                        <Icon name="hand-right" size={20} color="#F7DC6F" />
                    </View>
                    <View style={styles.headerMid}>
                        <Text style={{ fontSize: 30, width: '60%', fontWeight: 'bold', color: '#17202A' }}>Chúc bạn một ngày tốt lành</Text>
                        <TouchableOpacity>
                            <Image source={require('../../assets/image/avatar.jpg')} style={{ width: 70, height: 70, borderRadius: 50 }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.contentTop}>
                        <Text style={{ fontSize: 30, width: '60%', fontWeight: 'bold', color: '#17202A' }}>Sản phẩm mới</Text>
                    </View>
                    <ScrollView horizontal>
                        <FlatList
                            scrollEnabled={false}
                            data={newPro}
                            horizontal
                            renderItem={({ item }: any) =>
                                <TouchableOpacity style={styles.poppularItem} onPress={() => navigation.push('detail', { item })}>
                                    <Image source={{ uri: API_URL +'api/Product/get-product-image?image=' + item.image }} style={styles.imgItem}></Image>
                                    <Text style={{ fontSize: 25, paddingLeft: 10, fontWeight: 'bold', color: '#17202A' }}>{item.productName}</Text>
                                    <View style={{ paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#17202A' }}>{item.salePrice} đ</Text>
                                        <View style={styles.cart}>
                                            <Icon name="cart-outline" size={20} color={"#FDFEFE"} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                        }
                    />
                    </ScrollView>

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.contentTop}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#17202A' }}>Có thể bạn quan tâm</Text>
                            {/* <TouchableOpacity onPress={() => navigation.navigate('Product')}>
                                <Text style={{ fontSize: 20 }}>All</Text>
                            </TouchableOpacity> */}
                        </View>
                        <FlatList
                            scrollEnabled={false}
                            data={proOBQ}
                            renderItem={({ item }: any) =>
                                <TouchableOpacity style={styles.setItem} onPress={() => navigation.push('detail', { item })}>
                                    <Image source={{ uri: API_URL +'api/Product/get-product-image?image=' + item.image }} style={styles.imgSet}></Image>
                                    <View style={{ paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#17202A' }}>{item.productName}</Text>
                                            <Text style={{ fontSize: 15 }}>{item.description}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F7F9',
        height: '100%',
        width: '100%',
        padding: 20
    },
    header: {
        paddingBottom: 20
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerMid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20
    },
    headerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ABB2B9',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    content: {
        paddingBottom: 20
    },
    contentTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20
    },
    poppularItem: {
        width: 200,
        height: 300,
        backgroundColor: '#FDFEFE',
        borderWidth: 1,
        borderColor: '#FDFEFE',
        borderRadius: 20,
        marginRight: 20
    },
    imgItem: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cart: {
        width: 30,
        height: 30,
        marginRight: 10,
        paddingLeft: 3,
        backgroundColor: '#FA4319',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FA4319',
        borderRadius: 10
    },
    setItem: {
        width: '100%',
        height: 350,
        marginTop: 20,
        backgroundColor: '#FDFEFE',
        borderRadius: 20
    },
    imgSet: {
        width: '100%',
        height: '70%',
        borderRadius: 20
    },
    arrow: {
        width: 50,
        height: 50,
        marginRight: 10,
        paddingLeft: 10,
        backgroundColor: '#FA4319',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FA4319',
        borderRadius: 15
    }
})
export default HomeScreens;