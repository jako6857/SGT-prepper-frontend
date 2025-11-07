import { request } from '../services/fetch.js'
import { setSessionItem } from '../services/auth.js';



export const Authenticate = async (username, password) => {
try {
    const url =`http://localhost:4000/api/auth/login`
    const data = await request(url, 'POST', { username, password })
    return data
} catch (error) {
    console.error(error)
}
}