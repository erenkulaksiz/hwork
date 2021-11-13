import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

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
    const [signupName, setSignupName] = useState("");
    const [loadingSignup, setLoadingSignup] = useState(false);

    const [selectedClass, setSelectedClass] = useState("1-A");

    // props.route.params.screen
    // props.route.params.action

    const onLoginPress = () => {
        // Check login type first

        if (props.route.params.screen == 2) {
            signUpPress();
            return;
        }

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

    const signUpPress = () => {
        if (!loadingSignup) {
            setLoadingSignup(true);
            const teachers = props.reducer.teachers.filter(el => {
                return el.class == selectedClass;
            });

            console.log("teachers: ", teachers);

            API.registerStudent({ name: signupName, studentclass: selectedClass, completed_homework_ids: [], completed_homework_payloads: [] }).then(response => {
                console.log("Register response: ", response);

                let newTeachers = [...teachers];
                newTeachers.map((el, index) => {
                    newTeachers[index].students_id = [...newTeachers[index].students_id, response.id];
                })

                console.log("New teachers: ", newTeachers);


                Promise.all([API.updateTeachers({ teacher: newTeachers[0] }), API.updateTeachers({ teacher: newTeachers[1] })]).then((values) => {
                    console.log("AAAAAAAAAAA", values);
                    API.getAllStudents().then(responseReg => {
                        props.dispatch({ type: "SET_STUDENTS", payload: responseReg });
                        API.getAllTeachers().then(responseTeac => {
                            props.dispatch({ type: "SET_ALL_TEACHERS", payload: responseTeac });
                            props.dispatch({ type: "SET_LOGIN_AS", payload: response });
                            props.navigation.navigate('Panel');
                            setLoadingSignup(false);
                        });
                    }).catch(err => console.error(err));
                });

            })
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <LoginIcon width={32} height={32} fill={"#000"} />
                    <Text style={{ color: "black", fontSize: 24, fontWeight: "600", marginLeft: 8 }}>{props.route.params.screen == 1 ? "Log in" : "Sign Up"}</Text>
                </View>

                {
                    props.route.params.screen == 2 && <View style={{ flex: 1, }}>
                        <Text style={{ marginTop: 32, color: "black", fontSize: 18, fontWeight: "600", }}>Name</Text>
                        <View style={{ width: "100%", height: 48, marginTop: 8, }}>
                            <TextInput
                                style={{ width: "100%", height: "100%", borderRadius: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: "white", elevation: 8, borderWidth: 2, borderColor: "#22B2DA" }}
                                value={signupName}
                                onChangeText={text => setSignupName(text)}
                                placeholder="Please enter your name here..."
                                key="signupname1"
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginTop: 32, color: "black", fontSize: 18, fontWeight: "600", }}>Select Class</Text>
                            <View>
                                <View style={{ width: "100%", marginTop: 8, }}>
                                    <View style={{ backgroundColor: "#E0E0E0", borderRadius: 8 }}>
                                        <Picker
                                            selectedValue={selectedClass}
                                            mode="dropdown"
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedClass(itemValue)
                                            }>
                                            <Picker.Item label="1-A" value="1-A" />
                                            <Picker.Item label="2-A" value="2-A" />
                                            <Picker.Item label="3-A" value="3-A" />
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                }

                {
                    props.route.params.screen == 1 && <View style={{ width: "100%", height: 48, marginTop: 16, }}>
                        <TextInput
                            style={{ width: "100%", height: "100%", borderRadius: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: "white", elevation: 8, borderWidth: 2, borderColor: "#22B2DA" }}
                            value={loginId}
                            onChangeText={text => setLoginId(text.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                            placeholder="Please enter your id... (e.g. 1)"
                            key="loginid1"
                            onSubmitEditing={() => onLoginPress()}
                            maxLength={3}
                        />
                    </View>
                }

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
                            text={props.route.params.screen == 1 ? "Log in" : "Sign Up"}
                            txtColor={"white"}
                            icon={<ArrowRightIcon width={24} height={24} fill={"#fff"} />}
                            btnColor={"#22B2DA"}
                            style={{ width: "48%" }}
                            onPress={() => onLoginPress()}
                            isLoading={loadingSignup}
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
