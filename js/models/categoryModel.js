import { request } from "../services/fetch.js";

export const getList = async () => {
    const url = 'http://localhost:4000/api/categories'
    const data = await request (url)
    return data
}