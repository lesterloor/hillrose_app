import React, { Fragment, Component } from 'react';
import { View, BackHandler, Modal, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image, ImageStore } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from "react-router-native";
import Home from "../screens/Home"
import Test from "../App2"
import Residences from "../screens/Residences"
import { Overlay } from 'react-native-elements';
import Colors from "./Colors"
// import { images } from "./Images"
var TVEventHandler = require('TVEventHandler');
// console.log("images", images.unit506.uri)

export class Routing extends Component {
    _tvEventHandler: any;
    constructor() {
        super()
        this.state = {
            showMenu: false,
            showAvailabilityMenu: false,
            isMenuOpened: false,
            currentPage: "/",
            currentUnit: 506,
            playSlideshow: false,
            images: {
                '506': require('../assets/images/unit_preview/506.png'),
                '705': require('../assets/images/unit_preview/705.png'),
                '706': require('../assets/images/unit_preview/706.png'),
                '806': require('../assets/images/unit_preview/806.png'),

            }
        }
    }
    _enableTVEventHandler() {
        this._tvEventHandler = new TVEventHandler();
        this._tvEventHandler.enable(this, (cmp, evt) => {
            // console.log("evt", evt)
            if (evt.eventType === 'longSelect') {
                console.log("opening")
                this.setState({ showMenu: true })
            } else if (evt.eventType === 'playPause') {
                console.log("opening")
                this.setState(prevState => ({ playSlideshow: !prevState.playSlideshow }))
            }
        });
    }

    _disableTVEventHandler() {

        if (this._tvEventHandler) {
            this._tvEventHandler.disable();
            delete this._tvEventHandler;
        }
    }

    componentDidMount() {
        this._enableTVEventHandler();
        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log.log("backhandle")
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this._disableTVEventHandler();

    }
    handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        return true;
    }
    selectedUnit = (item) => {
        const { currentUnit } = this.state
       
            this.setState({
                currentUnit: item.unit,
            })


        // this.setState({
        //     unit: item,
        // })
    }
    render() {
        const { showMenu, images, playSlideshow, showAvailabilityMenu, currentUnit, currentRoute } = this.state
        const items = [
            {
                title: 'Home',
                link: '/',
            },
            {
                title: 'Residences',
                link: '/residences',
            },
            {
                title: 'Availability',
                link: '/availability',
            },]
        const units = [
            
            {
                unit: '506',
                bed: "1",
                bath: "2",
                sqft: 600,
                exposure: "SE",
                price: "890,000",
                cc: "890",
                ret: "890",
                link: 'https://facebook.github.io/react-native/docs/tutorial',
                description: 'Explains a Hello World for React Native.',
                image: '../assets/images/unit_preview/506.png',
            },
            {
                unit: '705',
                bed: "1",
                bath: "2",
                sqft: 600,
                exposure: "SE",
                price: "890,000",
                cc: "890",
                ret: "890",
                link: 'https://facebook.github.io/react-native/docs/tutorial',
                description: 'Explains a Hello World for React Native.',
                image: '../assets/images/unit_preview/705.png',
            },
            {
                unit: '706',
                bed: "1",
                bath: "2",
                sqft: 600,
                exposure: "SE",
                price: "890,000",
                cc: "890",
                ret: "890",
                link: 'https://facebook.github.io/react-native/docs/tutorial',
                description: 'Explains a Hello World for React Native.',
                image: '../assets/images/unit_preview/706.png',
            },
            {
                unit: '806',
                bed: "1",
                bath: "2",
                sqft: 600,
                exposure: "SE",
                price: "890,000",
                cc: "890",
                ret: "890",
                link: 'https://facebook.github.io/react-native/docs/tutorial',
                description: 'Explains a Hello World for React Native.',
                image: '../assets/images/unit_preview/806.png',
            },
           
            
        ];

        const LinkList = () => (
            <View style={styles.menuContainer} >
                {items.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            onPress={() => items[index].title === "Availability" ?
                                this.setState({ showAvailabilityMenu: true }) :
                                this.setState({ currentRoute: items[index].link, showMenu: false })}
                            underlayColor="#cc3c3c36"
                            activeOpacity={1}
                            style={styles.linkStyle}
                            to={items[index].title === "Availability" ? currentRoute : items[index].link} >
                            <TouchableOpacity
                                activeOpacity={1}
                                key={index}
                                accessibilityRole={'button'}
                                style={styles.linkContainer}>
                                <Text
                                    activeOpacity={1}
                                    style={styles.menuLink}>{items[index].title}
                                </Text>
                            </TouchableOpacity>
                        </Link>

                    );
                })}
            </View>
        );

        const DATA = [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'First Item',
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Second Item',
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Third Item',
            },
        ];
        const Item = ({ unit }) => {
            return (

                <View key={unit.unit} style={styles.listItemContainer}>
                    <Text style={styles.unit}>{unit.unit}</Text>
                    <Text style={styles.bed}>{unit.bed}</Text>
                    <Text style={styles.bed}>{unit.bath}</Text>
                    <Text style={styles.unit}>{unit.sqft}</Text>
                    <Text style={styles.price}>{unit.exposure}</Text>
                    <Text style={styles.price}>${unit.price}</Text>
                    <Text style={styles.unit}>${unit.cc}</Text>
                    <Text style={styles.unit}>${unit.ret}</Text>
                </View>

            )
        }
        console.log("this.state?", this.state)
        return (
            <View>
                <NativeRouter >
                    <View >
                        <View>
                            <View>
                                <Modal
                                    onShow={() => console.log("show menu")}
                                    animationType="fade"
                                    transparent={true}
                                    visible={showMenu}
                                    onRequestClose={() => this.setState({ showMenu: false, showAvailabilityMenu: false })}
                                    onDismiss={() => this.setState({ showMenu: false, showAvailabilityMenu: false })}
                                >
                                    <LinkList />
                                    <View>

                                        <Modal
                                            onShow={() => console.log("show available")}
                                            animationType="fade"
                                            transparent={true}
                                            visible={showAvailabilityMenu}
                                            onRequestClose={() => this.setState({ showAvailabilityMenu: false })}
                                            onDismiss={() => this.setState({ showAvailabilityMenu: false })}
                                        >
                                            <View style={styles.availabilityContainer}>

                                                <View style={styles.listContainer} >
                                                <React.Fragment>
                                                    <View style={styles.listItemContainer}>
                                                        <Text style={styles.unitHeader}>Unit</Text>
                                                        <Text style={styles.bedHeader}>Bed</Text>
                                                        <Text style={styles.bedHeader}>Bath</Text>
                                                        <Text style={styles.unitHeader}>SqFt</Text>
                                                        <Text style={styles.priceHeader}>Exposure</Text>
                                                        <Text style={styles.priceHeader}>Price</Text>
                                                        <Text style={styles.unitHeader}>CC</Text>
                                                        <Text style={styles.unitHeader}>RET</Text>
                                                    </View>
                                                    <View style={styles.separator} />
                                                    <View  >

                                                        <FlatList
                                                            data={units}
                                                            renderItem={({ item }) =>
                                                                <React.Fragment  >
                                                                    <TouchableOpacity
                                                                    key={item.unit}
                                                                    onFocus={() => this.selectedUnit(item)}
                                                                    tvParallaxProperties={{
                                                                        default: false,
                                                                    }}
                                                                    accessibilityRole={'button'}
                                                                    activeOpacity={1}
                                                                    style={currentUnit == item.unit ? styles.listItemContainerActive : styles.listItemContainer}>
                                                                        
                                                                        <Item key={item.unit} unit={item} />
                                                                </TouchableOpacity>
                                                                <View style={styles.separator} />
                                                                </React.Fragment>

                                                            }
                                                            keyExtractor={item => item.id}
                                                        />

                                                    </View >

                                                </React.Fragment >                                                
                                                </View>
                                                <View style={styles.imageContainer} >
                                                    <Image
                                                        source={images[currentUnit]}
                                                        style={styles.unitImage}
                                                    />
                                                </View>
                                            </View>
                                            {/* <View style={styles.availabilityContainer}>
                                                <TableList />
                                                <View style={styles.imageContainer} >
                                                    <Image style={styles.unitImage} source={require('../assets/images/unit_preview/506.png')} />
                                                </View>

                                            </View> */}
                                        </Modal>
                                    </View >

                                </Modal>
                            </View >
                            <Route exact path="/" render={() => <Home playSlideshow={playSlideshow} />} />
                            <Route exact path="/test" render={() => <Test playSlideshow={playSlideshow} />} />
                            <Route exact path="/residences" render={() => <Residences playSlideshow={playSlideshow} />} />
                        </View >
                    </View >
                </NativeRouter >

            </View >
        )
    }
}


const styles = StyleSheet.create({
    scrollViewChild: {
        flexDirection: 'row'
    },
    availabilityContainer: {
        marginTop: 200,
        paddingBottom: 50,
        // backgroundColor: 'red',
        height: 980,
        width: 1920,
        flex: 1,
        flexDirection: 'row'
    },
    unitImage: {
        resizeMode: 'contain',
        width: "100%",
        height: "100%"

    },
    imageContainer: {
        width: "25%",
        paddingRight: 30,
        height: 800,
        // backgroundColor: 'yellow'
    },
    listContainer: {
        marginRight: 50,
        paddingLeft: 30,
        width: "70%",
        // backgroundColor: 'powderblue'

    },

    listItemContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",

    },
    listItemContainerActive: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        backgroundColor: "#ffffff3d"
    },
    unit: {
        flex: 2,
        fontSize: 45,
        fontWeight: '300',
        paddingVertical: 16,
        paddingHorizontal: 10,
        color: Colors.white,
    },
    bed: {
        flex: 1,
        fontSize: 45,
        fontWeight: '300',
        paddingVertical: 16,
        paddingHorizontal: 10,

        color: Colors.white,
    },
    price: {
        flex: 3,
        fontSize: 45,
        fontWeight: '300',
        paddingVertical: 16,
        paddingHorizontal: 10,

        color: Colors.white,
    },
    unitHeader: {
        flex: 2,
        fontSize: 30,
        fontWeight: '300',
        paddingVertical: 16,
        paddingHorizontal: 10,
        color: Colors.white,
    },
    bedHeader: {
        flex: 1,
        fontSize: 30,
        fontWeight: '300',
        paddingVertical: 16,
        paddingHorizontal: 10,

        color: Colors.white,
    },
    priceHeader: {
        flex: 3,
        fontSize: 30,
        fontWeight: '300',
        paddingVertical: 16,
        paddingHorizontal: 10,

        color: Colors.white,
    },



    separator: {
        backgroundColor: Colors.light,
        height: 1,
    },


    linkStyle: {
        height: 50,
    },
    linkContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuContainer: {
        flexDirection: 'row',
        padding: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: "100%",
        width: "100%"
    },

    menuLink: {
        marginTop: 0,
        fontFamily: "Futura-Medium",
        fontWeight: '200',
        color: "white",
        fontSize: 30,
        marginRight: 30,
        zIndex: 10
    }

});

export default Routing;
