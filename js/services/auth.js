export const setSessionItem = (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value))
}

export const getSessionItem = (name) => {
    try {
        const value = sessionStorage.getItem(name)
        return value ? JSON.parse(value) : null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const deleteSessionItem = (name) => {
    sessionStorage.removeItem(name)
}

export const getToken = () => {
    return getSessionItem('sgtprepper_token')
}

export const setToken = token => {
    setSessionItem('sgtprepper_token', token)
}

export const clearToken = () => {
    deleteSessionItem('sgtprepper_token')
    location.reload()
}

export const isTokenExpired = accessToken => {
    if(!accessToken) return true

    try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]))
        
        if(payload.exp && payload.exp * 1000 < Date.now()) {
            console.log(`Token expired: ${new Date(payload.exp * 1000)}`)
            
            return true
        }
        return false
    } catch (error) {
        console.error(error)
    }
}

export const isLoggedIn = () => {
    const token = getToken()

    if(!token?.accessToken) {
        return false
    }
    
    if(isTokenExpired(token.accessToken)) {
        clearToken()
        return false
    }
    return true
}