import React from "react";
import {TextInput, SafeAreaView, Text, TouchableOpacity, StatusBar, View, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const CancelSreens = ({navigation}:any) => {
    const [checked, setChecked] = React.useState('eight');
    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
                <View style={styles.titleCancel}>
                    <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={30}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.titleCancelText}>Cancel Order</Text>
                    </View>
                </View>
                <View style={{marginBottom:10}}>
                    <Text style={{color:'black',fontSize:20}}>Please select the reason for cancellation:</Text>
                </View>
                <View style={{ backgroundColor: 'gray', height: 1, width: '100%' }}></View>
                <View style={styles.selectChose}>
                    <View style={{ flexDirection: 'row', alignItems: 'center',paddingBottom:10}}>
                        <RadioButton
                            value="eight"
                            status={checked === 'eight' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('eight')}
                            color="#FA4319"
                        />
                        <Text style={{color:'black',fontSize:20}}>Waiting for long time</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                        <RadioButton
                            value="nine"
                            status={checked === 'nine' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('nine')}
                            color="#FA4319"
                        />
                        <Text style={{color:'black',fontSize:20}}>Unable to contact with driver</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                        <RadioButton
                            value="one"
                            status={checked === 'one' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('one')}
                            color="#FA4319"
                        />
                        <Text style={{color:'black',fontSize:20}}>Wrong address shown</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                        <RadioButton
                            value="two"
                            status={checked === 'two' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('two')}
                            color="#FA4319"
                        />
                        <Text style={{color:'black',fontSize:20}}>The price is not easonable</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                        <RadioButton
                            value="three"
                            status={checked === 'three' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('three')}
                            color="#FA4319"
                        />
                        <Text style={{color:'black',fontSize:20}}>I want to order something else</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' ,paddingBottom:10}}>
                        <RadioButton
                            value="fort"
                            status={checked === 'fort' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('fort')}
                            color="#FA4319"
                        />
                        <Text style={{color:'black',fontSize:20}}>I just want to cancel</Text>
                    </View>
                </View>
                <View style={styles.descriptionHere}>
                    <Text style={{color:'black',fontSize:20,fontWeight:'bold',paddingBottom:5}}>Orther reason</Text>
                    <TextInput style={styles.formLoginInputNumber} placeholder="Email Address" />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Submit here</Text>
                </TouchableOpacity>
            </View>           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 20,
        height: '100%',
        width: '100%'
    },
    titleCancel: {
        marginTop: 40,
        paddingBottom: 30,
        marginBottom:10,
    },
    titleCancelICon: {
        color: 'black',
        fontSize: 35,
        paddingTop: 5,
        justifyContent: 'center'
    },
    titleCancelText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    selectChose:{
        marginTop:10
    },
    descriptionHere:{
        marginTop:10,
    },
    formLoginInputNumber:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#F5EDED',
        paddingBottom:60,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        paddingLeft:15
        
    },
    button:{
        marginTop:20
    },
    buttonText:{
        backgroundColor:'#FA4319',
        padding:15,
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        borderRadius:15,
        textAlign:'center'
    }
})

export default CancelSreens;