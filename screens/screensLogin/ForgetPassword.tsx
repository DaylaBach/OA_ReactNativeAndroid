import axios from "axios";
import React, { useState } from "react";
import { Alert, StatusBar, SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';
import { API_URL } from "../../shared/ApiURL";


const ForgetPassword = ({ navigation }: any) => {
    const [checkEmail, setCheckEmail] = useState(true);

    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');
   
    const showToast = (message:any) => {
        Toast.show({
          type: 'success',
          text1: 'message',
          text2: message
        });
    }

    const onSubmit = async () => {
        let formData:any = {
            email: email
        }
        
        let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if (formData.email === '') {
            setCheckEmail(false);
            setMessage('email khong duoc de trong');
            
        }else if(!regexEmail.test(formData.email)){
            setCheckEmail(false);
            setMessage('email khogn dug dinh dang');
            
        }else{
            setCheckEmail(true);
        }


        axios
            .get(API_URL+'api/Account/get-access-code'+`?email=${formData.email}`)
            .then(function (response) {
                console.log('response data code '+response.data.code);

                if(response.data.code == 200){
                    navigation.navigate('CheckPassCode',{data:response.data}); 
                    
                }else{
                    Toast.show({
                        type: 'error',
                        text1: 'email ko chinh xac',
                        text2: 'This is some something 👋'
                      });
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
                <Text style={{ color: 'black', fontSize: 30, textAlign: 'center', justifyContent: 'center' }}>Quên mật khẩu</Text>
            </View>
            <View style={styles.textDescription}>
                <Text style={{ color: 'black', fontSize: 18, textAlign: 'center' }}>Vui lòng nhập Email để lấy lại mật khẩu</Text>
            </View>
            <View style={styles.input}>
                <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Địa chỉ Email</Text>
                <TextInput placeholder="Địa chỉ Email" style={styles.textInput} onChangeText={(value) => setEmail(value)} />
                <Text></Text>
                {!checkEmail && <Text style={{ color: 'red' }}>{message}</Text>}
            </View>
            <TouchableOpacity onPress={()=>onSubmit()} style={styles.button} >
                <Text style={styles.buttonText} >Gửi</Text>
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
        borderRadius: 10

    },
    button: {
        marginTop: 20
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


export default ForgetPassword;