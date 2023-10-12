import React from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpScreens = ({navigation}:any) => {
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"}/>
                <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={30}/>
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center',color:'black'}}>Sign Up</Text>
                </View>
                <View style={styles.formLogin}>
                    <View style={styles.formLoginTitle}>
                        <Text style={{paddingBottom:5,fontSize:16,fontWeight:'bold',color:'black'}}>Enter Name</Text>
                        <TextInput placeholder="Enter name" style={styles.formLoginTextInput}/>
                    </View>
                    <View style={styles.formLoginTitle}>
                        <Text style={{paddingBottom:5,fontSize:16,fontWeight:'bold',color:'black'}}>Enter Phone</Text>
                        <TextInput placeholder="Enter phone" style={styles.formLoginTextInput}/>
                    </View>
                    <View style={styles.formLoginTitle}>
                        <Text style={{paddingBottom:5,fontSize:16,fontWeight:'bold',color:'black'}}>Email Address</Text>
                        <TextInput placeholder="Email address" style={styles.formLoginTextInput}/>
                    </View>
                    <View style={styles.formLoginTitle}>
                        <Text style={{paddingBottom:5,fontSize:16,fontWeight:'bold',color:'black'}}>Password</Text>
                        <TextInput placeholder="Password" style={styles.formLoginTextInput}/>
                    </View>
                </View>
                <View style={styles.clickPolicy}>
                    <Text style={{fontSize:15}}>By continuing, I confirm that I have read and agree</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:15}}>to the </Text>
                        <TouchableOpacity><Text style={{fontSize:15,color:'#FF4500'}}>Terms and Conditions</Text></TouchableOpacity>
                        <Text style={{fontSize:15}}> and </Text>
                        <TouchableOpacity><Text style={{fontSize:15,color:'#FF4500'}}>Privacy Policy.</Text></TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonSingUp}>
                    <Text style={styles.buttonSignUpText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.or}>
                    <View style={{width:'45%',height:1,backgroundColor:'gray'}}></View>
                    <Text style={{color:'black',fontSize:15,textAlign:'center',justifyContent:'center'}}> OR </Text>
                    <View style={{width:'45%',height:1,backgroundColor:'gray'}}></View>
                </View>
                <View style={styles.continue}>
                    <TouchableOpacity style={styles.continue_google}>
                        <Image source={require('../../assets/image/anh_google.png')} style={{width:35,height:35}}/>
                        <Text style={{color:'black',fontSize:18,paddingLeft:10,textAlign:'center',justifyContent:'center'}}>Continue with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.continue_facebook}>
                        <Image source={require('../../assets/image/anh_facebook.png')} style={{width:30,height:30}}/>
                        <Text style={{color:'black',fontSize:18,paddingLeft:10,textAlign:'center',justifyContent:'center'}}>Continue with Facebook</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        paddingHorizontal:20,
        paddingVertical:50,
        height:'100%',
        width:'100%',
    },
    title:{
        marginTop:20,
        width:'100%',
        justifyContent:'center',
        marginBottom:5
    },
    formLogin:{
        width:'100%',
        marginBottom:20
    },
    formLoginTitle:{
        paddingBottom: 10
    },
    formLoginTextInput:{
        borderColor:'gray',
        padding: 8,
        borderBottomWidth:1,
        borderLeftWidth:1,
        fontSize:20,
        color:'black',
        paddingLeft:15
    }
    ,
    clickPolicy:{
        height:'10%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonSingUp:{
        width:'100%',
        justifyContent:'center',
        marginBottom:10
    },
    buttonSignUpText:{
        backgroundColor:'#FF4500',
        padding:9,
        textAlign:'center',
        borderRadius:15,
        color:'white',
        fontSize:19
    }
    ,
    or:{
        height:'3%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    },
    continue:{
        height:'18%',
        width:'100%'
    },
    continue_google:{
        flexDirection:'row',
        backgroundColor:'white',
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        padding:4,
        borderColor:'gray',
        borderWidth:1
    },
    continue_facebook:{
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        padding:5,
        borderColor:'gray',
        borderWidth:1
    }
})

export default SignUpScreens;