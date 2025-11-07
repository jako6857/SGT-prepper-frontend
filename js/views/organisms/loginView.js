import { Form, Button, Paragraph, Div } from '../atoms/index.js';
import { FormGroup } from '../molecules/index.js';
import { clearToken } from '../../services/auth.js';

export const LoginFormView = () => {
    const form = Form('POST')
    form.className = 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'

    const heading = document.createElement('h2')
    heading.className = 'text-2xl font-bold mb-6 text-center'
    heading.textContent = 'Log ind'
    
    const username = FormGroup('Brugernavn', 'username', 'Indtast brugernavn', 'text')
    username.className = 'mb-4'
    
    const password = FormGroup('Adgangskode', 'password', 'Indtast din adgangskode', 'password')
    password.className = 'mb-6'
    
    const button = Button(
        'Log ind',  
        'submit', 
        'w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
    )
    
    form.append(heading, username, password, button)
    return form
}

export const UserInfoView = (user) => {
    const wrapper = Div('max-w-md mx-auto p-6 bg-white rounded-lg shadow-md')
    
    const element = Paragraph('text-lg mb-4')
    element.innerText = `Velkommen ${user.firstname} ${user.lastname}`
    
    const button = Button(
        'Log ud', 
        'button',
        'w-full bg-red-600 text-white py-2 rounded hover:bg-red-700'
    )
    
    button.addEventListener('click', () => {
        clearToken()
    })
    
    wrapper.append(element, button)
    return wrapper
}