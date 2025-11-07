import { Li, Ul, Div, Button } from "../atoms/index.js";
import { price2Dkk } from "../../utils/index.js";

export const cartListView = (data = []) => {
    const element = Ul('divide-y divide-gray-200')

    data.forEach(item => {
        const li = Li('flex justify-between items-center py-4 hover:bg-gray-50 transition-colors duration-200')

        const quantity = Div('w-[10%] text-center font-medium text-gray-700')
        quantity.innerText = item.quantity
        li.append(quantity)

        const name = Div('w-[60%] text-center text-gray-800')
        name.innerText = item.product.name
        li.append(name)

        const price = Div('text-right w-[20%] font-medium text-gray-900')
        price.innerText = price2Dkk(item.product.price)
        li.append(price)

        const action = Div('w-[10%] text-center')
        const delBtn = Button(
            'Slet', 
            'button',
            'text-sm px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200'
        )
        delBtn.dataset.cartid = item.id
        action.append(delBtn)
        li.append(action)

        element.append(li)
    })
    return element
}

export const cartListHeaderView = arrColumns => {
    const cartHeader = Div('flex gap-3 border-b-2 border-gray-900 py-3 justify-between text-sm uppercase tracking-wider text-gray-600')
    
    arrColumns.forEach(item => {
        const col = Div(item.className)
        col.textContent = item.name
        cartHeader.append(col)
    })
    return cartHeader
}

export const cartTotalView = totalPrice => {
    const totalRow = Div('flex gap-3 border-t-2 border-gray-900 mt-4 py-4 justify-between items-center')

    const textCol = Div('w-[70%] text-lg font-semibold text-gray-900')
    textCol.innerText = 'Total'

    const totalCol = Div('w-[20%] text-right text-xl font-bold text-gray-900')
    totalCol.innerText = price2Dkk(totalPrice)

    const spacerCol = Div('w-[10%]')

    totalRow.append(textCol, totalCol, spacerCol)

    // Add checkout button
    const checkoutRow = Div('mt-6 text-center')
    const checkoutBtn = Button(
        'Gå til betaling',
        'button',
        'bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium'
    )
    checkoutBtn.addEventListener('click', () => {
        window.location.hash = '/checkout'
    })
    checkoutRow.append(checkoutBtn)
    
    const wrapper = Div('space-y-4')
    wrapper.append(totalRow, checkoutRow)
    return wrapper
}

