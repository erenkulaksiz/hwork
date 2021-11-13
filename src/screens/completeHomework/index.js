import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';

// Styles
import styles from './style';

// Classes
import API from '../../classes/api';

// Components
import Header from '../../components/header';
import Button from '../../components/button';

// Icons
import HatIcon from '../../icons/principle.svg';
import TickIcon from '../../icons/done.svg';

import BottomImage from '../../images/bottom.png';

const CompleteHomeworkScreen = (props) => {

    const [payload, setPayload] = useState("");

    const _completeHomework = () => {
        let currUser = props.reducer.students.filter(el => {
            return el.id == props.reducer.loginAs.id;
        })[0];
        let newUser = {
            ...currUser,
            completed_homework_payloads: currUser.completed_homework_payloads ? [...currUser.completed_homework_payloads] : [],
        }
        newUser.completed_homework_ids.push(props.route.params.id);
        newUser.completed_homework_payloads.push({ payload: payload, id: props.route.params.id, date: Date.now() });

        API.completeHomework({ student: newUser }).then(response => {
            console.log("Completed response: ", response);
            API.getAllStudents().then(async (response) => {
                await props.dispatch({ type: "SET_STUDENTS", payload: response });
                await props.navigation.navigate("Panel");
            }).catch(err => console.error(err));
        })
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <View style={{ width: "100%", flex: 1, flexDirection: "row", height: 48 }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                        <HatIcon width={24} height={24} fill={"#000"} />
                        <Text style={{ marginLeft: 14, color: "black", fontSize: 24, fontWeight: "600" }}>Complete Homework</Text>
                    </View>
                </View>
                <Text style={{ marginBottom: 8, marginTop: 12, color: "black", fontSize: 18, fontWeight: "600", }}>Attachment Link</Text>
                <View style={{ width: "100%", height: 48, }}>
                    <TextInput
                        style={{ width: "100%", height: "100%", borderRadius: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: "white", elevation: 8, borderWidth: 2, borderColor: "#22B2DA" }}
                        value={payload}
                        onChangeText={text => setPayload(text)}
                        placeholder="Enter an attachment link..."
                        key="payload"
                    />
                </View>
                <View style={{ height: "60%", padding: 8, justifyContent: "flex-end" }}>
                    <Button
                        text={"Complete"}
                        txtColor={"white"}
                        icon={<TickIcon width={24} height={24} fill={"#fff"} />}
                        btnColor={"#22B2DA"}
                        style={{ width: "100%" }}
                        onPress={() => _completeHomework()}
                    />
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

export default connect(mapStateToProps)(CompleteHomeworkScreen);
