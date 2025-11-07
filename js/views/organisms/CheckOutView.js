import { Div, Form, Button } from '../atoms/index.js'
import { FormGroup } from '../molecules/index.js'
import { price2Dkk } from '../../utils/index.js'

export const CheckoutView = (cartItems = [], onSubmit) => {
    const element = Div('max-w-4xl mx-auto p-6')
    
    // Billing form
    const form = Form('POST')
    form.className = 'grid grid-cols-1 md:grid-cols-2 gap-6'
    
    // Left column - Customer info
    const customerInfo = Div('space-y-4')
    customerInfo.append(
        FormGroup('Fulde Navn', 'fullName', 'Indtast dit fulde navn', 'text'),
        FormGroup('Email', 'email', 'Indtast din email', 'email'),
        FormGroup('Adresse', 'address', 'Indtast din adresse', 'text'),
        FormGroup('By', 'city', 'Indtast by', 'text'),
        FormGroup('Postnummer', 'zipCode', 'Indtast postnummer', 'text')
    )
    
    // Right column - Payment info
    const paymentInfo = Div('space-y-4')
    paymentInfo.append(
        FormGroup('Kortnummer', 'cardNumber', '1234 5678 9012 3456', 'text'),
        FormGroup('Udløbsdato', 'expiry', 'MM/ÅÅ', 'text'),
        FormGroup('CVC', 'cvc', '123', 'text')
    )
    
    form.append(customerInfo, paymentInfo)
    
    // Order summary
    const summary = Div('mt-8 p-4 bg-gray-50 rounded-lg')
    const summaryTitle = document.createElement('h3')
    summaryTitle.className = 'text-lg font-semibold mb-4'
    summaryTitle.textContent = 'Ordre oversigt'
    
    const itemsList = Div('space-y-2')
    let total = 0
    
    cartItems.forEach(item => {
        const itemRow = Div('flex justify-between')
        const itemInfo = Div()
        itemInfo.innerText = `${item.quantity}x ${item.product.name}`
        const itemPrice = Div('font-medium')
        itemPrice.innerText = price2Dkk(item.product.price * item.quantity)
        itemRow.append(itemInfo, itemPrice)
        itemsList.append(itemRow)
        total += item.product.price * item.quantity
    })
    
    const totalRow = Div('flex justify-between pt-4 border-t mt-4 font-bold')
    totalRow.innerHTML = `<span>Total</span><span>${price2Dkk(total)}</span>`
    
    summary.append(summaryTitle, itemsList, totalRow)
    
    // Submit button
    const submitBtn = Button(
        'Gennemfør betaling',
        'submit',
        'w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium'
    )
    
    form.addEventListener('submit', onSubmit)
    
    element.append(form, summary, submitBtn)
    return element
}