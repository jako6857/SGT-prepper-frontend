import { LoginFormView, UserInfoView } from "../views/organisms/loginView.js";
import { getToken, setToken } from "../services/auth.js";
import { Layout } from "./layoutController.js";
import { Authenticate } from "../models/loginModel.js";

export const LoginPage = () => {
    if(getToken()) {
        const token = getToken()
        const html = UserInfoView(token.user)
        return Layout('Din side', html)

    } else {
        const element = LoginFormView()
        element.addEventListener('submit', (e) => {
        handleLogin(e)
    })
      return Layout('login', element) 
    }}

export const handleLogin = async (e) => {
    e.preventDefault()
    console.log('Handling login...')
    const form = e.currentTarget
    const username = form.username.value.trim()
    const password = form.password.value.trim()

    if (username && password) {
        const data = await Authenticate(username, password)

        if(data.accessToken) {
            setToken(data)
            location.href = './index.htm'
        }
    }
}