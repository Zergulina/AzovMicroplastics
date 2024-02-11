export const get = async (url, params) => {
    const response = await fetch(url + '?' + new URLSearchParams(params))
    const data = await response.json()

    return data
}

export const post = async (url, params) => {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    const data = await response.json()

    return data
}