import React from "react";
import { StatusBar, SafeAreaView, Text, View,TextInput,TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotScreens = ({navigation}:any) => {
    return(
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
            <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={30}/>
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={{color:'black',fontSize:30,textAlign:'center',justifyContent:'center'}}>Quên mật khẩu</Text>
            </View>
            <View style={styles.textDescription}>
                <Text style={{color:'black', fontSize:20,textAlign:'center'}}>Please, enter your email address. You will receive a link to create a new password via email.</Text>
            </View>
            <View style={styles.input}>
                <Text style={{color:'#FA4319',fontSize:16,fontWeight:'bold',marginBottom:5}}>Email Address</Text>
                <TextInput placeholder="Email Address" style={styles.textInput}/>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        height:'100%',
        width:'100%',
        padding:20,
        marginTop:40
    },
    title:{
        marginTop:50,
        justifyContent:'center',
    },
    textDescription:{
        justifyContent:'center',
        marginHorizontal:20,
        marginVertical:50
    },
    input:{
        marginTop:40,

    },
    textInput:{
        borderWidth:1,
        borderColor:'#FA4319',
        color:'black',
        paddingLeft:10,
        fontSize:20
    
    },
    button:{
       marginTop:30
    },
    buttonText:{
        padding:15,
        backgroundColor:'#FA4319',
        textAlign:'center',
        justifyContent:'center',
        borderRadius:15,
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    }

})


export default ForgotScreens;