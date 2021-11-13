import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native';
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

import BottomImage from '../../images/bottom.png';

// Components
import Button from '../../components/button';
import Header from '../../components/header';

const ViewScreen = (props) => {

    const getTeacherHomeworks = () => {
        return props.reducer.homeworks.filter(element => {
            return element.teacher_id == props.reducer.loginAs.id && element
        })
    }

    const getTeacherStudents = () => {
        const students = [];
        const teacher = props.reducer.teachers.filter(element => element.id == props.reducer.loginAs.id);
        console.log("Teahcer: ", teacher[0]);
        teacher[0].students_id.map(student_id => {
            students.push(props.reducer.students.filter(element => element.id == student_id));
        })
        return students
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
                    <Text>Class: {student.class}</Text>
                </View>
            </View>
        )
    }


    const _renderStudentItem = ({ item }) => {


        if (item.length > 0) {

            console.log("item: ", item);
            return (
                <TouchableOpacity style={{ paddingLeft: 8, paddingRight: 8 }} activeOpacity={0.8}>
                    <StudentItem student={item[0]} />
                </TouchableOpacity>
            )
        }

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

                </View> : props.route.params.view == "students" && <View style={{ flex: 1, paddingLeft: 18, paddingRight: 18 }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                        <PersonIcon width={24} height={24} fill={"#000"} />
                        <Text style={{ marginLeft: 14, color: "black", fontSize: 24, fontWeight: "600" }}>Students</Text>
                    </View>
                    <FlatList
                        data={getTeacherStudents()}
                        renderItem={_renderStudentItem}
                        style={{ flex: 1 }}
                        keyExtractor={item => item.id + item.name}
                        ListHeaderComponent={<View style={{ marginTop: 8 }} />}
                        ListFooterComponent={<View style={{ marginBottom: 64 }} />}
                        ListEmptyComponent={<View>
                            <Text>No students assigned</Text>
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
