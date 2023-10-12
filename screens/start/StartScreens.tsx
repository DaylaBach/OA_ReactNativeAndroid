import React from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";

const StartScreens = () => {
    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='transparent' translucent={true} />
            <ImageBackground source={require('../../assets/image/trang_dau.jpg')} style={styles.imageBackground}>
                <View style={styles.toText}>
                    <Text style={styles.textBut}>Buttlet</Text>
                    <Text style={styles.textFood}>Food app</Text>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%',
    },
    toText: {
        
        justifyContent:'center',
        top:'46%'
    },
    textBut:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        color:'red'
    },
    textFood:{
        textAlign:'center',
        fontSize:25,
        color:'#fff',
        fontWeight:'bold'
    }
})



export default StartScreens;