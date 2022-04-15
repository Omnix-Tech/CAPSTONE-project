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


const getLocations = async (position) => {
    const response = await server().post('/api/getLocations', { longitude: position.longitude, latitude: position.latitude }).catch(error => { throw error })

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


const deleteUserLocation = async (data) => {
    const response = await server().post('/api/deleteUserLocation', data).catch(error => { throw error })

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

const likePost = async (data) => {
    const response = await server().post('/api/likePost', data).catch( error => { throw error })
    if (response) {
        const data = await response.data
        return data
    }

    throw new Error('Network Error')
}

const unlikePost = async (data) => {
    const response = await server().post('/api/unlikePost', data).catch( error => { throw error })
    if (response) {
        const data = await response.data
        return data
    }

    throw new Error('Network Error')
}

const createResponse = async (data) => {
    const response = await server().post('/api/createResponse', data).catch( error => { throw error })
    if (response) {
        const data = await response.data
        return data
    }

    throw new Error('Network Error')
}










module.exports = {
    registerUser, verifyUser, getLocations, registerUserLocation, createPost, likePost, unlikePost, createResponse, deleteUserLocation
}