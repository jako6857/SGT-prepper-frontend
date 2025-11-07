import { Div } from '../views/atoms/index.js';
import { Paragraph } from '../views/atoms/index.js';
import { Button } from '../views/atoms/index.js';
import { Input } from '../views/atoms/index.js';
import { Image } from '../views/atoms/index.js';    
import { HeaderView } from '../views/molecules/index.js';
import { MainView } from '../views/molecules/index.js';
import { FooterView } from '../views/molecules/index.js';
import { Layout } from './layoutController.js';

export const HomePage = async() => {
    const title = "Velkommen"
    const p = Paragraph()
    p.innerText ="Velkommen til Sgt. Prepper Webshop"
    return await Layout(title, p)
}

