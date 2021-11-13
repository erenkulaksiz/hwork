import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import _ from 'lodash';

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
    homework_select_all: false,
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
            const getStudentHomeworks = [];

            if (state.loginAs.student) {
                action.payload.map(el => {
                    if (el.assigned_id.length > 1) {
                        //array
                        el.assigned_id.map(element => {
                            if (element == state.loginAs.id) {
                                getStudentHomeworks.push(el);
                            }
                        })
                    } else {
                        if (el.assigned_id == state.loginAs.id) {
                            getStudentHomeworks.push(el);
                        }
                    }
                });
                console.log("Homeworks: ", getStudentHomeworks);
            }


            return {
                ...state,
                homeworks: action.payload,
                student_homeworks: [...getStudentHomeworks],
            }

        case 'SET_ALL_TEACHERS':
            console.log("all teachers has been set");
            return {
                ...state,
                teachers: action.payload,
            }

        case 'SELECT_STUDENT_INDEX':

            /*
                const arrIndex = _.findIndex(state.students, (e) => {
                    return e.id == action.payload.id;
                }, 0);*/

            console.log("index: ", action.payload);

            state.students[action.payload] = { ...state.students[action.payload], selected: state.students[action.payload].selected == true ? false : true };

            return {
                ...state,
            }

        case 'SELECT_ALL':

            state.homework_select_all = !state.homework_select_all;

            return {
                ...state,
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