import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';

// Reducers
import local from './local';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['local']
};

const INITIAL_STATE = {
    students: [],
};

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_STUDENTS':
            console.log("set students");
            return {
                ...state,
                students: [...action.payload],
            }

        default:
            return state
    }
};

const reducers = {
    mainReducer,
    local,
}

export default persistCombineReducers(persistConfig, reducers)