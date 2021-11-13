import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-date-picker'

// Classes
import API from '../../classes/api';

// Styles
import styles from './style';

// Icons
import LogoutIcon from '../../icons/logout.svg';
import PeopleIcon from '../../icons/people.svg';
import HatIcon from '../../icons/principle.svg';
import TickIcon from '../../icons/done.svg';

import BottomImage from '../../images/bottom.png';

// Components
import Button from '../../components/button';
import Header from '../../components/header';

const GiveHomeworkScreen = (props) => {

    const [title, setTitle] = useState("");
    const [desc, setDescription] = useState("");
    const [attach, setAttach] = useState("");
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [estTime, setEstTime] = useState("");

    const getTeacherStudentCount = () => {
        const students = [];
        const teacher = props.reducer.teachers.filter(element => element.id == props.reducer.loginAs.id);
        teacher[0].students_id.map(student_id => {
            students.push(props.reducer.students.filter(element => element.id == student_id)[0]);
        })
        return students.length
    }

    const giveHomework = () => {
        if (title == "" || title.length == 0) {
            alert("Please enter a title.");
            return;
        }
        if (desc == "" || desc.length == 0) {
            alert("Please enter a description.");
            return;
        }
        if (attach == "" || attach.length == 0) {
            alert("Please add an attachment.");
            return;
        }
        if (endDate < startDate) {
            alert("Homework's end time cannot be before start time.");
            return;
        }
        if (estTime == "" || estTime.length == 0) {
            alert("Please enter a estimated time.");
            return;
        }

        const homework = {
            assigned_id: [...(props.reducer.homework_select_all && props.reducer.students.map(el => { return el.id }))],
            teacher_id: props.reducer.loginAs.id,
            title: title,
            lecture: props.reducer.loginAs.lecture,
            desc: desc,
            payload: attach,
            start_time: startDate.getTime(),
            end_time: endDate.getTime(),
            estimated_solve_time: estTime,
        }

        API.sendHomework({ homework: homework }).then(response => {
            console.log("homework response -> ", response);
            alert("Successfully given the homework titled " + homework.title);
            API.getAllHomeworks().then(response => {
                props.dispatch({ type: "SET_ALL_HOMEWORKS", payload: response });
                props.navigation.navigate('Panel');
            });
        });
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={{ flexDirection: "row", paddingLeft: 18, paddingRight: 18, paddingBottom: 8 }}>
                <HatIcon width={24} height={24} fill={"#000"} />
                <View style={{ width: "100%", height: "100%" }}>
                    <Text style={{ fontSize: 18, color: "black", marginLeft: 8 }}>Giving homework to</Text>
                    <Text style={{ marginLeft: 8, fontWeight: "800", color: "black", fontSize: 24 }}>{props.reducer.homework_select_all && getTeacherStudentCount() + " students"}</Text>
                </View>
            </View>
            <KeyboardAvoidingView style={{ flex: 1, }}>
                <ScrollView style={{ flex: 1, }}>
                    <Text style={{ marginBottom: 8, marginTop: 12, color: "black", fontSize: 18, fontWeight: "600", paddingLeft: 18, paddingRight: 18 }}>Title</Text>
                    <View style={{ width: "100%", height: 48, paddingLeft: 18, paddingRight: 18 }}>
                        <TextInput
                            style={{ width: "100%", height: "100%", borderRadius: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: "white", elevation: 8, borderWidth: 2, borderColor: "#22B2DA" }}
                            value={title}
                            onChangeText={text => setTitle(text)}
                            placeholder="Enter a title to this homework..."
                            maxLength={32}
                            key="title"
                        />
                    </View>
                    <Text style={{ marginBottom: 8, marginTop: 12, color: "black", fontSize: 18, fontWeight: "600", paddingLeft: 18, paddingRight: 18 }}>Description</Text>
                    <View style={{ width: "100%", height: 84, paddingLeft: 18, paddingRight: 18 }}>
                        <TextInput
                            style={{ width: "100%", height: "100%", borderRadius: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: "white", elevation: 8, borderWidth: 2, borderColor: "#22B2DA", textAlignVertical: 'top' }}
                            value={desc}
                            onChangeText={text => setDescription(text)}
                            placeholder="Enter a description to this homework..."
                            maxLength={255}
                            multiline
                            key="desc"
                        />
                    </View>
                    <Text style={{ marginBottom: 8, marginTop: 12, color: "black", fontSize: 18, fontWeight: "600", paddingLeft: 18, paddingRight: 18 }}>Attachment</Text>
                    <View style={{ width: "100%", height: 48, paddingLeft: 18, paddingRight: 18 }}>
                        <TextInput
                            style={{ width: "100%", height: "100%", borderRadius: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: "white", elevation: 8, borderWidth: 2, borderColor: "#22B2DA", }}
                            value={attach}
                            onChangeText={text => setAttach(text)}
                            placeholder="(e.g. Google Drive, or an image link etc.)"
                            maxLength={255}
                            key="attach"
                        />
                    </View>
                    <Text style={{ marginBottom: 8, marginTop: 12, color: "black", fontSize: 18, fontWeight: "600", paddingLeft: 18, paddingRight: 18 }}>Start Date</Text>
                    <View style={{ width: "100%", paddingLeft: 18, paddingRight: 18, borderRadius: 8, overflow: "hidden" }}>
                        <DatePicker date={startDate} onDateChange={setStartDate} />
                    </View>
                    <Text style={{ marginBottom: 8, marginTop: 12, color: "black", fontSize: 18, fontWeight: "600", paddingLeft: 18, paddingRight: 18 }}>End Date</Text>
                    <View style={{ width: "100%", paddingLeft: 18, paddingRight: 18, borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
                        <DatePicker date={endDate} onDateChange={setEndDate} />
                    </View>
                    <Text style={{ marginBottom: 8, marginTop: 12, color: "black", fontSize: 18, fontWeight: "600", paddingLeft: 18, paddingRight: 18 }}>Estimated Solve Time</Text>
                    <View style={{ width: "100%", height: 48, paddingLeft: 18, paddingRight: 18, marginBottom: 128, }}>
                        <TextInput
                            style={{ width: "100%", height: "100%", borderRadius: 8, paddingLeft: 16, paddingRight: 16, backgroundColor: "white", elevation: 8, borderWidth: 2, borderColor: "#22B2DA", }}
                            value={estTime}
                            onChangeText={text => setEstTime(text)}
                            placeholder="Enter a time (e.g. 10 mins)"
                            maxLength={255}
                            key="est"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={{ width: "100%", justifyContent: "flex-end", paddingBottom: 64, paddingLeft: 18, paddingRight: 18 }}>
                <Button
                    text={"Send Homework"}
                    txtColor={"white"}
                    icon={<TickIcon width={24} height={24} fill={"#fff"} />}
                    btnColor={"#22B2DA"}
                    onPress={() => giveHomework()}
                />
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

export default connect(mapStateToProps)(GiveHomeworkScreen);;
