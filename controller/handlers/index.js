const axios = require('axios')
const API_URI = process.env.NEXT_PUBLIC_ORIGIN


const server = () => axios.create({ baseURL: API_URI })

const registerUser = async (data) => {
    const response = await server().post('/api/registerUser', data).catch(error => { throw error })

    if (response) {
        const data = response.data
        return data
    }

    throw new Error('Network Error')
}

const verifyUser = async () => {
    const response = await server().post('/verifyUser', {}).catch(error => { throw error })

    if (response) {
        const data = response.data
        return data
    }
    throw new Error('Network Error')
}


const getLocations = async (location) => {
    const coordinates = location.coords
    const response = await server().post('/api/getLocations', {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
    })

        .catch(error => { throw error })

    if (response) {
        const data = response.data
        return data
    }
    throw new Error('Network Error')

}


const registerUserLocation = async (data) => {
    const response = await server().post('/api/registerUserLocation', data).catch(error => { throw error })

    if (response) {
        const data = response.data
        console.log(data)
        return data
    }
    throw new Error('Network Error')
}


const createPost = async (data) => {

    const response = await server().post('/api/createPost', data).catch(error => { throw error })

    if (response) {
        const data = await response.data
        return data
    }
    throw new Error('Network Error')
}









module.exports = {
    registerUser, verifyUser, getLocations, registerUserLocation, createPost
}