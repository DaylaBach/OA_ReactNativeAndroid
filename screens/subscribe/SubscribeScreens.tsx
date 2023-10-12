import React,{useState} from "react";
import { Switch,Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const SubscribeScreens = () =>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(
        <ScrollView>
            <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"}/>
            <View style={styles.container}>
                <View style={{marginBottom:20}}>
                    <Icon name="chevron-back" size={30}/>
                </View>
                <View style={styles.sub}>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>Subscribe</Text>
                </View>
                <View style={styles.on}>
                    <Text style={{fontSize:20,color:'#17202A'}}>Weekly</Text>
                    <Switch
                        trackColor={{false: '#EDBB99', true: '#EDBB99'}}
                        thumbColor={isEnabled ? '#F68002' : '#F68002'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={{fontSize:20,color:'#17202A'}}>Monthly</Text>
                </View>
                <View style={styles.on}>
                    <Text style={{fontSize:20,color:'#D35400'}}>Save up to 59%</Text>
                    <Icon name="trending-up-outline" size={30} color={'#D35400'}/>
                </View>
                <View style={styles.price}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#D35400',textDecorationLine:'line-through'}}>150$</Text>
                    <Text style={{fontSize:30,fontWeight:'bold',color:'#17202A'}}>75$</Text>
                    <Text style={{fontSize:20,color:'#17202A'}}>Paid monthly</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.discount}>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#FDFEFE'}}>Claim Discount</Text>
                    </TouchableOpacity>
                </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FDFEFE',
        height:'100%',
        width:'100%',
        padding:20
    },
    sub:{
        alignItems:'center',
        marginBottom:50
    },
    on:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:25
    },
    price:{
        height:130,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:20
    },
    discount:{
        width:'50%',
        height:50,
        marginTop:30,
        borderWidth:1,
        borderRadius:20,
        backgroundColor:'#D35400',
        borderColor:'#D35400',
        alignItems:'center',
        justifyContent:'center',
    }
})
export default SubscribeScreens;