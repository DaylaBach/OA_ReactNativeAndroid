import React,{useState} from "react";
import {TextInput, SafeAreaView, Text, TouchableOpacity, StatusBar, View, StyleSheet } from "react-native";
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import axios from "axios";
import { API_URL } from "../../shared/ApiURL";

const CancelOrder = ({navigation, route}:any) => {
    const {item} = route.params;
    const [checked, setChecked] = useState('eight');
    const cancelReason = ["Tiền mặt", "Chuyển khoản"];
    const [otherReason,setOtherReason] = useState('');

 
    const postCancelOrder = () => {
        
        axios.post(API_URL+'api/Order/update-order-state?orderId='+`${item.orderId}`+'&state='+`${4}`+'&cancelationReason='+`${checked}`).
            then((response) => {
                if (response.data.code == 200) {
                   navigation.navigate('Order');  
                }
            }).catch((err) => console.log(err))
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
            <View style={styles.titleCancel}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Order')}}>
                    <Icon name="chevron-small-left" style={styles.titleCancelICon} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.titleCancelText}>Hủy Đơn Hàng</Text>
                </View>
            </View>
            <View style={{marginBottom:10}}>
                <Text style={{color:'black',fontSize:20}}>Xin hãy chọn lý do hủy đơn hàng:</Text>
            </View>
            <View style={{ backgroundColor: 'gray', height: 1, width: '100%' }}></View>
            <View style={styles.selectChose}>
                <View style={{ flexDirection: 'row', alignItems: 'center',paddingBottom:10}}>
                    <RadioButton
                        value="Đợi quá lâu"
                        status={checked === 'Đợi quá lâu' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Đợi quá lâu')}
                        color="#FA4319"
                    />
                    <Text style={{color:'black',fontSize:20}}>Đợi quá lâu</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                    <RadioButton
                        value="Không liên lạc được với người giao hàng"
                        status={checked === 'Không liên lạc được với người giao hàng' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Không liên lạc được với người giao hàng')}
                        color="#FA4319"
                    />
                    <Text style={{color:'black',fontSize:20}}>Không liên lạc được với người giao hàng</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                    <RadioButton
                        value="Sai địa chỉ"
                        status={checked === 'Sai địa chỉ' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Sai địa chỉ')}
                        color="#FA4319"
                    />
                    <Text style={{color:'black',fontSize:20}}>Sai địa chỉ</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                    <RadioButton
                        value="Giá cao quá"
                        status={checked === 'Giá cao quá' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Giá cao quá')}
                        color="#FA4319"
                    />
                    <Text style={{color:'black',fontSize:20}}>Giá cao quá</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                    <RadioButton
                        value="Tôi muốn đặt đồ khác"
                        status={checked === 'Tôi muốn đặt đồ khác' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Tôi muốn đặt đồ khác')}
                        color="#FA4319"
                    />
                    <Text style={{color:'black',fontSize:20}}>Tôi muốn đặt đồ khác</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                    <RadioButton
                        value="Tôi thích hủy"
                        status={checked === 'Tôi thích hủy' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Tôi thích hủy')}
                        color="#FA4319"
                    />
                    <Text style={{color:'black',fontSize:20}}>Tôi thích hủy</Text>
                </View>
            </View>
            {/* <View style={styles.descriptionHere}>
                <Text style={{color:'black',fontSize:20,fontWeight:'bold',paddingBottom:5}}>Lý do khác</Text>
                <TextInput style={styles.formLoginInputNumber} placeholder="nhập lý do..." onChangeText={(value)=>setOtherReason(value)}/>
            </View> */}
            <TouchableOpacity style={styles.button} onPress={()=>{postCancelOrder()}}>
                <Text style={styles.buttonText}>Xác nhận hủy</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        height: '100%',
        width: '100%'
    },
    titleCancel: {
        marginTop: 19,
        width: '100%',
        height: '10%',
        paddingBottom: 30,
        marginBottom:10
    },
    titleCancelICon: {
        color: 'black',
        fontSize: 35,
        paddingTop: 5,
        justifyContent: 'center'
    },
    titleCancelText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    selectChose:{
        marginTop:10
    },
    descriptionHere:{
        marginTop:10,
    },
    formLoginInputNumber:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#F5EDED',
        paddingBottom:60,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        paddingLeft:15
        
    },
    button:{
        marginTop:20
    },
    buttonText:{
        backgroundColor:'#FA4319',
        padding:15,
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        borderRadius:15,
        textAlign:'center'
    }
})

export default CancelOrder;