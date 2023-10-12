import React, { useContext, useState } from "react";
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Fontisto';
import CheckBox from '@react-native-community/checkbox';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../../shared/ApiURL";
import Toast from "react-native-toast-message";


const SignIn = ({ navigation }: any) => {
    const [isCheck, setIsCheck] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(true);
    const { isLoading, setUserInfo }: any = useContext(AuthContext);
    const [message, setMessage] = useState('');    

    const showToast = (message: any) => {
        Toast.show({
            type: 'error',
            text1: 'Message',
            text2: message
        });
    }

    const onSubmit = async () => {
        let formData = {
            email: email,
            password: password,
            _isCheck: isCheck
        }
        let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (formData.email === '' || formData.password === '') {
            setCheckEmail(false);
            showToast('Dữ liệu không hơp lệ');
            // Alert.alert('Dữ liệu không hơp lệ')
        } else {
            if (!regexEmail.test(formData.email)) {
                setCheckEmail(false);
                setMessage('email không đúng định dạng');
            } else {
                setCheckEmail(true);
                axios.post(API_URL+'api/Account/login', formData).
                    then((response) => {
                        // console.log('signin '+ JSON.stringify(response.data))
                        if (response.data.code == 200) {

                            setUserInfo(formData);
                            AsyncStorage.setItem('userInfo', JSON.stringify(formData))
                            navigation.navigate('home');
                        } else {
                            showToast(response.data.message);
                            // Alert.alert(response.data.message)
                        }
                    }
                    ).catch((err) => console.log(err))
            }
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
            <View style={styles.headerText}>
                <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Đăng nhập</Text>
            </View>
            <View style={styles.formLogin}>
                <View style={{ marginBottom: 10 }}>
                    <Icon name="email" style={styles.iconLogin} />
                    <TextInput style={styles.formLoginInputNumber} placeholder="Địa chỉ Email" onChangeText={(value) => setEmail(value)} placeholderTextColor={'black'} />
                    {!checkEmail && <Text style={{ color: 'red' }}>{message}</Text>}
                </View>
                <View>
                    <Icon name="locked" style={styles.iconLogin} />
                    <TextInput style={styles.formLoginInputPassword} placeholder="Mật khẩu" secureTextEntry={true} onChangeText={(value) => setPassword(value)} placeholderTextColor={'black'} />
                </View>
            </View>
            <View style={styles.checked}>
                <TouchableOpacity onPress={() => { navigation.navigate('ForgetPassword') }}><Text style={{ fontSize: 20, color: 'black' }}>Quên mật khẩu?</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} /* onPress={() => {login(email,password)}}*/ onPress={() => onSubmit()}><Text style={styles.buttonText}>Đăng nhập</Text></TouchableOpacity>
            <View style={styles.chuyenTrang}>
                <Text style={{ fontSize: 20, color: 'black' }}>Chưa có tài khoản?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}><Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}> Đăng ký</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        paddingHorizontal: 30
    },
    headerText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 20
    },
    formLogin: {
        marginTop: 20
    },
    iconLogin: {
        fontSize: 25,
        position: 'absolute',
        zIndex: 1000,
        top: 12,
        paddingLeft: 10,
        color: '#FA4319'
    }
    ,
    formLoginInputNumber: {
        borderWidth: 1,
        borderColor: '#FA4319',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 50,
        borderRadius: 10
    },
    formLoginInputPassword: {
        borderWidth: 1,
        borderColor: '#FA4319',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 50,
        borderRadius: 10
    },
    checked: {
        marginTop: 20,
        alignItems: 'flex-end'
    },
    button: {
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FA4319',
        fontSize: 20,
        fontWeight: 'bold'
    },
    chuyenTrang: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignIn