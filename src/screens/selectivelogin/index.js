import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

// Styles
import styles from './style';

// Icons
import LoginIcon from '../../icons/login.svg';
import BottomImage from '../../images/bottom.png';

// Components
import Button from '../../components/button';
import Header from '../../components/header';

const SelectiveLoginScreen = (props) => {

    // props.route.params.screen
    // props.route.params.action

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.titleWrapper} />

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
