import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GetStarted = ({navigation}:any) =>{
    return(
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle='dark-content' backgroundColor='#ffffff' translucent />
            <View style={styles.image}>
                <Image source={require('../../assets/images/Started.png')} style={{width:'100%',height:'100%',marginTop:30}}/>
            </View>

            <View style={styles.item}>
                <Text style={styles.item_text_1}>Let's get you started</Text>
                <Text style={styles.item_text_2}>Schedule Order to never miss your meal in office time</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('StartLogin')}}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <View style={styles.clickLogin}>
                <Text style={{color:'gray',fontSize:20,fontWeight:'bold'}}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}><Text style={{color:'#FF4500',fontSize:20,fontWeight:'bold'}}>  Log in</Text></TouchableOpacity>
                
            </View>
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
        justifyContent:'center',
        marginTop:20,
        paddingHorizontal:30
    },
    item:{
        width:'100%',
        height:'25%',
        marginTop:20
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
        height:'15%',
        paddingHorizontal:15,
        paddingTop:15
    },
    buttonText:{
        padding:15,
        borderWidth:1,
        borderColor:'#FF4500',
        backgroundColor:'#FF4500',
        textAlign:'center',
        justifyContent:'center',
        borderRadius:12,
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    clickLogin:{
        width:'100%',
        height:'15%',
        flexDirection:'row',
        paddingHorizontal:15,
        justifyContent:'center'
    }
})


export default GetStarted