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
    }
}

export default API;
