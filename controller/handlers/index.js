const axios = require('axios')
const uri = process.env.NEXT_PUBLIC_ORIGIN
const server = () => axios.create({ baseURL: uri })

const Post = async (url, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                data.error ? reject(new Error(data.error)) : resolve(data)
            })
            .catch(err => {
                console.log(err)
                reject(new Error('Network Error'))
            })
    })
}

const Get = async (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            data.error ? reject(new Error(data.error)) : resolve(data)
        })
        .catch(error => {
            console.log(error)
            reject(new Error('Network Error'))
        })  
    })
}

const Remove = async (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                data.error ? reject(new Error(data.error)) : resolve(data)
            })
            .catch(err => {
                console.log(err)
                reject(new Error('Network Error'))
            })
    })
}


const useRequestHandlers = () => ({ Post, Remove, Get, server })


export default useRequestHandlers;