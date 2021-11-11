import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './style';

import HeaderImage from '../../images/header.png'

const Header = () => {
    return (
        <View style={styles.container}>
            <Image source={HeaderImage} style={styles.header} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>HWork</Text>
            </View>
        </View>
    );
};

export default Header;
