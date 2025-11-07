import { cookieBannerView } from "../views/organisms/cookieBannerView.js";

export const cookieBanner = () => {
    const KEY = 'cookieConsent'
    
    // Use sessionStorage instead of localStorage
    const getConsent = () => {
        try {
            return JSON.parse(sessionStorage.getItem(KEY))
        } catch {
            return null
        }
    }
    
    const setConsent = (consent) => {
        sessionStorage.setItem(KEY, JSON.stringify(consent))
    }

    // Check if consent already exists in session
    const saved = getConsent()
    const banner = cookieBannerView()

    // If consent exists, hide banner immediately
    if (saved) {
        banner.style.display = 'none'
    } else {
        banner.style.display = 'block'
    }

    const all = banner.querySelector('#cookie-acceptall')
    const some = banner.querySelector('#cookie-rejectall')

    all.addEventListener('click', () => {
        setConsent({ accepted: true, timestamp: Date.now() })
        banner.style.display = 'none'
    })

    some.addEventListener('click', () => {
        setConsent({ accepted: false, timestamp: Date.now() })
        banner.style.display = 'none'
    })

    return banner
}