import { getToken } from "./auth.js";


export const request = async (url, method = 'GET', body = {}) => {
    if (!url) throw new Error('Missing URL');

    const token = getToken();
    const hasBody = method !== 'GET' && body && Object.keys(body).length > 0;

    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(token?.accessToken ? { Authorization: `Bearer ${token.accessToken}` } : {})
        },
        ...(hasBody ? { body: JSON.stringify(body) } : {})
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
            const error = new Error(result.error || 'Request failed');
            error.status = response.status;
            throw error;
        }
        
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}