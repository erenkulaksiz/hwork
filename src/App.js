import React, { useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import store from './store';
import API from './classes/api';

import LoginScreen from './screens/login';

const persistor = persistStore(store);
const Stack = createStackNavigator();

const App = () => {

    useEffect(() => {
        StatusBar.setBackgroundColor("#22B2DA");
        SplashScreen.hide();

        API.getStudentById({ id: 1 }).then(response => {
            console.log("aaaa -> ", response);
        })
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            ...TransitionPresets.SlideFromRightIOS,
                            headerShown: false,
                            gestureEnabled: true,
                        }}>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default App;
