import * as flsfunc from "./modules/func.js"
import * as tabs from './modules/tabs.js'
import * as popup from './modules/popup.js'
import * as game1 from './modules/2048/2048.js'
import * as game2 from './modules/snake/snake.js'

flsfunc.isWebp()
tabs.tabsWork()

const items = document.querySelectorAll('.tab-container__items-tablinks')
const line = document.querySelector('.underline')
line.style.width = items[0].clientWidth + 'px'

items.forEach(item => {
    item.addEventListener('mouseover',e=>{
        line.style.width = item.clientWidth + 'px'
        line.style.left = item.offsetLeft+ 'px'
    })
})

items.forEach(item => { item.addEventListener('mouseout',lineToActive)})

items.forEach(item => {
    item.addEventListener('click',e=>{
        document.querySelector('.active').classList.remove('active')
        item.classList.add('active')
    })
})

function lineToActive(event){
    const active  = document.querySelector('.active')
    line.style.width = active.clientWidth + 'px'
    line.style.left = active.offsetLeft+ 'px'
}

document.querySelector('.help').addEventListener('click', ()=>{
    const activeGame = document.querySelector('.activeTab')
    const contentHelp = document.querySelector('.popup__body-contentHelp')
    switch (activeGame.getAttribute('id')) {
        case 'Tab1':
            contentHelp.innerHTML = `Перемещайте плитки кнопками:<br/>
            стрелка вверх, <br/>
            стрелка вниз, <br/>
            стрелка влево,<br/>
            стрелка враво<br/>
            или свайпами если Вы зашли с телефона`
            break;
        case 'Tab2':
            contentHelp.innerHTML = `Перемещайте змейку кнопками:<br/>
            W, <br/>
            A, <br/>
            S,<br/>
            D<br/>
            или свайпами если Вы зашли с телефона`
            break;
        default:
            break;
    }

})


