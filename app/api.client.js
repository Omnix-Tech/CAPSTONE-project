import axios from 'axios'


// const API_BASE_URL = 'http://localhost:8000'
// const API_BASE_URL = 'http://10.0.2.2:8000'
const API_BASE_URL = 'http://192.168.100.9:8000'


export default () => {
    return axios.create({
        baseURL: API_BASE_URL
    })
}