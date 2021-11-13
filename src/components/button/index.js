import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './style';

const Button = ({ icon, text, btnColor = "#1CC794", txtColor = "#fff", onPress, style, isLoading = false }) => {

    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.container, backgroundColor: btnColor, ...style, overflow: "hidden" }} activeOpacity={0.60}>
            <View style={styles.content}>
                {icon}
                <Text style={{ ...styles.text, color: txtColor, marginLeft: icon ? 8 : 0, }}>{text}</Text>
            </View>
            {
                isLoading && <View style={styles.loadingContainer}>
                    <View style={{ zIndex: 2 }}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                    <View style={styles.loadingOverlay} />
                </View>
            }
        </TouchableOpacity>
    )
}

export default Button