import tokenService from '../services/tokenService';
const BASE_URL = '/api/comments/';

    export function getAll() {
        return fetch(BASE_URL, {
            headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
        },{mode: "cors"})
        .then(res => res.json())
    }

    export function create(comment) {
        return fetch(BASE_URL, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
            body: JSON.stringify(comment)
        }, {mode: "cors"})
        .then(res => res.json());
    }

    export function deleteOne(id) {
        return fetch(`${BASE_URL}${id}`, {
            method: "DELETE",
            headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
        },{mode: "cors"})
        .then(res => res.json());
    }

    export function edit(comment) {
        return fetch(`${BASE_URL}${comment._id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
            body: JSON.stringify(comment)
        },{mode: "cors"})
        .then(res => res.json());
    }
