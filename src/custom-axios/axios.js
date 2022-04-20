import axios from "axios";

const instance = axios.create({
    baseURL: 'https://back-end196056.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;
