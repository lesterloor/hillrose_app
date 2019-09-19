import React, { Fragment, Component } from 'react';
import { View, BackHandler, Modal, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Image, ImageStore } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from "react-router-native";
import Home from "../screens/Home"
import Test from "../App2"
import Residences from "../screens/Residences"
import Neighborhood from "../screens/Neighborhood"
import { Overlay } from 'react-native-elements';
import Colors from "./Colors"
var TVEventHandler = require('TVEventHandler');
function getData(number) {
    let data = [
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

    return data;
}
export class Routing extends Component {
    _tvEventHandler: any;
    constructor() {
        super()
        this.state = {
            showMenu: false,
            showMainMenu: true,
            hoveredMenuIndex: 0,
            hideAvailableMenu: true,
            showAvailabilityMenu: false,
            isMenuOpened: false,
            showFloorPlan: false,
            hoveredMenuItem: null,
            hoveredAvailabilityMenuItem: "Available",
            currentRouteName: "",
            currentPage: "/",
            latestRoute: null,
            currentUnit: 506,
            playSlideshow: false,
            images: {
                '506': require('../assets/images/unit_preview/506.png'),
                '705': require('../assets/images/unit_preview/705.png'),
                '706': require('../assets/images/unit_preview/706.png'),
                '806': require('../assets/images/unit_preview/806.png'),
            },
            floorplan: {
                '506': require('../assets/images/floorplans/plan.png'),
            }
        }
    }

    _enableTVEventHandler() {
        this._tvEventHandler = new TVEventHandler();
        this._tvEventHandler.enable(this, (cmp, evt) => {
            // console.log("evt", evt)
            if (evt.eventType === 'longSelect') {
                this.setState({ showMenu: true })
            } else if (evt.eventType === 'playPause') {
                // this.setState(prevState => ({ playSlideshow: !prevState.playSlideshow }))
            }
            else if (evt.eventType === 'swipeLeft') {
                // this.setState(prevState => ({ playSlideshow: !prevState.playSlideshow }))
            }
            else if (evt.eventType === 'focus') {

                if (this.state.showFloorPlan) {
                    this.setState({ showFloorPlan: false })
                }
            }
        });
    }

    _disableTVEventHandler() {

        if (this._tvEventHandler) {
            this._tvEventHandler.disable();
            delete this._tvEventHandler;
        }
    }
    openMenu = () => {
        this.setState({ showMenu: true })

    }
    componentDidMount() {
        console.log("mountef")

        this._enableTVEventHandler();
        BackHandler.addEventListener('hardwareBackPress', function () {
        });
    }
    componentWillMount = () => {
        this.setState({ itemToState: 1 });
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


    }

    selectedMenuItem = (item, index) => {
        // console.log("hovering over", index, item)
        this.setState({
            hoveredMenuItem: item,
            hoveredMenuIndex: index,

        })


    }
    selectedAvailabilityMenuItem = (item) => {

        this.setState({
            hoveredAvailabilityMenuItem: item,
        })


    }
    showFloorPlan = (item) => {

        this.setState({
            showFloorPlan: true,
            floorplanNumber: item.unit
        })


    }

    openMainMenu = () => {
        this.setState(prevProps => {
            console.log("should hover to ", prevProps)
            return { hoveredMenuItem: prevProps.hoveredMenuItem }
        })

        // console.log("show menu")
        // this.scrollToItem()
    }
    showAvailability = () => {
        this.setState({ showFloorPlan: false, showMainMenu: false })
    }

    hideAvailableMenu = () => {

        this.setState({ showAvailabilityMenu: false, showFloorPlan: false, showMainMenu: true })

    }
    hideMainMenu = () => {
        this.setState({ showMenu: false, })

    }
    getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
    )
    getItemLayout(data, index) {
        return (
            {
                length: yourItemHeightSize,
                offset: yourItemHeightSize * index,
                index
            }
        );
    }
    render() {
        const { showMenu, showFloorPlan, images, floorplan, latestRoute, hoveredMenuIndex, hideAvailableMenu, hoveredAvailabilityMenuItem, hoveredMenuItem, playSlideshow, showAvailabilityMenu, currentUnit, currentRoute, currentRouteName } = this.state
        const MenuItems = [
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
            },
            {
                title: 'Neighborhood',
                link: '/neighborhood',
            },]
        const availabilityMenu = [
            {
                title: 'Available',
            },
            {
                title: '1 Bedrooms',
            },
            {
                title: '2 Bedrooms',
            },
            {
                title: 'Penthouses',
            }]
        const Available = [
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
                bed: "2",
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
                bed: "3",
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
        ]
        const oneBedRooms = [
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
        ];
        const twoBedRooms = [
            {
                unit: '506',
                bed: "2",
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
                bed: "2",
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
                bed: "2",
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
        ];
        const pentHouses = [
            {
                unit: '506',
                bed: "3",
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
                bed: "3",
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
                bed: "3",
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
                bed: "3",
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



        const MenuItemsList = ({ index, title }) => {
            // console.log("item?????", index)
            return (

                <Text style={styles.menuLink}>{title}</Text>
            );
        }

        console.log("this.state?", this.state)
        return (
            <View>
                <NativeRouter >
                    <View>
                        <View>
                            <Modal
                                onShow={() => this.openMainMenu()}
                                animationType="fade"
                                transparent={true}
                                visible={showMenu}
                                onRequestClose={() => this.hideMainMenu()}
                                onDismiss={() => this.hideMainMenu()}
                            >
                                <View style={styles.menuContainer} >
                                    {showAvailabilityMenu ? null :
                                        <FlatList
                                            ref={this.setRef}
                                            keyExtractor={item => item._id}

                                            horizontal={true}
                                            data={MenuItems}
                                            renderItem={({ item, index }) => (
                                                <Link
                                                    key={item.title}
                                                    onFocus={() => this.selectedMenuItem(item.title, index)}
                                                    tvParallaxProperties={{ enabled: false, }}
                                                    underlayColor="#ffffff00"
                                                    onPress={() => item.title === "Availability" ?
                                                        this.setState({ showAvailabilityMenu: true, }) :
                                                        this.setState({ currentRoute: item.link, currentRouteName: item.title, showMenu: false, latestRoute: item.link })}
                                                    to={item.title === "Availability" ? currentRoute : item.link}
                                                    style={
                                                        hoveredMenuItem == item.title ?
                                                            styles.linkStyleActive
                                                            :
                                                            styles.linkStyle

                                                    }

                                                >
                                                    <Text style={styles.menuLink}>{item.title}</Text>
                                                </Link>
                                            )}
                                        />}

                                </View>
                                <View>
                                    <Modal
                                        onShow={() => this.showAvailability()}
                                        animationType="none"
                                        transparent={true}
                                        visible={showAvailabilityMenu}
                                        onRequestClose={() => this.hideAvailableMenu()}
                                        onDismiss={() => this.hideAvailableMenu()}
                                    >
                                        <View style={styles.availabilityMenu} >
                                            {availabilityMenu.map((item, index) =>

                                                <Link
                                                    onFocus={() => this.selectedAvailabilityMenuItem(availabilityMenu[index].title)}
                                                    key={index}
                                                    tvParallaxProperties={{
                                                        enabled: false,
                                                    }}
                                                    underlayColor="#ffffff00"
                                                    activeOpacity={1}
                                                    style={hoveredAvailabilityMenuItem == availabilityMenu[index].title ? styles.linkStyleActive : styles.linkStyle}
                                                >
                                                    <TouchableOpacity
                                                        activeOpacity={1}
                                                        key={index}
                                                        accessibilityRole={'button'}

                                                        style={styles.linkContainer}>
                                                        <Text
                                                            activeOpacity={1}
                                                            style={styles.menuLink}>{availabilityMenu[index].title}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </Link>


                                            )}
                                        </View>
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

                                                            data={hoveredAvailabilityMenuItem == "1 Bedrooms" ? oneBedRooms : hoveredAvailabilityMenuItem == "2 Bedrooms" ? twoBedRooms : hoveredAvailabilityMenuItem == "Available" ? Available : hoveredAvailabilityMenuItem == "Penthouses" ? pentHouses : Available}
                                                            renderItem={({ item }) =>
                                                                <React.Fragment  >
                                                                    <TouchableOpacity
                                                                        key={item.unit}
                                                                        onPress={() => this.showFloorPlan(item)}
                                                                        onFocus={() => this.selectedUnit(item)}
                                                                        tvParallaxProperties={{
                                                                            enabled: false,
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
                                                <View>
                                                    <Modal
                                                        style={{ backgroundColor: "f1f1f1" }}
                                                        onShow={() => console.log("show floorplan")}
                                                        animationType="fade"
                                                        transparent={false}
                                                        visible={showFloorPlan}
                                                        onRequestClose={() => console.log("closed floorplan")}
                                                        onDismiss={() => console.log("closed floorplan")}
                                                    >
                                                        <View style={styles.availabilityContainer}>
                                                            <Image
                                                                source={floorplan["506"]}
                                                                style={styles.unitImage}
                                                            />
                                                        </View>
                                                    </Modal>
                                                </View>
                                            </View>
                                            <View style={styles.imageContainer} >
                                                <Image
                                                    source={images[currentUnit]}
                                                    style={styles.unitImage}
                                                />
                                            </View>

                                        </View>

                                    </Modal>

                                </View >

                            </Modal>
                        </View >
                        <Route exact path="/" render={() => <Home playSlideshow={playSlideshow} showMenu={showMenu} openMenu={this.openMenu} />} />
                        <Route exact path="/test" render={() => <Test playSlideshow={playSlideshow} showMenu={showMenu} openMenu={this.openMenu} />} />
                        <Route exact path="/neighborhood" render={() => <Neighborhood playSlideshow={playSlideshow} showMenu={showMenu} openMenu={this.openMenu} />} />
                        <Route exact path="/residences" render={() => <Residences playSlideshow={playSlideshow} showMenu={showMenu} />} openMenu={this.openMenu} />
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
        marginTop: 170,
        paddingBottom: 50,
        height: 1080,
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
        height: 40,
        padding: 0,
        marginRight: 30,

    },
    linkStyleActive: {
        height: 40,
        padding: 0,
        marginRight: 30,

        borderBottomColor: 'red',
        borderBottomWidth: 2
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
    availabilityMenu: {
        flexDirection: 'row',
        height: 100,
        padding: 30,
        // backgroundColor: 'red',
        width: "100%"
    },

    menuLink: {
        marginTop: 0,
        fontFamily: "Futura-Medium",
        fontWeight: '200',
        color: "white",
        fontSize: 30,
        zIndex: 10,

    }

});

export default Routing;
