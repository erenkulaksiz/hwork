import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import pretty from 'pretty-ms';

// Classes
import API from '../../classes/api';

// Styles
import styles from './style';

// Icons
import PersonIcon from '../../icons/person.svg';
import HatIcon from '../../icons/principle.svg';
import LectureIcon from '../../icons/school.svg';
import TimeIcon from '../../icons/time.svg';
import SubjectIcon from '../../icons/subject.svg';
import CalendarIcon from '../../icons/calendar.svg';
import ArrowIcon from '../../icons/arrow.svg';
import AddIcon from '../../icons/add.svg';

import BottomImage from '../../images/bottom.png';

// Components
import Button from '../../components/button';
import Header from '../../components/header';

const ViewScreen = (props) => {

    const getTeacherHomeworks = () => {
        if (props.route.params.viewFrom == "principle") {
            return props.reducer.homeworks
        } else {
            return props.reducer.homeworks.filter(element => {
                return element.teacher_id == props.reducer.loginAs.id && element
            })
        }
    }

    const getTeacherStudents = () => {
        const students = [];

        if (props.route.params.viewFrom == "principle" && props.route.params.teacher) {
            console.log("teacher: ", props.route.params.teacher);
            props.route.params.teacher.students_id.map((el) => {
                const findStudents = props.reducer.students.filter((ele) => ele.id == el)[0];
                if (findStudents != null) students.push(findStudents);
            })
            console.log("students: ", students);
            return students
        }

        if (props.route.params.viewFrom == "principle") {
            return props.reducer.students.sort((a, b) => a.class > b.class)
        } else {
            const teacher = props.reducer.teachers.filter(element => element.id == props.reducer.loginAs.id)[0];
            console.log("Teahcer: ", teacher);
            teacher.students_id.map(student_id => {
                students.push(props.reducer.students.filter(element => element.id == student_id)[0]);
            })
            return students.sort((a, b) => a.class > b.class)
        }
    }

    const removeStudent = ({ item }) => {
        // only principle can use this

        if (props.route.params.viewFrom == "principle") {
            console.log("Removing item: ", item);

            Alert.alert(
                "Are you sure?",
                "You are deleting student " + item.name + " are you sure?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Yes",
                        onPress: () => {
                            API.removeStudent({ student: item }).then(response => {
                                console.log("Remove response: ", response);
                                // getting all students again
                                API.getAllStudents().then(students => {
                                    props.dispatch({ type: "SET_STUDENTS", payload: students });

                                }).catch(err => console.error(err));
                            })
                        },
                        style: "okay",
                    },
                ],
                {
                    cancelable: true,
                });


        }
    }

    const HomeworkItem = ({ homework }) => {

        const _getRemainingTime = () => {
            const remaining = homework.end_time - Date.now()
            return pretty(remaining, { compact: true })
        }

        return (
            <View style={styles.homeworkItem}>
                <View style={{ height: "50%", width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <LectureIcon width={24} height={24} fill={"#000"} style={{ marginRight: 8 }} />
                        <Text style={styles.homeworkItemLecture}>{homework.lecture}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row-reverse" }}>
                        <TimeIcon width={24} height={24} fill={"#000"} style={{ marginLeft: 8 }} />
                        <Text style={{ color: "black" }}>{homework.estimated_solve_time}</Text>
                    </View>
                </View>
                <View style={{ height: "50%", width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <SubjectIcon width={24} height={24} fill={"#000"} style={{ marginRight: 8 }} />
                        <Text style={{ color: "black" }}>{homework.title}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row-reverse" }}>
                        <CalendarIcon width={24} height={24} fill={"#000"} style={{ marginLeft: 8 }} />
                        <Text style={{ color: "black" }}>{_getRemainingTime()}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const _renderHomeworkItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ paddingLeft: 8, paddingRight: 8 }} activeOpacity={0.8} onPress={() => props.navigation.navigate("ViewHomework", { item: item })}>
                <HomeworkItem homework={item} />
            </TouchableOpacity>
        )
    }

    const StudentItem = ({ student }) => {
        return (
            <View style={styles.homeworkItem}>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 44, height: 44 }}>
                        <Image source={{ uri: student.avatar || "https://www.euroteks.com.tr/wp-content/uploads/2013/05/765-default-avatar.png" }} style={{ width: "100%", height: "100%", borderRadius: 32 }} />
                    </View>
                    <Text style={{ marginLeft: 8, fontSize: 18, color: "black" }}>{student.name}</Text>
                </View>
                <View style={{ marginTop: 6 }}>
                    <Text style={{ color: "black", fontWeight: "600" }}>Class: {student.class}</Text>
                </View>
            </View>
        )
    }

    const _renderStudentItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ paddingLeft: 8, paddingRight: 8 }} activeOpacity={0.8} onPress={() => removeStudent({ item: item })}>
                <StudentItem student={item} />
            </TouchableOpacity>
        )
    }

    const TeacherItem = ({ teacher }) => {
        return (
            <View style={{ ...styles.homeworkItem, height: 120 }}>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 44, height: 44 }}>
                        <Image source={{ uri: teacher.avatar || "https://www.euroteks.com.tr/wp-content/uploads/2013/05/765-default-avatar.png" }} style={{ width: "100%", height: "100%", borderRadius: 32 }} />
                    </View>
                    <Text style={{ marginLeft: 8, fontSize: 18, color: "black" }}>{teacher.name}</Text>
                </View>
                <View style={{ marginTop: 6 }}>
                    <Text style={{ color: "black" }}>Class: <Text style={{ fontWeight: "800" }}>{teacher.class}</Text></Text>
                </View>
                <View style={{ marginTop: 6 }}>
                    <Text style={{ color: "black" }}>Lecture: <Text style={{ fontWeight: "800" }}>{teacher.lecture}</Text></Text>
                </View>
            </View>
        )
    }

    const _renderTeacherItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ paddingLeft: 8, paddingRight: 8 }} activeOpacity={0.8} onPress={() => props.navigation.navigate("View", { view: "students", viewFrom: "principle", teacher: item })}>
                <TeacherItem teacher={item} />
            </TouchableOpacity>
        )
    }

    const getAllTeachers = () => {
        return props.reducer.teachers
    }

    return (
        <View style={styles.container}>
            <Header />
            {
                props.route.params.view == "homeworks" ? <View style={{ flex: 1, paddingLeft: 18, paddingRight: 18 }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                        <HatIcon width={24} height={24} fill={"#000"} />
                        <Text style={{ marginLeft: 14, color: "black", fontSize: 24, fontWeight: "600" }}>Homeworks</Text>
                    </View>

                    <FlatList
                        data={getTeacherHomeworks()}
                        renderItem={_renderHomeworkItem}
                        style={{ flex: 1 }}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<View style={{ marginTop: 8 }} />}
                        ListFooterComponent={<View style={{ marginBottom: 64 }} />}
                        ListEmptyComponent={<View>
                            <Text>No homework assigned</Text>
                        </View>}
                    />

                </View> : props.route.params.view == "students" ? <View style={{ flex: 1, paddingLeft: 18, paddingRight: 18, }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                        <PersonIcon width={24} height={24} fill={"#000"} />
                        <Text style={{ marginLeft: 14, color: "black", fontSize: 24, fontWeight: "600" }}>Students</Text>
                    </View>
                    <FlatList
                        data={getTeacherStudents()}
                        renderItem={_renderStudentItem}
                        style={{ flex: 1 }}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<View style={{ marginTop: 8 }} />}
                        ListFooterComponent={<View style={{ marginBottom: 64 }} />}
                        ListEmptyComponent={<View>
                            <Text>No students assigned</Text>
                        </View>}
                    />
                </View> : props.route.params.view == "teachers" && <View style={{ flex: 1, paddingLeft: 18, paddingRight: 18, }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                        <PersonIcon width={24} height={24} fill={"#000"} />
                        <Text style={{ marginLeft: 14, color: "black", fontSize: 24, fontWeight: "600" }}>Teachers</Text>
                        {
                            /*
                                <View style={{ flex: 1, paddingLeft: 16, }}>
                                    <Button
                                        text={"Add Teacher"}
                                        txtColor={"white"}
                                        icon={<AddIcon width={24} height={24} fill={"#fff"} style={{ transform: [{ rotate: '180deg' }] }} />}
                                        btnColor={"#22B2DA"}
                                        style={{ width: "100%" }}
                                        onPress={() => props.navigation.navigate("AddTeacher")}
                                    />
                                </View>
                            */
                        }

                    </View>
                    <FlatList
                        data={getAllTeachers()}
                        renderItem={_renderTeacherItem}
                        style={{ flex: 1 }}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<View style={{ marginTop: 8 }} />}
                        ListFooterComponent={<View style={{ marginBottom: 64 }} />}
                        ListEmptyComponent={<View>
                            <Text>No teachers found</Text>
                        </View>}
                    />
                </View>
            }

            <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 16, flexDirection: "row", justifyContent: "space-between" }}>
                <Button
                    text={"Back"}
                    txtColor={"white"}
                    icon={<ArrowIcon width={24} height={24} fill={"#fff"} style={{ transform: [{ rotate: '180deg' }] }} />}
                    btnColor={"#22B2DA"}
                    style={{ width: "100%" }}
                    onPress={() => props.navigation.goBack()}
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

export default connect(mapStateToProps)(ViewScreen);;
