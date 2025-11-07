import {request} from "../services/fetch.js";

export const getList = async (category) => {
    const url = `http://localhost:4000/api/products/${category}`
    const data = await request (url)
    return data
}

export const getDetails = async (product) => {
    const url = `http://localhost:4000/api/products/byId/${product}`
    const data = await request (url)
    return data
}