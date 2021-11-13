import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';

// Classes
import API from '../../classes/api';

// Styles
import styles from './style';

// Icons
import LoginIcon from '../../icons/login.svg';
import ArrowRightIcon from '../../icons/arrow.svg';
import BottomImage from '../../images/bottom.png';

// Components
import Button from '../../components/button';
import Header from '../../components/header';

const SelectiveLoginScreen = (props) => {

    const [loginId, setLoginId] = useState("");
    const [loginName, setLoginName] = useState("");

    // props.route.params.screen
    // props.route.params.action

    const onLoginPress = () => {
        // Check login type first
        if (props.route.params.action == "student") {
            if (loginId == 0 || loginId == "" || loginId == null || loginId.length > 2) {
                alert("Please enter a valid ID.");
                return;
            }

            const student = props.reducer.students.filter(element => element.id == loginId);

            console.log("student: ", student);
            if (student.length != 0) {

                API.getAllHomeworks().then(response => {
                    props.dispatch({ type: "SET_ALL_HOMEWORKS", payload: response });
                })

                props.dispatch({ type: "SET_LOGIN_AS", payload: { ...student[0], student: true } });
                props.dispatch({ type: "SET_LOCAL_LOGGED_IN", payload: { ...student[0], student: true } });
                props.navigation.navigate('Panel');
            } else {
                alert("Please enter a valid ID.");
            }
        } else if (props.route.params.action == "teacher") {
            if (loginId == 0 || loginId == "" || loginId == null || loginId.length > 2) {
                alert("Please enter a valid ID.");
                return;
            }

            const teacher = props.reducer.teachers.filter(element => element.id == loginId);
            console.log("teacher: ", teacher);

            if (teacher.length != 0) {
                props.dispatch({ type: "SET_LOGIN_AS", payload: { ...teacher[0], teacher: true } });
                props.dispatch({ type: "SET_LOCAL_LOGGED_IN", payload: { ...teacher[0], teacher: true } });
                props.navigation.navigate('Panel');
            } else {
                alert("Please enter a valid ID.");
            }
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text>{props.route.params.screen == 1 ? "Log in" : "Sign Up"}</Text>

                <View style={{ width: "100%", height: 64, backgroundColor: "gray" }}>
                    <TextInput
                        style={{ width: "100%", height: "100%" }}
                        value={loginId}
                        onChangeText={text => setLoginId(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                        placeholder="Enter your national id... (e.g. 1)"
                        key="loginid1"
                        onSubmitEditing={() => onLoginPress()}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 64, }}>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", }}>
                        <Button
                            text={"Back"}
                            txtColor={"white"}
                            icon={<ArrowRightIcon width={24} height={24} fill={"#fff"} style={{ transform: [{ rotate: '180deg' }] }} />}
                            btnColor={"#868686"}
                            style={{ width: "48%" }}
                            onPress={() => props.navigation.goBack()}
                        />
                        <Button
                            text={"Log in"}
                            txtColor={"white"}
                            icon={<ArrowRightIcon width={24} height={24} fill={"#fff"} />}
                            btnColor={"#22B2DA"}
                            style={{ width: "48%" }}
                            onPress={() => onLoginPress()}
                        />
                    </View>
                </View>
            </View>
            <View style={{ position: "absolute", bottom: -64, width: "100%", zIndex: -1 }}>
                <Image source={BottomImage} />
            </View>
        </View >
    );
};

const mapStateToProps = (state) => {
    return {
        reducer: state.mainReducer,
        local: state.local,
    }
};

export default connect(mapStateToProps)(SelectiveLoginScreen);;
