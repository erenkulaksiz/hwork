import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

// Styles
import styles from './style';

// Components
import Header from '../../components/header';

// Icons
import HatIcon from '../../icons/principle.svg';
import TickIcon from '../../icons/done.svg';

import BottomImage from '../../images/bottom.png';

const ReviewHomeworkScreen = (props) => {

    const getHomeworkPayload = () => {
        let returnthis = null
        props.reducer.homeworks.map(element => {
            if (element.assigned_id.length > 1) {
                element.assigned_id.map(el => {
                    props.reducer.students.map(ele => {
                        if (el == ele.id) {
                            returnthis = element;
                        }
                    })
                })
            } else {
                returnthis = props.reducer.students.filter(el => {
                    return el.id == element.assigned_id
                })[0];
            }
        })
        return returnthis
    }

    const getStudentPayload = () => {
        let returnthis = null;
        props.reducer.homeworks.map(element => {
            if (element.assigned_id.length > 1) {
                element.assigned_id.map(el => {
                    props.reducer.students.map((ele, indx) => {
                        if (el == ele.id) {
                            // Assigned match, now check if completed
                            ele.completed_homework_payloads.map(ell => {
                                if (ell.id == element.id) {
                                    if (ele.id == props.route.params.student.id) {
                                        returnthis = ell.payload;
                                    }
                                }
                            })
                        }
                    })
                })
            } else {
                returnthis = props.reducer.students.filter(el => {
                    return el.id == element.assigned_id
                })[0];
            }
        })
        return returnthis
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <View style={{ width: "100%", flexDirection: "row", height: 48 }}>
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                        <HatIcon width={24} height={24} fill={"#000"} />
                        <Text style={{ marginLeft: 14, color: "black", fontSize: 24, fontWeight: "600" }}>Reviewing Homework</Text>
                    </View>
                </View>
                <View style={{ width: "100%", marginTop: 16, }}>
                    <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Lecture</Text>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 24 }}>{getHomeworkPayload().lecture}</Text>
                </View>
                <View style={{ width: "100%", marginTop: 16, }}>
                    <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Title</Text>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 24 }}>{getHomeworkPayload().title}</Text>
                </View>
                <View style={{ width: "100%", marginTop: 16, }}>
                    <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Description</Text>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 18 }}>{getHomeworkPayload().desc}</Text>
                </View>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={{ width: "50%", marginTop: 16, }}>
                        <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Start Time</Text>
                        <Text style={{ color: "black", fontWeight: "800", fontSize: 16 }}>{moment(getHomeworkPayload().start_time).format('HH:mm - DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{ width: "50%", marginTop: 16, }}>
                        <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>End Time</Text>
                        <Text style={{ color: "black", fontWeight: "800", fontSize: 16 }}>{moment(getHomeworkPayload().end_time).format('HH:mm - DD/MM/YYYY')}</Text>
                    </View>
                </View>
                <View style={{ width: "100%", marginTop: 16, }}>
                    <Text style={{ color: "#4D4D4D", fontWeight: "400", fontSize: 16 }}>Solution by <Text style={{ color: "black", fontSize: 16, fontWeight: "800" }}>{props.route.params.student.name}</Text></Text>
                    <TouchableOpacity onPress={() => Linking.openURL(getStudentPayload())}>
                        <Text style={{ color: "black", fontWeight: "800", fontSize: 18 }}>{getStudentPayload()}</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps)(ReviewHomeworkScreen);
