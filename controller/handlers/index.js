

export const Post = async (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
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

export const Get = async (url) => {
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

export const Remove = async (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
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
