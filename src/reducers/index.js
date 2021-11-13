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
    teachers: [],
    homeworks: [],
    student_homeworks: [],
    loginInputs: {
        idInput: "",
        nameInput: "",
    },
    loginAs: {}
};

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_STUDENTS':
            console.log("set students");
            return {
                ...state,
                students: [...action.payload],
            }

        case 'SET_LOGIN_INPUTS':
            console.log("set id login input", action.payload);
            return {
                ...state,
                loginInputs: {
                    ...state.loginInputs,
                    ...action.payload,
                },
            }

        case 'SET_LOGIN_AS':
            console.log("user logged in! id: ", action.payload.id, " name: ", action.payload.name);
            return {
                ...state,
                loginAs: { ...action.payload }
            }

        case 'SET_ALL_HOMEWORKS':
            console.log("all homeworks has been set!");

            // Get user id then set his homeworks simulating backend
            const student_homeworks = (state.loginAs.student == true && (state.loginAs.name ? action.payload.filter(element => element.assigned_id == state.loginAs.id) : []));
            console.log("Student homeworks: ", student_homeworks);

            return {
                ...state,
                homeworks: action.payload,
                student_homeworks: student_homeworks,
            }

        case 'SET_ALL_TEACHERS':
            console.log("all teachers has been set");
            return {
                ...state,
                teachers: action.payload,
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