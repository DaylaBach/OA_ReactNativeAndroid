import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const VerifyScreens = ({navigation}:any) =>{
    return(
        <ScrollView>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#ECF0F1'} barStyle={"dark-content"}/>
                <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={30}/>
                </TouchableOpacity>
                <View style={{alignItems:'center',marginVertical:30}}>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>Verify your account</Text>
                </View>
                <View style={{alignItems:'center',marginVertical:30}}>
                    <Text style={{fontSize:20,color:'#17202A'}}>We have sent 4 digit code</Text>
                    <Text style={{fontSize:20,color:'#17202A'}}>to your phone</Text>
                </View>
                <View style={styles.verify}>
                    <View style={styles.form}>
                        <TextInput keyboardType="numeric" style={{fontSize:25}}></TextInput>
                    </View>
                    <View style={styles.form}>
                        <TextInput keyboardType="numeric" style={{fontSize:25}}></TextInput>
                    </View>
                    <View style={styles.form}>
                        <TextInput keyboardType="numeric" style={{fontSize:25}}></TextInput>
                    </View>
                    <View style={styles.form}>
                        <TextInput keyboardType="numeric" style={{fontSize:25}}></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.app}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#FDFEFE'}}>Apply</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ECF0F1',
        height:'100%',
        width:'100%',
        padding:20,
        marginTop:40
    },
    verify:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    form:{
        width:'20%',
        height:60,
        marginHorizontal:10,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#ECF0F1',
        backgroundColor:'#fefefe',
        alignItems:'center',
        justifyContent:'center',
    },
    app:{
        width:'100%',
        height:50,
        paddingHorizontal:10,
        backgroundColor:'#FA4319',
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:50
    }
})
export default VerifyScreens;