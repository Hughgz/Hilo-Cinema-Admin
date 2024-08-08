import axios from 'axios';

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        method,
        url: `https://localhost:5000/${endpoint}`,
        data: body
    }).catch(err => {
        console.error(err);
        throw err; 
    });
}