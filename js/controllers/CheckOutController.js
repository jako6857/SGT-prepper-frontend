import { Layout } from './layoutController.js'
import { CheckoutView } from '../views/organisms/checkoutView.js'
import { getCartList } from '../models/cartModel.js'
import { isLoggedIn } from '../services/auth.js'

export const CheckoutPage = async () => {
    if(!isLoggedIn()) {
        location.href = './index.htm#/login'
        return false
    }

    const cartItems = await getCartList()
    
    const handleCheckout = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const orderData = Object.fromEntries(formData)
        
        // Demo: Show success message and clear cart
        alert('Tak for din ordre! (Demo - ingen rigtig betaling gennemført)')
        location.href = './index.htm#/'
    }

    const html = CheckoutView(cartItems, handleCheckout)
    return Layout('Checkout', html)
}