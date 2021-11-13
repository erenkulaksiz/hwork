import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Utils
import store from './store';
import API from './classes/api';

// Screens
import LoginScreen from './screens/login';
import SelectiveLoginScreen from './screens/selectivelogin';
import PanelScreen from './screens/panel';
import ControlsScreen from './screens/controls';
import GiveHomeworkScreen from './screens/giveHomework';

const persistor = persistStore(store);
const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef()

const App = (props) => {

    useEffect(() => {
        StatusBar.setBackgroundColor("#22B2DA");
        API.getAllStudents().then(response => {
            store.dispatch({ type: "SET_STUDENTS", payload: response });
            API.getAllHomeworks().then(response => {
                store.dispatch({ type: "SET_ALL_HOMEWORKS", payload: response });
                API.getAllTeachers().then(response => {
                    store.dispatch({ type: "SET_ALL_TEACHERS", payload: response });
                    SplashScreen.hide();
                });
            });
            if (store.getState().local.loggedIn.name) {
                store.dispatch({ type: "SET_LOGIN_AS", payload: store.getState().local.loggedIn });
                navigationRef.navigate('Panel');
            }
        }).catch(err => console.error(err));

    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer ref={navigationRef}>
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
                        <Stack.Screen
                            name="SelectiveLogin"
                            component={SelectiveLoginScreen}
                        />
                        <Stack.Screen
                            name="Panel"
                            component={PanelScreen}
                            options={{
                                ...TransitionPresets.SlideFromRightIOS,
                                headerShown: false,
                                gestureEnabled: false,
                            }}
                        />
                        <Stack.Screen
                            name="Controls"
                            component={ControlsScreen}
                        />
                        <Stack.Screen
                            name="GiveHomework"
                            component={GiveHomeworkScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider >
    );
};

export default App;
