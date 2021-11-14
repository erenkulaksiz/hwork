import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';

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

const AddTeacherScreen = (props) => {

    useEffect(() => {
        //console.log("aaaaa", getTeacherStudents());
    }, []);

    return (
        <View style={styles.container}>
            <Header />
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

export default connect(mapStateToProps)(AddTeacherScreen);
