import { Div, Button } from "../atoms/index.js";


export const cookieBannerView = () => {
    const overLay = Div('fixed inset-0 z-[9998] bg-black/50 flex items-end md:items-center md:justify-center')
    overLay.id = 'cookie-overlay'
    overLay.setAttribute('aria-hidden', 'false')

    const banner = Div('w-full md:max-w-[720px] bg-white p-4 rounded-t-lg md:rounded-lg shadow-lg')
    banner.id = 'cookie-banner'
    banner.role = 'dialog'
    banner.setAttribute('aria-modal', 'true')
    banner.setAttribute('aria-live', 'polite')
    banner.tabIndex = -1

    const wrap = Div('flex flex-col md:flex-row md:items-center md:justify-between gap-4')
    const text = Div('text-sm md:text-base')
    text.innerText = "Vi bruger cookies for at forbedre din oplevelse på vores hjemmeside. Ved at fortsætte med at bruge siden accepterer du vores brug af cookies."

    const btns = Div('flex gap-2')

    const acceptAll = Button('Accepter alle', 'button', 'px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700')
    acceptAll.id = 'cookie-acceptall'
    btns.append(acceptAll)

    const rejectAll = Button('Afvis alle', 'button', 'px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700')
    rejectAll.id = 'cookie-rejectall'
    btns.append(rejectAll)

    wrap.append(text, btns)
    banner.append(wrap)
    overLay.append(banner)
    return overLay
}