import React from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentScreens = ({navigation}:any) => {
    return(
        <ScrollView>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"}/>
                <View style={styles.titlePayment}>
                    <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={30}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.titlePaymentText}>Payment</Text>
                    </View>
                </View>
                <View style={styles.deliveryMethod}>
                    <Text style={{color:'black',fontSize:20,fontWeight:'bold',paddingBottom:10}}>Delivery Method</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:18,color:'black'}}>36/6 Sukhumvit 101 Rd</Text>
                        <TouchableOpacity><Text style={{fontSize:18,color:'#FA4319',fontWeight:'bold'}}>Change</Text></TouchableOpacity>
                    </View>
                    <Text style={{fontSize:18,color:'black'}}>Bang Chak</Text>
                    <Text style={{fontSize:18,color:'black'}}>Phra Khanong, Bangkok</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:18,color:'black'}}>66 0-2333-0746</Text>
                        <TouchableOpacity><Text style={{fontSize:18,color:'#FA4319',fontWeight:'bold'}}>Change</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center'}}>
                    <View style={styles.credit}>
                        <Image source={require('../../assets/image/card_0.png')} style={styles.imgCredit}></Image>
                    </View>
                    <View style={styles.credit}>
                        <Image source={require('../../assets/image/card_2.png')} style={styles.imgCredit}></Image>
                    </View>
                    <View style={styles.credit}>
                        <Image source={require('../../assets/image/card_5.png')} style={styles.imgCredit}></Image>
                    </View>
                </View>
                <View style={styles.add}>
                    <View>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#17202A',paddingLeft:20}}>Add more items</Text>
                    </View>
                    <TouchableOpacity style={styles.addRight}>
                        <Icon name="add" size={40} color={"#FDFEFE"}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.master}>
                    <Text style={{fontSize:20,color:'#17202A',paddingTop:10}}>Mastercard</Text>
                    <View style={styles.visa}>
                        <Image source={require('../../assets/image/icon_card.png')} style={styles.imgVisa}></Image>
                        <Text style={{fontSize:15,color:'#17202A',marginLeft:30,marginRight:10}}>****</Text>
                        <Text style={{fontSize:15,color:'#17202A'}}>1234</Text>
                    </View>
                </View>
                <View style={styles.master}>
                    <Text style={{fontSize:20,color:'#17202A',paddingTop:10}}>Visa</Text>
                    <View style={styles.visa}>
                        <Image source={require('../../assets/image/icon_visa.png')} style={styles.imgVisa}></Image>
                        <Text style={{fontSize:15,color:'#17202A',marginLeft:30,marginRight:10}}>****</Text>
                        <Text style={{fontSize:15,color:'#17202A'}}>1234</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.app}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#FDFEFE'}}>Apply</Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        padding:20,
        height:'100%',
        width:'100%'
    },
    titlePayment:{
        marginTop:40,
        paddingBottom:30
    },
    titlePaymentText:{
        color:'black',
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    deliveryMethod:{
        marginTop:20,
        marginBottom:10
    },
    credit:{
        width:'30%',
        marginVertical:20,
        borderWidth:1,
        alignItems:'center',
        borderRadius:15,
        borderColor:'#F4F4F4',
        backgroundColor:'#F4F4F4'
    },
    imgCredit:{
        width:90,
        height:90
    },
    add:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#F4F4F4',
        borderWidth:1,
        borderRadius:15,
        borderColor:'#F4F4F4'
    },
    addRight:{
        height:50,
        width:50,
        marginLeft:5,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:15,
        backgroundColor:'#FA4319',
        borderColor:'#FA4319'
    },
    master:{
        marginTop:20,
        paddingLeft:20,
        borderWidth:2,
        borderRadius:15,
        borderColor:'#F4F4F4'
    },
    visa:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:15
    },
    imgVisa:{
        width:40,
        height:25
    },
    app:{
        width:'100%',
        height:50,
        marginVertical:20,
        paddingHorizontal:10,
        backgroundColor:'#FA4319',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default PaymentScreens;