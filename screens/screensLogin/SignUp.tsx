import React, { useContext, useState } from "react";
import { ScrollView, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../shared/ApiURL";
import Icon from 'react-native-vector-icons/Entypo';

const SignUp = ({ navigation }: any) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const { setUserInfo }: any = useContext(AuthContext);
    const [checkEmail, setCheckEmail] = useState(true);
    const [message, setMessage] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    const showToast = (message: any) => {
        Toast.show({
            type: 'error',
            text1: 'Message',
            text2: message
        });
    }

    const Register = () => {
        // setIsLoading(true);
        let formData = {
            userName: userName,
            email: email,
            phone: phone,
            address: address,
            birthday: birthday,
            password: password,
        }

        let regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (formData.email === '' || formData.phone === '' || formData.password === '') {
            setCheckEmail(false);
            showToast('Dữ liệu không hơp lệ');
        } else {
            if (!regexEmail.test(formData.email)) {
                setCheckEmail(false);
                setMessage('Email không đúng định dạng');
            } else {
                setCheckEmail(true);
                axios.post(API_URL + 'api/Account/signup-account', formData).
                    then((response) => {
                        // console.log('signin '+response.data)
                        if (response.data.code == 200) {
                            let userInfo = response.data.data;
                            setUserInfo(userInfo);
                            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                            navigation.navigate('SignIn');

                        } else {
                            showToast(response.data.message);
                        }
                    }
                    ).catch((err) => {
                        console.log(err);

                    }
                    )
            }
        }
    }


    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
            {/* <Spinner visible={isLoading} /> */}
            <View style={styles.title}>
                <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}>
                    <Icon name="chevron-small-left" style={styles.titleHeaderICon} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'black', paddingLeft: 110 }}>Đăng Ký</Text>
            </View>
            <View style={styles.formLogin}>
                <View style={styles.formLoginTitle}>
                    <Text style={{ paddingBottom: 2, fontSize: 16, color: 'black' }}>Tên người dùng</Text>
                    <TextInput placeholder="Tên người dùng" style={styles.formLoginTextInput} autoCapitalize="none" onChangeText={(value) => setUserName(value)} />
                </View>
                <View style={styles.formLoginTitle}>
                    <Text style={{ paddingBottom: 2, fontSize: 16, color: 'black' }}>Tài khoản email</Text>
                    <TextInput placeholder="Tài khoản email" style={styles.formLoginTextInput} autoCapitalize="none" onChangeText={(value) => setEmail(value)} />
                    {!checkEmail && <Text style={{ color: 'red' }}>{message}</Text>}
                </View>
                <View style={styles.formLoginTitle}>
                    <Text style={{ paddingBottom: 2, fontSize: 16, color: 'black' }}>Số điện thoại</Text>
                    <TextInput placeholder="Số điện thoại" style={styles.formLoginTextInput} autoCapitalize="none" onChangeText={(value) => setPhone(value)} />
                </View>
                <View style={styles.formLoginTitle}>
                    <Text style={{ paddingBottom: 2, fontSize: 16, color: 'black' }}>Địa chỉ</Text>
                    <TextInput placeholder="Địa chỉ" style={styles.formLoginTextInput} onChangeText={(value) => setAddress(value)} />
                </View>
                <View style={styles.formLoginTitle}>
                    <Text style={{ paddingBottom: 2, fontSize: 16, color: 'black' }}>Ngày sinh</Text>
                    <TextInput placeholder="Ngày sinh" style={styles.formLoginTextInput} onChangeText={(value) => setBirthday(value)} />
                </View>
                <View style={styles.formLoginTitle}>
                    <Text style={{ paddingBottom: 2, fontSize: 16, color: 'black' }}>Mật khẩu</Text>
                    <TextInput placeholder="Mật khẩu" style={styles.formLoginTextInput} onChangeText={(value) => setPassword(value)} />
                </View>
            </View>
            {/* <View style={styles.clickPolicy}>
                <Text style={{ fontSize: 15 }}>By continuing, I confirm that I have read and agree</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15 }}>to the </Text>
                    <TouchableOpacity><Text style={{ fontSize: 15, color: '#FF4500' }}>Terms and Conditions</Text></TouchableOpacity>
                    <Text style={{ fontSize: 15 }}> and </Text>
                    <TouchableOpacity><Text style={{ fontSize: 15, color: '#FF4500' }}>Privacy Policy.</Text></TouchableOpacity>
                </View>
            </View> */}
            <TouchableOpacity style={styles.buttonSingUp} onPress={() => { Register() }}>
                <Text style={styles.buttonSignUpText}>Đăng Ký</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    },
    title: {
        marginTop: 30,
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems:'center'

    }, titleHeaderICon: {
        color: 'black',
        fontSize: 35,
        paddingTop: 5,
        justifyContent: 'center'
    },
    formLogin: {
        width: '100%',
        marginBottom: 5,
    },
    formLoginTitle: {
        paddingBottom: 6
    },
    formLoginTextInput: {
        borderColor: 'gray',
        padding: 8,
        borderWidth: 1,
        fontSize: 20,
        color: 'black',
        paddingLeft: 15,
        borderRadius: 10,
    }
    ,
    clickPolicy: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonSingUp: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop:30
    },
    buttonSignUpText: {
        backgroundColor: '#FF4500',
        padding: 9,
        textAlign: 'center',
        borderRadius: 10,
        color: 'white',
        fontSize: 19
    }
    ,
    or: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    continue: {
        width: '100%',
        marginBottom:30
    },
    continue_google: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 4,
        borderColor: 'gray',
        borderWidth: 1
    },
    continue_facebook: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1
    }
})

export default SignUp;