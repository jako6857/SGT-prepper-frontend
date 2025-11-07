import { Fragment } from "../views/atoms/index.js";
import { FooterView, HeaderView, MainView, NavBarView } from "../views/molecules/index.js";
import { getCategoryList } from "./categoryController.js";

export const Layout = async (title, content) => {
    document.title = title

    const arrNavItems = await getCategoryList()

    const footerImagePath = './css/img/Footer.png'

    const element = Fragment(arrNavItems)
    element.append(
        HeaderView(),
        NavBarView(arrNavItems),
        MainView(title, content),
        FooterView()
        )

    return element
}