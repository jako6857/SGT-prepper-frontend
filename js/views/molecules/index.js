import { cookieBanner } from '../../controllers/cookieBannerController.js';
import { Heading, Link, Ul, Li, Paragraph, Label, Div, Input } from '../atoms/index.js';

export const HeaderView = () => {
    const element = document.createElement('header')
    element.className = 'bg-slate-800 px-6 py-4 text-white flex items-center justify-between shadow-lg'
    
    const h1 = Heading('Sgt. Prepper', 1, 'text-2xl font-bold hover:text-slate-200 transition-colors')
    element.append(h1)

    const navActions = Div('flex items-center space-x-4')

    const loginWrapper = Paragraph()
    const loginLink = Link(
        './index.htm#/login', 
        'Login', 
        'inline-flex items-center px-4 py-2 rounded-lg border border-slate-400 bg-slate-700 hover:bg-slate-600 transition-colors duration-200 text-sm font-medium'
    )
    loginWrapper.append(loginLink)

    const cartWrapper = Paragraph()
    const cartLink = Link(
        './index.htm#/cart', 
        'Se Kurv', 
        'inline-flex items-center px-4 py-2 rounded-lg border border-slate-400 bg-slate-700 hover:bg-slate-600 transition-colors duration-200 text-sm font-medium'
    )
    cartWrapper.append(cartLink)

    navActions.append(loginWrapper, cartWrapper)
    element.append(navActions)

    return element
}

export const NavBarView = arrNavItems => {
    const element = document.createElement('nav')
    const ul = Ul('flex bg-slate-700 px-6 shadow-md overflow-x-auto')

    arrNavItems.forEach(item => {
        const { url, title, textColor } = item
        const li = Li('flex-shrink-0')
        const link = Link(
            url, 
            title,
            `block px-4 py-3 ${textColor} hover:bg-slate-600 transition-colors duration-200`
        )
        li.append(link)
        ul.append(li)
    })

    element.append(ul)
    return element
}

export const MainView = (title, content) => {
    const element = document.createElement('main')
    element.className = "p-6 min-h-screen bg-gray-50"
    const h1 = Heading(title, 1, 'text-3xl font-bold text-gray-900 mb-6')
    element.append(h1, content)
    element.append(cookieBanner())
    return element
}

export const FooterView = (bgPath = './css/img/Footer.png') => {
    const footer = document.createElement('footer')
    footer.className = 'relative w-full bg-slate-800 text-white'

    const img = document.createElement('img')
    img.src = bgPath
    img.alt = 'Footer'
    img.title = 'Footer'
    img.className = 'w-full h-auto object-cover'

    footer.append(img)
    return footer
}

export const FormGroup = (title, name, placeholder, type, value) => {
    const element = Div('mb-4')
    const label = Label(
        title, 
        name, 
        'block mb-2 text-sm font-medium text-gray-700'
    )
    const input = Input(
        name, 
        placeholder, 
        type, 
        value, 
        'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    )
    element.append(label, input)
    return element
}



