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
    eren: 1,
};

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INC_EREN':
            console.log("set eren ", state.eren + action.payload);
            return {
                ...state,
                eren: state.eren + action.payload
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