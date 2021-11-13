import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, useWindowDimensions } from 'react-native';
import { connect } from 'react-redux';
import pretty from 'pretty-ms';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// Classes
import API from '../../classes/api';

// Styles
import styles from './style';

// Icons
import LoginIcon from '../../icons/login.svg';
import LogoutIcon from '../../icons/logout.svg';
import ArrowRightIcon from '../../icons/arrow.svg';
import PersonIcon from '../../icons/person.svg';
import LectureIcon from '../../icons/school.svg';
import TimeIcon from '../../icons/time.svg';
import SubjectIcon from '../../icons/subject.svg';
import CalendarIcon from '../../icons/calendar.svg';
import AddIcon from '../../icons/add.svg';
import GroupIcon from '../../icons/group.svg';
import HatIcon from '../../icons/principle.svg';
import EyeIcon from '../../icons/eye.svg';
import ControlsIcon from '../../icons/controls.svg';
import PeopleIcon from '../../icons/people.svg';

import BottomImage from '../../images/bottom.png';

// Components
import Header from '../../components/header';
import Button from '../../components/button';

const PanelScreen = (props) => {

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    const [routes] = React.useState([
        { key: 'assigned', title: 'Assigned' },
        { key: 'completed', title: 'Completed' },
    ]);

    const getCompletedHomeworks = () => {
        const _completed = [];
        props.reducer.student_homeworks.map(element => {
            props.reducer.students.filter(el => el.id == props.reducer.loginAs.id)[0].completed_homework_ids.map(ele => {
                if (ele == element.id) {
                    _completed.push(element)
                };
            });
        })
        return _completed
    }

    const getHomeworks = () => {
        // Dont show completed homeworks here.
        const _homeworks = [];
        props.reducer.student_homeworks.map(element => {
            let thisCompleted = false;
            props.reducer.students.filter(el => el.id == props.reducer.loginAs.id)[0].completed_homework_ids.map(ele => {
                if (ele == element.id) thisCompleted = true;
            });
            if (!thisCompleted) {
                _homeworks.push(element);
            }
        })
        return _homeworks
    }

    useEffect(() => {

    }, [])

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

    const _renderHomeworkItem = ({ item, completed, key }) => {
        return (
            <TouchableOpacity
                style={{ paddingLeft: 8, paddingRight: 8 }}
                activeOpacity={0.8}
                onPress={() => props.navigation.navigate("ViewHomework", { item: item, student: true, completed: completed || false })}
                key={key}
            >
                <HomeworkItem homework={item} />
            </TouchableOpacity>
        )
    }

    const AssignedTab = () => {
        return (
            <FlatList
                data={getHomeworks()}
                renderItem={_renderHomeworkItem}
                style={{ flex: 1 }}
                keyExtractor={item => item.start_time}
                ListHeaderComponent={<View style={{ marginTop: 8 }} />}
                ListFooterComponent={<View style={{ marginBottom: 8 }} />}
                ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 24 }}>No homework assigned</Text>
                </View>}
            />
        )
    }

    const CompletedTab = () => {
        return (
            <FlatList
                data={getCompletedHomeworks()}
                renderItem={({ item }) => _renderHomeworkItem({ item: item, completed: true })}
                style={{ flex: 1 }}
                keyExtractor={item => item.id}
                ListHeaderComponent={<View style={{ marginTop: 8 }} />}
                ListFooterComponent={<View style={{ marginBottom: 8 }} />}
                ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 24 }}>No homework completed</Text>
                </View>}
            />
        )
    }

    const renderScene = SceneMap({
        assigned: AssignedTab,
        completed: CompletedTab,
    });

    const logOut = async () => {
        props.dispatch({ type: "SET_LOGIN_AS", payload: {} });
        props.dispatch({ type: "SET_LOCAL_LOGGED_IN", payload: {} });
        await props.navigation.removeListener('beforeRemove');
        await props.navigation.popToTop();
    }

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white', height: "100%", borderRadius: 8, elevation: 4 }}
            style={{ backgroundColor: '#E7E7E7', }}
            labelStyle={{ color: "black", fontWeight: "600" }}
        />
    );

    const _viewHomeworks = () => {
        props.navigation.navigate("View", { view: "homeworks" });
    }

    const _viewStudents = () => {
        props.navigation.navigate("View", { view: "students" });
    }

    useEffect(() => {
        props.navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <View style={{ paddingLeft: 18, paddingRight: 18 }}>
                    <View style={styles.titleWrapper}>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", paddingLeft: 18, paddingRight: 18, }}>
                            {
                                props.reducer.loginAs.avatar ? <View style={{ width: 48, height: 48, borderRadius: 64, marginRight: 12 }}>
                                    <Image source={{ uri: props.reducer.loginAs.avatar }} style={{ width: "100%", height: "100%", borderRadius: 32 }} />
                                </View> : <View style={{ width: 48, height: 48, borderRadius: 64, marginRight: 12, justifyContent: "center", alignItems: "center", backgroundColor: "#E9E9E9", overflow: "hidden" }}>
                                    <PersonIcon width={24} height={24} fill={"#000"} />
                                </View>
                            }
                            <View>
                                <Text style={styles.title}>Logged in as</Text>
                                <Text style={{ ...styles.title, fontWeight: "800" }}>{props.reducer.loginAs.name && props.reducer.loginAs.name.split(' ')[0]}</Text>
                                <View>
                                    {
                                        props.reducer.loginAs && <View style={{ flexDirection: "row", alignItems: "center", }}>
                                            <PersonIcon width={18} height={18} fill={"#000"} />
                                            <Text style={{ marginLeft: 8, color: "black" }}>
                                                {props.reducer.loginAs.student && "Student"}{props.reducer.loginAs.teacher && "Teacher"}{props.reducer.loginAs.principle && "Principle"} · {props.reducer.loginAs.class}{props.reducer.loginAs.teacher && <Text> · <HatIcon width={16} height={16} fill={"#000"} style={{ marginRight: 8 }} /></Text>}{props.reducer.loginAs.teacher && " " + props.reducer.loginAs.lecture}</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingLeft: 18, marginTop: 12 }}>
                            <Button
                                text={"Log out"}
                                txtColor={"white"}
                                icon={<LogoutIcon width={24} height={24} fill={"#fff"} />}
                                btnColor={"#22B2DA"}
                                style={{ height: 38, width: "40%" }}
                                onPress={() => logOut()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.trackHomework}>
                    {
                        props.reducer.loginAs.student && <View style={{ flex: 1, marginTop: 8, }}>
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={{ width: layout.width }}
                                indicatorStyle={{ backgroundColor: 'white' }}
                                renderTabBar={renderTabBar}
                            />
                        </View>
                    }
                    {
                        props.reducer.loginAs.teacher && <View style={{ flex: 1, paddingLeft: 24, paddingRight: 24, paddingTop: 8 }}>

                            <View style={{ marginBottom: 12, flexDirection: "row", alignItems: "center" }}>
                                <EyeIcon width={20} height={20} fill={"#000"} />
                                <Text style={styles.controlsTitle}>View</Text>
                            </View>
                            <Button
                                text={"Homeworks"}
                                txtColor={"white"}
                                icon={<HatIcon width={24} height={24} fill={"#fff"} />}
                                btnColor={"#22B2DA"}
                                style={{ height: 54, marginBottom: 16 }}
                                onPress={() => _viewHomeworks()}
                            />
                            <Button
                                text={"Students"}
                                txtColor={"white"}
                                icon={<PeopleIcon width={24} height={24} fill={"#fff"} />}
                                btnColor={"#22B2DA"}
                                style={{ height: 54 }}
                                onPress={() => _viewStudents()}
                            />
                            <View style={{ marginBottom: 12, marginTop: 12, flexDirection: "row", alignItems: "center" }}>
                                <ControlsIcon width={20} height={20} fill={"#000"} />
                                <Text style={styles.controlsTitle}>Controls</Text>
                            </View>
                            <Button
                                text={"Give homework"}
                                txtColor={"white"}
                                icon={<AddIcon width={24} height={24} fill={"#fff"} />}
                                btnColor={"#22B2DA"}
                                style={{ height: 54, marginBottom: 16 }}
                                onPress={() => props.navigation.navigate("Controls", { giveHomework: true })}
                            />
                            {
                                /*
                                <Button
                                    text={"Add/Delete students"}
                                    txtColor={"white"}
                                    icon={<GroupIcon width={24} height={24} fill={"#fff"} />}
                                    btnColor={"#22B2DA"}
                                    style={{ height: 54 }}
                                    onPress={() => _viewStudents()}
                                />
                                */
                            }
                        </View>
                    }
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

export default connect(mapStateToProps)(PanelScreen);;
