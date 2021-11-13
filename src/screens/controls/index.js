import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

// Classes
import API from '../../classes/api';

// Styles
import styles from './style';

// Icons
import LogoutIcon from '../../icons/logout.svg';
import PeopleIcon from '../../icons/people.svg';
import ArrowIcon from '../../icons/arrow.svg';
import TickIcon from '../../icons/done.svg';

import BottomImage from '../../images/bottom.png';

// Components
import Button from '../../components/button';
import Header from '../../components/header';

const ControlsScreen = (props) => {

    const getTeacherStudents = () => {
        const students = [];
        const teacher = props.reducer.teachers.filter(element => element.id == props.reducer.loginAs.id);
        console.log("Teahcer: ", teacher[0]);
        teacher[0].students_id.map(student_id => {
            students.push(props.reducer.students.filter(element => element.id == student_id)[0]);
        })
        console.log("Students: ", students);
        return students
    }

    const StudentItem = ({ student }) => {

        const studentSelected = student.selected == true || props.reducer.homework_select_all;

        return (
            <View style={{ width: "100%", height: 100, padding: 12 }}>
                <View style={{ width: "100%", height: "50%", alignItems: "center", flexDirection: "row" }}>
                    <View style={{ width: 40, height: 40 }}>
                        <Image source={{ uri: student.avatar }} style={{ width: "100%", height: "100%", borderRadius: 32 }} />
                    </View>
                    <Text style={{ color: "black", marginLeft: 8, fontSize: 20, fontWeight: "600" }}>{student.name}</Text>
                    <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                        <View style={{ width: 40, height: 40, borderRadius: 64, borderWidth: 2, borderColor: studentSelected ? "green" : "#939393", justifyContent: "center", alignItems: "center" }}>
                            {
                                studentSelected && <TickIcon width={28} height={28} fill={"green"} />
                            }
                        </View>
                    </View>
                </View>
                <View style={{ width: "100%", height: "50%", justifyContent: "center" }}>
                    <Text>Class: {student.class}</Text>
                    <Text>ID: {student.id}</Text>
                </View>
            </View>
        )
    }

    const selectStudent = ({ item }) => {
        props.dispatch({ type: "SELECT_STUDENT_INDEX", payload: item });
    }

    const _renderStudentItem = (item, index) => {
        return (
            <TouchableOpacity
                style={{ marginLeft: 16, marginRight: 16, marginBottom: 8, elevation: 8, backgroundColor: "white", borderRadius: 8 }}
                activeOpacity={0.70}
                onPress={() => { }/*selectStudent({ item: index })*/}
                key={item.key}
            >
                <StudentItem student={item} />
            </TouchableOpacity>
        )
    }

    const _selectAll = () => {
        props.dispatch({ type: "SELECT_ALL" });
    }

    const _giveHomework = () => {
        props.navigation.navigate("GiveHomework");
    }

    return (
        <View style={styles.container}>
            <Header />
            {
                props.route.params.giveHomework == true && <View style={{ flex: 1 }}>
                    <View style={{ width: "100%", height: 64, alignItems: "center", flexDirection: "row", paddingLeft: 18, paddingRight: 18 }}>
                        <PeopleIcon width={28} height={28} fill={"#000"} />
                        <Text style={{ color: "black", fontSize: 24, marginLeft: 8 }}>Students</Text>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                            <Button
                                text={props.reducer.homework_select_all ? "Unselect All" : "Select All"}
                                txtColor={"white"}
                                btnColor={"#22B2DA"}
                                onPress={() => _selectAll()}
                                style={{ width: 100 }}
                            />
                        </View>
                    </View>
                    <FlatList
                        data={getTeacherStudents()}
                        renderItem={({ item, index }) => _renderStudentItem(item, index)}
                        style={{ flex: 1 }}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<View style={{ marginTop: 8 }} />}
                        ListFooterComponent={<View style={{ marginBottom: "20%" }} />}
                    />
                </View>
            }
            <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 16, flexDirection: "row", justifyContent: "space-between" }}>
                <Button
                    text={"Back"}
                    txtColor={"white"}
                    icon={<ArrowIcon width={24} height={24} fill={"#fff"} style={{ transform: [{ rotate: '180deg' }] }} />}
                    btnColor={"#22B2DA"}
                    style={{ width: props.reducer.homework_select_all ? "48%" : "100%" }}
                    onPress={() => props.navigation.goBack()}
                />
                {
                    props.reducer.homework_select_all && <Button
                        text={"Give Homework"}
                        txtColor={"white"}
                        icon={<TickIcon width={24} height={24} fill={"#fff"} />}
                        btnColor={"#22B2DA"}
                        style={{ width: "48%" }}
                        onPress={() => _giveHomework()}
                    />
                }

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

export default connect(mapStateToProps)(ControlsScreen);;
