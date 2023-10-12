import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StartLogin = ({navigation}:any) => {
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#FF4500'} barStyle={"light-content"}/>
            <View style={styles.butler}>
                <Text style={{color:'white',fontSize:50, fontWeight:'bold'}}>Butler</Text>
                <Text style={{color:'white',fontSize:20, fontWeight:'bold'}}>FOOD APP</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity 
                    style={styles.button_signup}
                    onPress={()=>{navigation.navigate('SignUp')}}
                ><Text style={styles.buttonSignupText}>Sign up</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button_google}>
                    <Image source={require('../../assets/images/anh_google.png')} style={{width:35,height:35}}/>
                    <Text style={{color:'black',fontSize:20,paddingLeft:10,textAlign:'center',justifyContent:'center'}}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button_facebook}>
                    <Image source={require('../../assets/images/anh_facebook.png')} style={{width:30,height:30}}/>
                    <Text style={{color:'black',fontSize:20,paddingLeft:10,textAlign:'center',justifyContent:'center'}}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signin}>
                <Text style={{color:'white',fontSize:20}}>Have an account?</Text>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}><Text style={{color:'white',fontSize:22,fontWeight:'bold'}}> Sign In</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FF4500',
        paddingHorizontal:30
    },
    butler:{
        width:'100%',
        height:'50%',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:'100%',
        height:'30%',
    },
    button_signup:{
        marginBottom:10
    },
    buttonSignupText:{
        color:'white',
        padding:10,
        backgroundColor:'gray',
        borderRadius:15,
        textAlign:'center',
        justifyContent:'center',
        fontSize:20
    },
    button_google:{
        flexDirection:'row',
        backgroundColor:'white',
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        padding:7
    },
    button_facebook:{
        flexDirection:'row',
        backgroundColor:'white',
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        padding:9
    },
    signin:{
        width:'100%',
        height:'20%',
        flexDirection:'row',
        justifyContent:'center'

    }
})

export default StartLogin;