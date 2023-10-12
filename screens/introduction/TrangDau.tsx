import React,{useEffect} from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";

const TrangDau = ({navigation}:any) => {

    useEffect(() => {
        // Run the job every 5 seconds
        const jobInterval = setTimeout(runJob, 5000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(jobInterval);
    }, []);

    const runJob = () => {
        // Perform the desired job or task here
        navigation.navigate('SignIn');
        // You can also update the state or trigger other actions in your app
    };

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='transparent' translucent={true} />
            <ImageBackground source={require('../../assets/images/trang_dau.jpg')} style={styles.imageBackground}>
                <View style={styles.toText}>
                    <Text style={styles.textBut}>Buttlet</Text>
                    <Text style={styles.textFood}>Food app</Text>
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    toText: {

        justifyContent: 'center',
        top: '46%'
    },
    textBut: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red'
    },
    textFood: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold'
    }
})



export default TrangDau;