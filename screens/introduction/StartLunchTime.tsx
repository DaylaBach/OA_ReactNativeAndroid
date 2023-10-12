import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StartLunchTime = ({navigation}:any) =>{
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#ffffff' translucent />
            <View style={styles.image}>
                <Image source={require('../../assets/images/lunchtime.png')} style={{width:'100%',height:'90%',marginTop:20}}/>
            </View>
            <View style={styles.item}>
                <Text style={styles.item_text_1}>Engaging Superb Thai Food Around</Text>
                <Text style={styles.item_text_2}>A great variety of Thai dishes are available.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('StartExpress')}}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:15
    },
    image:{
        width:'100%',
        height:'40%',
        opacity:1,
        justifyContent:'center',
        marginTop:20,
        paddingHorizontal:30
    },
    item:{
        width:'100%',
        height:'30%'
    },
    item_text_1:{
        color:'black',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:40,
        paddingHorizontal:15
    },
    item_text_2:{
        color:'gray',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        paddingHorizontal:15,
        paddingTop:10
    },
    button:{
        width:'100%',
        height:'30%',
        paddingHorizontal:15
    },
    buttonText:{
        padding:15,
        borderWidth:1,
        borderColor:'#FF4500',
        backgroundColor:'#FF4500',
        textAlign:'center',
        justifyContent:'center',
        marginTop:50,
        borderRadius:12,
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    }
})


export default StartLunchTime