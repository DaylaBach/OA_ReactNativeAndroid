import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { API_URL } from "../../shared/ApiURL";

const ProductScreens = ({ navigation }: any) => {
    const [pro, setPro] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [cat, setCat] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectCat, setSelectCat] = useState('Select Category');
    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        fetch(API_URL + 'api/Product/getall-product')
            .then((response) => response.json())
            .then((data) => {
                setPro(data.data);
                setFilteredDataSource(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        fetch(API_URL +'api/Category/getall-category')
            .then((response) => response.json())
            .then((data) => {
                setCat(data.data);
                setFilteredDataSource(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text: any) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = pro.filter(function (item: any) {
                const itemData = item.productName ? item.productName.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                console.log(itemData.indexOf(textData))
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } 
        else{
              // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(pro);
            setSearch(text);
        }
    };
    const searchFilterCat = (text: any) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = pro.filter(function (item: any) {
                const itemData = item.category.categoryName ? item.category.categoryName.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                console.log(itemData.indexOf(textData))
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } 
        else{
              // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(cat);
            setSearch(text);
        }
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'#ffffff'} barStyle={"dark-content"} />
                <View>
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back" size={30} />
                    </TouchableOpacity>
                    <View style={styles.pop}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#17202A' }}>Product List</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.search}>
                            <Icon name="search-outline" size={20} />
                            <TextInput placeholder="Search" style={{ width: '80%' }} onChangeText={(text) => searchFilterFunction(text)} value={search}></TextInput>
                            {search == '' ? null : (
                                <TouchableOpacity onPress={() => searchFilterFunction('')}>
                                    <Icon name="close" size={30} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => { setVisible(true) }}>
                            <Icon name="filter" size={40} style={{ paddingLeft: 10, paddingBottom: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        scrollEnabled={false}
                        data={filteredDataSource}
                        renderItem={({ item }: any) =>
                            <TouchableOpacity style={styles.mainItem} onPress={() => navigation.push('detail', { item })}>
                                <Image source={{ uri: API_URL +'api/Product/get-product-image?image=' + item.image }} style={styles.imgItem}></Image>
                                <View style={styles.mainItemRight}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#17202A' }}>{item.productName}</Text>
                                    {/* <Text style={{ fontSize: 16, color: '#17202A' }}>{item.description}</Text> */}
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FA4319' }}>{item.salePrice} đ</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={() => {
                        setVisible(!visible);
                    }}>
                    <View style={styles.conModal}>
                        <View style={styles.modal}>
                            <TouchableOpacity style={styles.select} onPress={() => setIsClick(!isClick)}>
                                <Text style={{ fontSize: 18, color: '#000' }}>{selectCat}</Text>
                                {isClick ? (
                                    <Icon name="chevron-up" size={20} style={{ paddingRight: 10 }} />
                                ) : (
                                    <Icon name="chevron-down" size={20} style={{ paddingRight: 10 }} />
                                )}
                            </TouchableOpacity>
                            {isClick ? <View style={styles.dropDown}>
                                <FlatList
                                    data={cat}
                                    renderItem={({ item }: any) =>
                                        <TouchableOpacity style={styles.select}>
                                            <Text style={{ fontSize: 18, color: '#000' }} 
                                                onPress={() => {
                                                    setSelectCat(item.categoryName);
                                                    setSearch(item.categoryName);
                                                    setIsClick(false);
                                                    setVisible(false);
                                                    searchFilterCat(item.categoryName)
                                                }}
                                            >{item.categoryName}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View> : null}
                            <TouchableOpacity style={styles.sort}
                                onPress={() => {
                                    let list = pro.sort((a: any, b: any) => a.productName > b.productname ? 1 : -1,);
                                    setPro(list);
                                    setVisible(false);
                                }}>
                                <Text style={{ fontSize: 18, color: '#000' }}>Sort By Name</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.sort}
                                onPress={() => {
                                    let list = pro.sort((a: any, b: any) => a.salePrice - b.salePrice);
                                    setPro(list);
                                    setVisible(false);
                                }}>
                                <Text style={{ fontSize: 18, color: '#000' }}>Low To High Price</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.sort}
                                onPress={() => {
                                    let list = pro.sort((a: any, b: any) => b.salePrice - a.salePrice);
                                    setPro(list);
                                    setVisible(false);
                                }}>
                                <Text style={{ fontSize: 18, color: '#000' }}>High To Low Price</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() =>{
                                    setVisible(false)
                                }}>
                                <Icon name="close" size={30} style={styles.close} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFEFE',
        height: '100%',
        width: '100%',
        padding: 20,
        marginTop: 20
    },
    pop: {
        alignItems: 'center',
        marginBottom: 20,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ABB2B9',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20
    },
    mainItem: {
        width: '100%',
        height: 150,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#ECF0F1',
        flexDirection: 'row'
    },
    imgItem: {
        width: '33.33%',
        height: '100%',
        borderRadius: 20
    },
    mainItemRight: {
        padding: 15,
        width: '66.77%'
    },
    conModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0.5)',
    },
    modal: {
        width: '80%',
        height: 300,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    sort: {
        width: '100%',
        height: 50,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingLeft: 20
    },
    select: {
        width: '100%',
        height: 50,
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dropDown: {
        width: '90%',
        height: 100,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        elevation: 5,
        alignSelf: 'center'
    },
    close:{
        justifyContent:'center',
        alignSelf:'center',
        paddingTop:30,
        borderRadius:10,
        width:30,
        borderColor:'black'
    }
})
export default ProductScreens;