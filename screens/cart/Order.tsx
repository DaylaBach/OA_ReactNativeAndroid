import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../shared/ApiURL";

const ChoXacNhan = 0;
const ChoLayHang = 1;
const DangGiao = 2;
const DaGiao = 3;
const DaHuy =4;

// const [listOrderShare, setListOrderShare] = useState([]);

// const getOrderForOrderStatus = (listOrder:any) => {
//     setListOrderShare(listOrder);
//     return listOrderShare;
// }

const getAccountId = () => {
    const [id, setId] = useState('');
    const { Logout, userInfo }: any = useContext(AuthContext);
    let data: any;
    
    axios.get(API_URL + 'api/Account/get-account-by-email' + `?email=${userInfo.email}`)
    .then((res) => {
        data = res.data;
        // console.log(data);
        setId(data.data.id);
    })
    .catch((e) => {
        console.log(`login error ${e}`);
    });

    return id;
}

const Order = () => {
    const { Logout, userInfo }: any = useContext(AuthContext);
    const [page, setPage] = useState(ChoXacNhan);
    const [listOrder, setListOrder] = useState([]);
    let id = getAccountId();

    let data: any;
    useEffect(() => {
        axios.get(API_URL + 'api/Order/getlist-state-order' + `?state=${page}&accountId=${id}`)
            .then((res) => {
                data = res.data;
                // console.log(data.data.orderId);
                setListOrder(data.data);
                // (data.data.avatar);
                
            })
            .catch((e) => {
                console.log(`login error ${e}`);
            });
    }, [listOrder]);


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <ChoXacNhan1 page={page} setPage={setPage} />
            </View>
            <ScrollView style={{ marginTop: 20, paddingHorizontal: 15 }}>
                {page === ChoXacNhan ? <MainChoXacNhan /> : null}
            </ScrollView>
            <ScrollView>
                {page === ChoLayHang ? <MainChoLayHang /> : null}
            </ScrollView>
            <ScrollView>
                {page === DangGiao ? <MainDangGiao /> : null}
            </ScrollView>
            <ScrollView>
                {page === DaGiao ? <MainDaGiao /> : null}
            </ScrollView>
            <ScrollView>
                {page === DaHuy ? <MainDaHuy /> : null}
            </ScrollView>
        </View>
    )
}


const ChoXacNhan1 = ({ page, setPage }: any) => {
    const navigation: any = useNavigation();
    return (
        <View style={styles.contaier}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Icon name="chevron-small-left" style={styles.titleHeaderIConLeft} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', paddingLeft: 100 }}>Mua hàng</Text>
                {/* <View style={styles.iconSC}>
                    <TouchableOpacity>
                        <Icons name="search-outline" style={styles.titleHeaderIConSear} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icons name="chatbubble-ellipses-outline" style={styles.titleHeaderIConChat} />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={styles.menu}>
                <ScrollView horizontal>
                    <TouchableOpacity style={styles.menuClick} onPress={() => { setPage(ChoXacNhan) }} disabled={page === ChoXacNhan ? true : false}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Chờ xác nhận</Text>
                        {page === ChoXacNhan ? <View style={{ height: 2, width: '100%', backgroundColor: '#FA4319', position: 'absolute', bottom: 0 }}></View> : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuClick} onPress={() => { setPage(ChoLayHang) }} disabled={page === ChoLayHang ? true : false}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Chờ lấy hàng</Text>
                        {page === ChoLayHang ? <View style={{ height: 2, width: '100%', backgroundColor: '#FA4319', position: 'absolute', bottom: 0 }}></View> : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuClick} onPress={() => { setPage(DangGiao) }} disabled={page === DangGiao ? true : false}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Đang giao</Text>
                        {page === DangGiao ? <View style={{ height: 2, width: '100%', backgroundColor: '#FA4319', position: 'absolute', bottom: 0 }}></View> : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuClick} onPress={() => { setPage(DaGiao) }} disabled={page === DaGiao ? true : false}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Đã giao</Text>
                        {page === DaGiao ? <View style={{ height: 2, width: '100%', backgroundColor: '#FA4319', position: 'absolute', bottom: 0 }}></View> : null}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuClick} onPress={() => { setPage(DaHuy) }} disabled={page === DaHuy ? true : false}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Đơn đã hủy</Text>
                        {page === DaHuy ? <View style={{ height: 2, width: '100%', backgroundColor: '#FA4319', position: 'absolute', bottom: 0 }}></View> : null}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const MainChoXacNhan = () => {
    const { Logout, userInfo }: any = useContext(AuthContext);
    const navigation: any = useNavigation();
    const [listState, setListState] = useState([]);
    let id = getAccountId();
    let data:any;
    // const [idOrder, setIdOrder] = useState('');    

    axios.get(API_URL + 'api/Order/getlist-state-order' + `?state=${0}&accountId=${id}`)
        .then((res) => {
            data = res.data;
            // console.log(res.data.data.orderId);
            // res.data.data.forEach((element: any) => {
            //     setIdOrder(element.orderId);
            // });
            setListState(data.data);
        })
        .catch((e) => {
            console.log(`login error ${e}`);
        });
    useEffect(() => {        
    }, [listState]); 

    return (

        <FlatList
            scrollEnabled={false}
            data={listState}
            renderItem={({ item }: any) =>
                <View style={{ marginBottom: 30, borderWidth: 1, borderColor: 'gray', padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Mã: </Text>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{item.orderId}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Trạng thái: </Text>
                        <Text style={{ fontSize: 20, color: '#FA4319', fontWeight: 'bold' }}>{item.state == 0 ? 'Cho xac nhan' : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tổng tiền: {item.totalPrice}</Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{ marginTop: 10, width: '60%' }} onPress={() => { navigation.push('DeliveryOrderHistory', { item }) }}>
                            <Text style={{ color: '#ffffff', backgroundColor: '#FA4319', fontSize: 23, justifyContent: 'center', textAlign: 'center', padding: 5, borderRadius: 10, width: '100%' }}>Chi tiết đơn hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 10, width: '39%',paddingLeft:5 }} onPress={()=>{navigation.navigate('CancelOrder',{item})}}>
                            <Text style={{ color: '#ffffff', backgroundColor: '#FA4319', fontSize: 23, justifyContent: 'center', textAlign: 'center', padding: 5, borderRadius: 10, width: '100%' }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
        />

    )
}

const MainChoLayHang = () => {
    const { Logout, userInfo }: any = useContext(AuthContext);
    const navigation: any = useNavigation();
    const [listState, setListState] = useState([]);
    let id = getAccountId();
    useEffect(()=>{
        axios.get(API_URL + 'api/Order/getlist-state-order' + `?state=${1}&accountId=${id}`)
        .then((res) => {
            // data = res.data;
            setListState(res.data.data);
            // console.log(res.data.data);
            console.log(listState);
        })
        .catch((e) => {
            console.log(`login error ${e}`);
        });
    },[]);

    return (

        <FlatList
        scrollEnabled={false}
            data={listState}
            renderItem={({ item }: any) =>
                <View style={{ marginBottom: 30, borderWidth: 1, borderColor: 'gray', padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Mã: </Text>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{item.orderId}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Trạng thái: </Text>
                        <Text style={{ fontSize: 20, color: '#FA4319', fontWeight: 'bold' }}>{item.state == 1 ? 'Vận Chuyển' : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tổng tiền: {item.totalPrice}</Text>
                    <TouchableOpacity style={{ marginTop: 10, width: '60%' }} onPress={() => { navigation.navigate('DeliveryOrderHistory',{item}) }}>
                    <Text style={{ color: '#ffffff', backgroundColor: '#FA4319', fontSize: 23, justifyContent: 'center', textAlign: 'center', padding: 5, borderRadius: 10, width: '100%' }}>Chi tiết đơn hàng</Text>
                    </TouchableOpacity>
                </View>}
        />
    )
}

const MainDangGiao = () => {
    const { Logout, userInfo }: any = useContext(AuthContext);
    const navigation: any = useNavigation();
    const [listState, setListState] = useState([]);
    let id = getAccountId();
    useEffect(()=>{
        axios.get(API_URL + 'api/Order/getlist-state-order' + `?state=${2}&accountId=${id}`)
        .then((res) => {
            // data = res.data;
            setListState(res.data.data);
            // console.log(res.data.data);
        })
        .catch((e) => {
            console.log(`login error ${e}`);
        });
    });
    return (

        <FlatList
        scrollEnabled={false}
            data={listState}
            renderItem={({ item }: any) =>
                <View style={{ marginBottom: 30, borderWidth: 1, borderColor: 'gray', padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Mã: </Text>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{item.orderId}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Trạng thái: </Text>
                        <Text style={{ fontSize: 20, color: '#FA4319', fontWeight: 'bold' }}>{item.state == 2 ? 'Đang giao hàng' : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tổng tiền: {item.totalPrice}</Text>
                    <TouchableOpacity style={{ marginTop: 10, width: '60%' }} onPress={() => { navigation.navigate('DeliveryOrderHistory',{item}) }}>
                    <Text style={{ color: '#ffffff', backgroundColor: '#FA4319', fontSize: 23, justifyContent: 'center', textAlign: 'center', padding: 5, borderRadius: 10, width: '100%' }}>Chi tiết đơn hàng</Text>
                    </TouchableOpacity>
                </View>}
        />

    )
}

const MainDaGiao = () => {
    const { Logout, userInfo }: any = useContext(AuthContext);
    const navigation: any = useNavigation();
    const [listState, setListState] = useState([]);
    let id = getAccountId();
    useEffect(()=>{
        axios.get(API_URL + 'api/Order/getlist-state-order' + `?state=${3}&accountId=${id}`)
        .then((res) => {
            // data = res.data;
            setListState(res.data.data);
            // console.log(res.data.data);
        })
        .catch((e) => {
            console.log(`login error ${e}`);
        });
    });
    return (

        <FlatList
            scrollEnabled={false}
            data={listState}
            renderItem={({ item }: any) =>
                <View style={{ marginBottom: 30, borderWidth: 1, borderColor: 'gray', padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Mã: </Text>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{item.orderId}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Trạng thái: </Text>
                        <Text style={{ fontSize: 20, color: '#FA4319', fontWeight: 'bold' }}>{item.state == 3 ? 'Giao hàng thành công' : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tổng tiền: {item.totalPrice}</Text>
                    <TouchableOpacity style={{ marginTop: 10, width: '60%' }} onPress={() => { navigation.navigate('DeliveryOrderHistory',{item}) }}>
                    <Text style={{ color: '#ffffff', backgroundColor: '#FA4319', fontSize: 23, justifyContent: 'center', textAlign: 'center', padding: 5, borderRadius: 10, width: '100%' }}>Chi tiết đơn hàng</Text>
                    </TouchableOpacity>
                </View>
            }
        />

    )
}
const MainDaHuy = () => {
    const { Logout, userInfo }: any = useContext(AuthContext);
    const navigation: any = useNavigation();
    const [listState, setListState] = useState([]);
    let id = getAccountId();
    useEffect(()=>{
        axios.get(API_URL + 'api/Order/getlist-state-order' + `?state=${4}&accountId=${id}`)
        .then((res) => {
            // data = res.data;
            setListState(res.data.data);
            // console.log(res.data.data);
        })
        .catch((e) => {
            console.log(`login error ${e}`);
        });
    });
    return (

        <FlatList
        scrollEnabled={false}
            data={listState}
            renderItem={({ item }: any) =>
                <View style={{ marginBottom: 30, borderWidth: 1, borderColor: 'gray', padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Mã: </Text>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', paddingLeft: 10 }}>{item.orderId}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Trạng thái: </Text>
                        <Text style={{ fontSize: 20, color: '#FA4319', fontWeight: 'bold' }}>{item.state == 4 ? 'Đơn hàng đã hủy' : ''}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Tổng tiền: {item.totalPrice}</Text>
                    <TouchableOpacity style={{ marginTop: 10, width: '60%' }} onPress={() => { navigation.navigate('DeliveryOrderHistory',{item}) }}>
                    <Text style={{ color: '#ffffff', backgroundColor: '#FA4319', fontSize: 23, justifyContent: 'center', textAlign: 'center', padding: 5, borderRadius: 10, width: '100%' }}>Chi tiết đơn hàng</Text>
                    </TouchableOpacity>
                </View>}
        />

    )
}


const styles = StyleSheet.create({
    contaier: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleHeaderIConLeft: {
        color: 'black',
        fontSize: 38,
        paddingTop: 5,
        justifyContent: 'center'
    },
    iconSC: {
        flexDirection: 'row'
    },
    titleHeaderIConSear: {
        color: '#FA4319',
        fontSize: 35,
        paddingTop: 5,
        justifyContent: 'center',
        paddingRight: 5
    },
    titleHeaderIConChat: {
        color: '#FA4319',
        fontSize: 30,
        paddingTop: 5,
        justifyContent: 'center'
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuClick: {
        padding: 10,
    }

})


export default Order;