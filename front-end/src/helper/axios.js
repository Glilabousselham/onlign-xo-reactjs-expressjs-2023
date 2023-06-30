import originAxios from 'axios'



const axios = originAxios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `${window.localStorage.getItem('token', "")}`
    }
})

export default axios;   