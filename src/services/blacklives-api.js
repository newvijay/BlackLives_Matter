import tokenService from '../services/tokenService';
import Axios from "axios";
const BASE_URL = '/api/blacklives/';

    export function getAll() {
        return fetch(BASE_URL, {
            headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
        },{mode: "cors"})
        .then(res => res.json())
    }

     export async function createwithImg(blacklive) {
         const config = {
          headers: {
              'content-type': 'multipart/form-data','Authorization': 'Bearer ' + tokenService.getToken()
          },
      };
      let res = await Axios.post(BASE_URL,blacklive,config,{mode:"cors"})
         let data=res.data
         return data;

     }

    export function create(blacklive) {
        return fetch(BASE_URL, {
            method: "POST",
            headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + tokenService.getToken()},
            body: JSON.stringify(blacklive)
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

    export function edit2(blacklive) {
        return fetch(`${BASE_URL}${blacklive._id}`, {
            method: "PUT",
            headers: { 'Authorization': 'Bearer ' + tokenService.getToken()},
            body: blacklive
        },{mode: "cors"})
        .then(res => res.json());
    }

    //  export function edit(blacklive) {
    //     return fetch(`${BASE_URL}${blacklive._id}`, {
    //         method: "PUT",
    //         headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + tokenService.getToken()},
    //         body: blacklive
    //     },{mode: "cors"})
    //     .then(res => res.json());
    // }

    export async function edit(blacklive) {
         const config = {
          headers: {
              'Authorization': 'Bearer ' + tokenService.getToken()
          },
      };
      let res = await Axios.put(`${BASE_URL}${blacklive._id}`,blacklive,config,{mode:"cors"})
         let data=res.data;
        console.log(data)
         return data;
     }
