const axios = require('axios')
const uri = process.env.NEXT_PUBLIC_ORIGIN
const server = () => axios.create({ baseURL: uri })


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
    const response = await server().post('/api/likePost', data).catch(error => { throw error })
    if (response) {
        const data = await response.data
        return data
    }

    throw new Error('Network Error')
}

const unlikePost = async (data) => {
    const response = await server().post('/api/unlikePost', data).catch(error => { throw error })
    if (response) {
        const data = await response.data
        return data
    }

    throw new Error('Network Error')
}

const createResponse = async (data) => {
    const response = await server().post('/api/createResponse', data).catch(error => { throw error })
    if (response) {
        const data = await response.data
        return data
    }

    throw new Error('Network Error')
}


const createForum = async (data) => {
    const response = await server().post('/api/createForum', data).catch(error => { throw error })
    if (response) {
        const data = await response.data
        return data
    }

    throw new Error('Network Error')
}



const deleteResponse = async ({ response_id }) => {
    const response = await server().post('/api/deleteResponse', { response_id })
        .catch(error => { throw error })

    if (response) {
        return await response.data
    }

    throw new Error('Network Error')
}


const joinForum = async ({ forum, user }) => {
    const response = await server().post('/api/joinForum', { forum, user })
        .catch(error => { throw error })

    if (response) {
        return await response.data
    }

    throw new Error('Network Error')
}

const useAPIs = () => ({ server, joinForum, deleteResponse, createForum, registerUser, getLocations, registerUserLocation, createPost, likePost, unlikePost, createResponse, deleteUserLocation })


export default useAPIs;