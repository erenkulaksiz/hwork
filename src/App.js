import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// Utils
import store from './store';
import API from './classes/api';

// Screens
import LoginScreen from './screens/login';
import SelectiveLoginScreen from './screens/selectivelogin';

const persistor = persistStore(store);
const Stack = createStackNavigator();

const App = () => {

    useEffect(() => {
        StatusBar.setBackgroundColor("#22B2DA");
        API.getAllStudents().then(response => {
            store.dispatch({ type: "SET_STUDENTS", payload: response });
            SplashScreen.hide();
        }).catch(err => console.error(err));
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
                        <Stack.Screen
                            name="SelectiveLogin"
                            component={SelectiveLoginScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider >
    );
};

export default App;
