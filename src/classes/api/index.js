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
    },
    removeHomework({ homework }) {
        console.log("removing homework: ", homework);
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/homeworks/' + homework.id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(response => resolve(response.json()));
        });
    },
    completeHomework({ student }) {
        console.log("student: ", student);
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/students/' + student.id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...student })
            }).then(response => resolve(response.json()));
        });
    },
    registerStudent({ name, studentclass, completed_homework_ids, completed_homework_payloads }) {
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/students/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    class: studentclass,
                    completed_homework_ids: completed_homework_ids,
                    completed_homework_payloads: completed_homework_payloads,
                    student: true,
                })
            }).then(response => resolve(response.json()));
        });
    },
    updateTeachers({ teacher }) {
        console.log("UpdateTeachers with param: ", teacher)
        return new Promise((resolve, reject) => {
            fetch(Config.API_ROUTE + '/teachers/' + teacher.id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...teacher })
            }).then(response => resolve(response.json()));
        });
    },
}

export default API;
