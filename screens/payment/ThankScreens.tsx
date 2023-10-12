import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, StatusBar, View, Image, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';


const ThankScreens = ({navigation}:any) => {
    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#FF4316'} barStyle={"light-content"} />
            <View style={styles.partTop}>
                <TouchableOpacity style={{marginBottom:20}} onPress={() => navigation.navigate('home')}>
                    <Icon name="chevron-left" size={30}/>
                </TouchableOpacity>
                <View style={styles.image}>
                    <Image source={require('../../assets/image/check.jpg')} style={styles.imageImage} />
                </View>
                <View style={styles.partTopText}>
                    <Text style={{ fontSize: 24, justifyContent: 'center', textAlign: 'center', color: 'white', paddingBottom: 10, fontWeight: 'bold' }}>Xin cảm ơn</Text>
                    <Text style={{ fontSize: 18, justifyContent: 'center', textAlign: 'center', color: 'white' }}>Bạn đã đặt hàng thành công!</Text>
                </View>
            </View>

            <View style={styles.partBottom}>

                {/* <Text style={styles.partBottomText}>How would you rate the quality of this meat and delivery?</Text>

                <View style={styles.icon}>
                    <TouchableOpacity>
                        <Icon name="frown" style={styles.partBottomICon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="frown-open" style={styles.partBottomICon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="meh" style={styles.partBottomICon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="smile" style={styles.partBottomICon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="smile-beam" style={styles.partBottomICon} />
                    </TouchableOpacity>

                </View>
                <TextInput placeholder="Add a comment" style={styles.textInput} /> */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Trở về trang chủ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FDFEFE',
        width: '100%',
        height:'100%',
    },
    titlePaymentICon: {
        color: 'white',
        fontSize: 35,
        paddingTop: 25,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    partTop: {
        width: '100%',
        backgroundColor: '#FF4316',
        marginTop:20,
        padding:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    partTopText: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 60,
        paddingTop: 30
    },
    partBottom: {
        width: '100%',
        paddingHorizontal: 30,
        marginTop:30
    },
    partBottomICon: {
        color: '#F5EDED',
        fontSize: 40,
        backgroundColor: '#999999',
        borderRadius: 40,
        padding: 2
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#F5EDED',
        backgroundColor: '#F5EDED',
        paddingBottom: 30,
        borderRadius: 15,
        paddingLeft: 10
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    partBottomText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingTop: 10,
        paddingBottom: 20,
        textAlign: 'center'
    },
    button: {
        marginTop: 30
    },
    buttonText: {
        padding: 10,
        backgroundColor: '#FF4316',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 15
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        paddingTop: 30
    },
    imageImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
})

export default ThankScreens;