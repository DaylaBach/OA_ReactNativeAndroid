import axios from "axios";
import React, { useState } from "react";
import { StatusBar, SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { API_URL } from "../../shared/ApiURL";

const CheckPassCode = ({navigation,route}:any) => {
    const [accountId,setAccountId] = useState('');
    const [passcode,setPasscode] = useState('');
    var message:any;

    const item  = route.params.data.data;
    // console.log(item);
    
    const onSubmit = async () => {
        let formData = {
            passcode:passcode    
        }
        
        axios
            .get(API_URL+'api/Account/check-pass-code'+`?accountId=${item}&&passcode=${formData.passcode}`)
            .then(function (response:any) {
                // handle success
                // console.log(response.data);
                if(response.data.code == 200){
                    navigation.navigate('ChangePassword',{data:response.data})
                    // console.log(response.data.code);
                    
                }else{
                    message =response.data.message;
                    // console.log(message);
                    
                }
            })
            .catch(function (error) {
                error.message
            })
    }
    
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
            <View style={styles.title}>
                <Text style={{ color: 'black', fontSize: 30, textAlign: 'center', justifyContent: 'center' }}>Nhập mã</Text>
            </View>
            
            <View style={styles.input}>
                <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Mã</Text>
                <TextInput placeholder="Passcode" style={styles.textInput} onChangeText={(value)=>setPasscode(value)} />
                <Text style={{color:'red'}}>{message}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>onSubmit()}>
                <Text style={styles.buttonText}>Gửi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 24,
        paddingHorizontal: 20
    },
    title: {
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    },
    textDescription: {
        width: '100%',
        marginTop: 20
    },
    input: {
        width: '100%',
        marginTop: 20,

    },
    textInput: {
        borderWidth: 1,
        borderColor: '#FF4500',
        color: 'black',
        paddingLeft: 10,
        fontSize: 20,
        borderRadius: 10,
        textAlign:'center'
    },
    button: {
        marginTop: 30
    },
    buttonText: {
        padding: 15,
        backgroundColor: '#FF4500',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }

})


export default CheckPassCode;