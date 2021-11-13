import React from 'react';
import Config from 'react-native-config';

const API = {
    getStudentById({ id }) {
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/students/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => resolve(response.json()));
        });
    },
    getAllStudents() {
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/students', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => resolve(response.json()));
        });
    },
    getAllHomeworks() {
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/homeworks', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => resolve(response.json()));
        });
    },
    getAllTeachers() {
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/teachers', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => resolve(response.json()));
        });
    },
    sendHomework({ homework }) {
        console.log("homework: ", homework);
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/homeworks', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...homework })
            }).then(response => resolve(response.json()));
        });
    }
}

export default API;
