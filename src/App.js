import React, { useEffect } from 'react';
import { StatusBar, LogBox } from 'react-native';
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
import ViewScreen from './screens/view';
import ViewHomeworkScreen from './screens/viewHomework';
import CompleteHomeworkScreen from './screens/completeHomework'
import ReviewHomeworkScreen from './screens/reviewHomework';
import AddTeacherScreen from './screens/addTeacher';

const persistor = persistStore(store);
const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef()

const App = (props) => {

    useEffect(() => {
        LogBox.ignoreAllLogs();
        StatusBar.setBackgroundColor("#22B2DA");
        API.getAllStudents().then(students => {
            store.dispatch({ type: "SET_STUDENTS", payload: students });
            API.getAllHomeworks().then(homeworks => {
                store.dispatch({ type: "SET_ALL_HOMEWORKS", payload: homeworks });
                API.getAllTeachers().then(teachers => {
                    store.dispatch({ type: "SET_ALL_TEACHERS", payload: teachers });
                    API.getAllPrinciple().then(principle => {
                        store.dispatch({ type: "SET_ALL_PRINCIPLE", payload: principle });
                        SplashScreen.hide();
                    })
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
                        <Stack.Screen
                            name="View"
                            component={ViewScreen}
                        />
                        <Stack.Screen
                            name="ViewHomework"
                            component={ViewHomeworkScreen}
                        />
                        <Stack.Screen
                            name="CompleteHomework"
                            component={CompleteHomeworkScreen}
                        />
                        <Stack.Screen
                            name="ReviewHomework"
                            component={ReviewHomeworkScreen}
                        />
                        <Stack.Screen
                            name="AddTeacher"
                            component={AddTeacherScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider >
    );
};

export default App;
