import React from 'react';
import {
    View,
    Animated,
    Text,
    RefreshControl,
    SafeAreaView,
    Dimensions,
    Image,
    StyleSheet
} from 'react-native';
import {
    Button,
    Snackbar,
    List,
    Switch,
    TouchableRipple,
    Divider
} from 'react-native-paper';

import Firebase from '../../util/firebase';
import {writeNewFirebaseData, readFirebaseData} from '../../util/FirebaseHandler';
import {ScrollView} from 'react-native-gesture-handler';
import UserListView from '../../ui/UserListView';
import {colors} from '../../util/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HEADER_EXPANDED_HEIGHT = 200;
const HEADER_COLLAPSED_HEIGHT = 64;

const ProfilePic_or_Label = ({
    pic_or_text,
    source,
    imageStyle,
    viewStyle,
    labelStyle,
    label,

    style
}) => {
    return (
        <Animated.View
            style={{
            ...viewStyle,
            backgroundColor: 'purple',
            overflow: 'hidden'
        }}>
            {pic_or_text
                ? <Animated.Image
                        style={{
                        ...imageStyle
                    }}
                        source={source}/>
                : <View
                    style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>

                    <Animated.Text
                        style={{
                        ...labelStyle,
                        textAlign: 'center',
                        color: 'white'
                    }}>{label}</Animated.Text>
                </View>
}
        </Animated.View>
    )

}

const Headings = ({title}) => (
    <View style={{
        backgroundColor: '#ddd',
        padding: 16
    }}>
        <Text style={{
            fontSize: 18,
            color: '#333'
        }}>{title}</Text>
    </View>
)

const SettingItem = ({left, right, title, onClick}) => (
    <TouchableRipple onPress={onClick}>

        <View>
            <View
                style={{
                flexDirection: "row",
                justifyContent: 'space-between',
                padding: 16
            }}>
                <View
                    style={{
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}p>

                    <View
                        style={{
                        flexDirection: "row",
                        justifyContent: 'flex-start'
                    }}>
                        {left}
                        <Text
                            style={{
                            fontSize: 18,
                            color: '#333'
                        }}>{"  " + title}</Text>

                    </View>
                </View>

                <View
                    style={{
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    {right}
                </View>

            </View>
            <Divider/>
        </View>
    </TouchableRipple>
)

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            refreshing: false,
            data: {},
            snackVisible: false,
            scrollY: new Animated.Value(0)

        }
        this._onRefresh = this
            ._onRefresh
            .bind(this);
        console.ignoredYellowBox = ['Setting a timer'];
    }
    static navigationOptions = {
        header: null

    }
    context = this;

    _onRefresh() {
        var context = this;
        this.setState({refreshing: true})
        console.log("Got here")
        readFirebaseData("users").then((val) => {
            // console.log(val)
            context.setState({data: val, refreshing: false, snackVisible: true})
            console.log("Got the data")

        }).catch((e) => {
            console.log(e)
            context.setState({refreshing: false, snackVisible: true})

        })
    }

    render() {
        const {width: SCREEN_WIDTH} = Dimensions.get("screen")
        const headerHeight = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT
                ],
                extrapolate: 'clamp'
            });

        const editIconMarginTop = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    8, 22
                ],
                extrapolate: 'clamp'
            });

        const profileImageLeftMargin = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    SCREEN_WIDTH / 2 - 50,
                    4
                ],
                extrapolate: 'clamp'
            });

        const profileImageTopMargin = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    20, 4
                ],
                extrapolate: 'clamp'
            });

        const profileImageSize = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    100, 56
                ],
                extrapolate: 'clamp'
            });

        const profileImageBorder = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    50, 28
                ],
                extrapolate: 'clamp'
            });

        const profileLabelFontSize = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    56, 28
                ],
                extrapolate: 'clamp'
            });

        const textDisappear = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0,100, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    1,0.1, 0
                ],
                extrapolate: 'clamp'
            });

            const headerTextMargin = this
            .state
            .scrollY
            .interpolate({
                inputRange: [
                    0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT
                ],
                outputRange: [
                    4, -30
                ],
                extrapolate: 'clamp'
            });
        return (
            <SafeAreaView style={{
                flex: 1
            }}>
                <View
                    style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}>

                    <Animated.View
                        style={{
                        backgroundColor: colors.PROFILE,
                        height: headerHeight,
                        position: 'absolute',
                        width: SCREEN_WIDTH,
                        top: 0,
                        left: 0,
                        zIndex: 99,
                        elevation: 10,
                        shadowOffset: {
                            width: 10,
                            height: 10
                        },
                        shadowColor: 'black',
                        shadowOpacity: 0.3
                    }}>

                        <Animated.View
                            style={{
                            position: 'absolute',
                            right: 8,
                            top: editIconMarginTop
                        }}>
                            <Icon
                                size={20}
                                onPress={() => {
                                this
                                    .props
                                    .navigation
                                    .navigate("EditProfileScreen")
                            }}
                                style={{
                                color: 'white'
                            }}
                                name="user-edit"/>
                        </Animated.View>

                        <ProfilePic_or_Label
                            viewStyle={{
                            marginLeft: profileImageLeftMargin,
                            marginTop: profileImageTopMargin,
                            height: profileImageSize,
                            width: profileImageSize,
                            borderRadius: profileImageBorder
                        }}
                            imageStyle={{
                            height: profileImageSize,
                            width: profileImageSize,
                            borderRadius: profileImageBorder
                        }}
                            labelStyle={{
                            color: 'white',
                            fontSize: profileLabelFontSize
                        }}
                            pic_or_text={false}
                            label="PK"
                            source={require('../../../assets/user.jpg')}/>
                        <Animated.Text
                            style={{
                            marginTop: headerTextMargin,
                            color: 'white',
                            fontSize: 22,
                            textAlign: 'center',
                            opacity: textDisappear
                        }}>Prasidha Karki
                        </Animated.Text>
                        <Animated.Text
                            style={{
                                marginTop: headerTextMargin,
                            color: 'white',
                            textAlign: 'center',
                            opacity: textDisappear
                        }}>Sanepa, Lalitpur</Animated.Text>

                    </Animated.View>
                    <ScrollView
                        contentContainerStyle={{
                        padding: 8,
                        paddingTop: HEADER_EXPANDED_HEIGHT + 8
                    }}
                        onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollY
                                }
                            }
                        }
                    ])}
                        scrollEventThrottle={16}
                        refreshControl={< RefreshControl refreshing = {
                        this.state.refreshing
                    }
                    onRefresh = {
                        this._onRefresh
                    } />}>

                        <Headings title="Account"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Setting pressed")
                        }}
                            left={< Icon size = {
                            18
                        }
                        name = "bell" />}
                            title="Push Notifications"
                            right={< Switch onValueChange = {
                            (value) => {
                                console.log(value)
                            }
                        } />}/>

                        <SettingItem
                            left={< Icon size = {
                            18
                        }
                        name = "map" />}
                            title="Location"
                            right={< Icon size = {
                            18
                        }
                        name = "angle-right" />}/>

                        <Headings title="Others"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword");
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            this.logOutUser(this)
                        }}
                            title="Logout"/>

                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>
                        <SettingItem
                            onClick={() => {
                            console.log("Change Password");
                            this
                                .props
                                .navigation
                                .navigate("ChangePassword")
                        }}
                            title="Change Password"/>

                    </ScrollView>
                </View>

            </SafeAreaView>
        )
    }

    componentWillMount() {
        // this.getUserData(); this.unsubscribeLoadingData=this._onRefresh();
    }
    componentWillUnmount() {
        try {
            this.unsubscribeFirebase();
            // this.unsubscribeLoadingData();
        } catch (e) {
            console.log(e);
        }
    }
    getUserData() {
        console.log("Got here")
        var context = this;
        this.unsubscribeFirebase = Firebase
            .auth()
            .onAuthStateChanged(function (user) {
                if (user) {
                    console.log(user);
                    context.setState({user: user})
                } else {
                    console.log("User not found")
                }
            });
    }
    logOutUser(context) {
        console.log("Got to logout")
        //context.props.navigation.navigate("LoggedOut");
        Firebase
            .auth()
            .signOut()
            .then(function () {
                context
                    .props
                    .navigation
                    .navigate("LoggedOut")
            }, function (error) {
                // An error happened.
            });
    }
}
