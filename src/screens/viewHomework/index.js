import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, ScrollView, Alert, Linking } from 'react-native';
import { connect } from 'react-redux';
import pretty from 'pretty-ms';
import moment from 'moment';

// Classes
import API from '../../classes/api';

// Styles
import styles from './style';

// Icons
import HatIcon from '../../icons/principle.svg';
import DeleteIcon from '../../icons/delete.svg';
import TickIcon from '../../icons/done.svg';
import CheckCircleIcon from '../../icons/check_circle.svg';

import BottomImage from '../../images/bottom.png';

// Components
import Button from '../../components/button';
import Header from '../../components/header';

const ViewHomeworkScreen = (props) => {

    const completedHomework = (student) => {
        let res = false;

        props.reducer.students.filter(el => {
            return el.id == student.id;
        })[0].completed_homework_ids.map(element => {
            //console.log("Completed: ", element, " item: ", props.route.params.item.id);
            if (element == props.route.params.item.id) {
                res = true;
            }
        });
        return res
    }

    const StudentList = () => {
        if (props.route.params.item.assigned_id.length > 2) {
            // array
            return props.route.params.item.assigned_id.map(element => {
                return props.reducer.students.filter(el => el.id == element)[0];
            })
        } else {
            return props.reducer.students.filter(el => el.id == props.route.params.item.assigned_id)
        }
    }

    const reviewCompletedHomework = ({ student }) => {
        if (completedHomework(student) == true) {
            console.log("user completed homework, redirecting to review");
            props.navigation.navigate("ReviewHomework", { student: student, homework: props.route.params.item });
        }
    }

    const Student = ({ student }) => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", }}>
                <View style={{ width: 32, height: 32 }}>
                    <Image source={{ uri: student.avatar }} style={{ width: "100%", height: "100%", borderRadius: 32 }} />
                </View>
                <Text style={{ color: "black", fontSize: 18, marginLeft: 16 }}>{student.name}</Text>
                {completedHomework(student) == true && <View style={{ flex: 1, height: "100%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                    <CheckCircleIcon width={24} height={24} fill={"green"} />
                    <Text style={{ color: "green", fontWeight: "600", marginLeft: 8 }}>Completed</Text>
                </View>}
            </View>
        )
    }

    const _renderStudentList = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ width: "100%", height: 48, backgroundColor: item.id % 2 == 1 ? "white" : "#D7D7D7", justifyContent: "center", padding: 8, borderRadius: 8, marginBottom: 4, }}
                onPress={() => reviewCompletedHomework({ student: item })}
            >
                <Student student={item} />
            </TouchableOpacity>
        )
    }

    const _removeHomework = ({ item }) => {
        Alert.alert(
            "Are you sure?",
            "You are deleting homework titled " + item.title + ", are you sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        API.removeHomework({ homework: item }).then(response => {
                            props.navigation.goBack();
                            API.getAllHomeworks().then(response => {
                                props.dispatch({ type: "SET_ALL_HOMEWORKS", payload: response });
                            });
                            console.log("Remove response: ", response);
                        })
                    },
                    style: "okay",
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        "This alert was dismissed by tapping outside of the alert dialog."
                    ),
            });
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ flex: 1, paddingLeft: 18, paddingRight: 18 }}>
                <View style={{ width: "100%", flexDirection: "row", height: 48 }}>
                    <View style={{ width: "50%", flexDirection: "row", alignItems: "center" }}>
                        <HatIcon width={24} height={24} fill={"#000"} />
                        <Text style={{ marginLeft: 14, color: "black", fontSize: 24, fontWeight: "600" }}>Homework</Text>
                    </View>
                </View>
                {
                    props.route.params.student ? (props.route.params.completed || <Button
                        text={"Complete Homework"}
                        txtColor={"white"}
                        icon={<TickIcon width={24} height={24} fill={"#fff"} />}
                        btnColor={"#22B2DA"}
                        onPress={() => { props.navigation.navigate("CompleteHomework", { ...props.route.params.item }) }}
                    />) : <Button
                        text={"Delete Homework"}
                        txtColor={"white"}
                        icon={<DeleteIcon width={24} height={24} fill={"#fff"} />}
                        btnColor={"#A71C1C"}
                        style={{ width: "60%", marginTop: 8 }}
                        onPress={() => _removeHomework({ item: props.route.params.item })}
                    />
                }
                <View style={{ width: "100%", marginTop: 16, }}>
                    <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Lecture</Text>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 24 }}>{props.route.params.item.lecture}</Text>
                </View>
                <View style={{ width: "100%", marginTop: 16, }}>
                    <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Title</Text>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 24 }}>{props.route.params.item.title}</Text>
                </View>
                <View style={{ width: "100%", marginTop: 16, }}>
                    <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Description</Text>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 18 }}>{props.route.params.item.desc}</Text>
                </View>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={{ width: "50%", marginTop: 16, }}>
                        <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Start Time</Text>
                        <Text style={{ color: "black", fontWeight: "800", fontSize: 16 }}>{moment(props.route.params.item.start_time).format('HH:mm - DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{ width: "50%", marginTop: 16, }}>
                        <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>End Time</Text>
                        <Text style={{ color: "black", fontWeight: "800", fontSize: 16 }}>{moment(props.route.params.item.end_time).format('HH:mm - DD/MM/YYYY')}</Text>
                    </View>
                </View>
                {
                    props.route.params.student || <View style={{ flex: 1, marginTop: 16 }}>
                        <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16, marginBottom: 8 }}>Students assigned</Text>
                        <FlatList
                            data={StudentList()}
                            renderItem={_renderStudentList}
                            style={{ flex: 1 }}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={<View>
                                <Text>No students assigned</Text>
                            </View>}
                        />

                    </View>
                }
                <View style={{ flex: 1, }}>
                    <View style={{ marginTop: 16, }}>
                        <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Attachment</Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <TouchableOpacity style={{ flex: 1, }} onPress={() => Linking.openURL(props.route.params.item.payload)}>
                            <Image source={{ uri: props.route.params.item.payload }} style={{ flex: 1 }} resizeMode={"center"} />
                        </TouchableOpacity>
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

export default connect(mapStateToProps)(ViewHomeworkScreen);;
