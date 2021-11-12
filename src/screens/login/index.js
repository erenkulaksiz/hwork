import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import PagerView from 'react-native-pager-view';

// Styles
import styles from './style';

// Components
import Header from '../../components/header';
import LoginComponent from '../../components/login';

import BottomImage from '../../images/bottom.png';

const LoginScreen = (props) => {

    const [loginSwitchPos, setSwitchPos] = useState(0);
    const [bannerPos, setBannerPos] = useState(0);

    const pager = useRef(PagerView);
    const pager2 = useRef(PagerView);

    // @desc         | navigates to according page with parameters screen & action

    // @param screen | has value of 1 or 2, 1 meaning log in, 2 meaning sign up
    // @param action | can have values "student", "teacher", "principle" according to action
    const _selectiveLogin = ({ screen, action }) => {
        props.navigation.navigate('SelectiveLogin', { screen: screen, action: action });
    }

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.title}>Welcome.</Text>
                <View style={styles.loginSwitchWrapper}>
                    <View style={styles.switchWrapper}>
                        <View style={styles.switchBg}>
                            <TouchableOpacity style={styles.switchSide} onPress={() => pager.current.setPage(0)} activeOpacity={0.4}>
                                {loginSwitchPos == 0 && <View style={styles.switchOverlay}>
                                    <View style={styles.switchCurrentSelected} />
                                </View>}
                                <Text style={styles.switchText}>Log in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.switchSide} onPress={() => pager.current.setPage(1)} activeOpacity={0.4}>
                                {loginSwitchPos == 1 && <View style={styles.switchOverlay}>
                                    <View style={styles.switchCurrentSelected} />
                                </View>}
                                <Text style={styles.switchText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PagerView
                        style={styles.pagerView}
                        initialPage={0}
                        onPageSelected={(e) => {
                            setSwitchPos(e.nativeEvent.position);
                        }}
                        ref={pager}
                    >
                        <View key="1">
                            <LoginComponent
                                screen={1}
                                onButtonPress={({ screen, action }) => _selectiveLogin({ screen: screen, action: action })}
                            />
                        </View>
                        <View key="2">
                            <LoginComponent
                                screen={2}
                                onButtonPress={({ screen, action }) => _selectiveLogin({ screen: screen, action: action })}
                            />
                        </View>
                    </PagerView>
                </View>
                <View style={styles.bannerWrapper}>
                    <View style={styles.banner}>
                        <View style={styles.bannerContent}>
                            <PagerView
                                style={styles.pagerView}
                                initialPage={0}
                                onPageSelected={(e) => {
                                    setBannerPos(e.nativeEvent.position);
                                }}
                                ref={pager2}
                            >
                                <View key="1" style={{ padding: 12 }}>
                                    <Text style={{ fontSize: 32, color: "black" }}>
                                        <Text style={{ fontWeight: "800", color: "black" }}>Track</Text> your & your student’s homeworks easly.
                                    </Text>
                                </View>
                                <View key="2" style={{ padding: 12 }}>
                                    <Text style={{ fontSize: 32, color: "black" }}>
                                        Give your students <Text style={{ fontWeight: "800", color: "black" }}>homework</Text> with only few taps, in your hands.
                                    </Text>
                                </View>
                                <View key="3" style={{ padding: 12 }}>
                                    <Text style={{ fontSize: 32, color: "black" }}>
                                        Introducing: <Text style={{ fontWeight: "800", color: "black" }}>Planned Homeworks.</Text>
                                    </Text>
                                </View>
                                <View key="4" style={{ padding: 12 }}>
                                    <Text style={{ fontSize: 32, color: "black" }}>
                                        You can give <Text style={{ fontWeight: "800", color: "black" }}>individual homeworks</Text> to students.
                                    </Text>
                                </View>
                            </PagerView>
                        </View>
                        <View style={styles.bannerFooter}>
                            {bannerPos == 0 ? <View style={styles.bannerDotSelected} /> : <View style={styles.bannerDot} />}
                            {bannerPos == 1 ? <View style={styles.bannerDotSelected} /> : <View style={styles.bannerDot} />}
                            {bannerPos == 2 ? <View style={styles.bannerDotSelected} /> : <View style={styles.bannerDot} />}
                            {bannerPos == 3 ? <View style={styles.bannerDotSelected} /> : <View style={styles.bannerDot} />}
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ position: "absolute", bottom: -64, width: "100%", zIndex: -1 }}>
                <Image source={BottomImage} />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        reducer: state.mainReducer,
        local: state.local,
    }
};

export default connect(mapStateToProps)(LoginScreen);
