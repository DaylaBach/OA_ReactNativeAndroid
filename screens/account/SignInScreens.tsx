import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Fontisto';
import CheckBox from '@react-native-community/checkbox';
import { Alert } from "react-native";

const SignInScreens = () => {
    const [isCheck, setIsCheck] = useState(false);
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"}/>
            <View style={styles.headerText}>
                <Text style={{color:'black', fontSize:30,fontWeight:'bold'}}>Sign In</Text>
            </View>
            <View style={styles.formLogin}>
                <View style={{marginBottom:10}}>
                    <Icon name="email" style={styles.iconLogin}/>
                    <TextInput style={styles.formLoginInputNumber} placeholder="Email Address" />
                </View>
                <View>
                    <Icon name="locked" style={styles.iconLogin}/>
                    <TextInput style={styles.formLoginInputPassword} placeholder="Password" secureTextEntry={true}/>
                </View>
            </View>
            <View style={styles.checked}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox
                    disabled={false}
                    value={isCheck}
                    onValueChange={() => setIsCheck(!isCheck)}
                    tintColors={{true:'#FF4500'}}
                    />
                    <Text style={{fontSize:20,color:'black'}}>Remember me</Text>
                </View>
                <TouchableOpacity><Text style={{fontSize:20,color:'black'}}>Forgot Password?</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Sign In</Text></TouchableOpacity>
            <View style={styles.chuyenTrang}>
                <Text style={{fontSize:20,color:'black'}}>Don't have an account?</Text>
                <TouchableOpacity><Text style={{fontSize:22,color:'black',fontWeight:'bold'}}> Sign Up</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        paddingHorizontal:30,
        width:'100%',
        height:'100%'
    },
    headerText:{
        width:'100%',
        height:'20%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    formLogin:{
        marginTop:20
    },
    iconLogin:{
        fontSize: 25,
        position:'absolute',
        zIndex:1000,
        top: 12
    }
    ,
    formLoginInputNumber:{
        backgroundColor:'white',
        borderBottomWidth:1,
        borderColor:'gray',
        color:'gray',
        fontSize:20,
        fontWeight:'bold',
        paddingLeft:40
    },
    formLoginInputPassword:{
        backgroundColor:'white',
        borderBottomWidth:1,
        borderColor:'gray',
        color:'gray',
        fontSize:20,
        fontWeight:'bold',
        paddingLeft: 40
    },
    checked:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
        alignItems:'center'
    },
    button:{
        marginTop:40
    },
    buttonText:{
        color:'white',
        padding:12,
        textAlign:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'#FA4319',
        fontSize:20,
        fontWeight:'bold'
    },
    chuyenTrang:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default SignInScreens;