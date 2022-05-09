const axios = require('axios')
const uri = process.env.NEXT_PUBLIC_ORIGIN
const server = () => axios.create({ baseURL: uri })


const Post = async (url, data) => {
    return new Promise((resolve, reject) => {
        server()
            .post(url, data)
            .then(res => {
                const { data } = res
                data.error ? reject(new Error(data.error)) : resolve(data)
            })
            .catch(error => {
                console.log(error)
                reject(new Error('Network Error'))
            })
    })
}

const Get = async (url) => {
    return new Promise((resolve, reject) => {
        server()
            .get(url)
            .then(res => {
                const { data } = res
                data.error ? reject(data.error) : resolve(data)
            })
            .catch(error => {
                console.log(error)
                reject('Network Error')
            })
    })
}

const Remove = async (url, data) => {
    return new Promise((resolve, reject) => {
        server()
            .delete(url, data)
            .then(res => {
                const { data } = res
                data.error ? reject(data.error) : resolve(data)
            })
            .catch(error => {
                console.log(error)
                reject('Network Error')
            })
    })
}


const useRequestHandlers = () => ({ Post, Remove, Get, server })


export default useRequestHandlers;