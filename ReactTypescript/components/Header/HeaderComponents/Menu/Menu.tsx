import { Link } from 'react-router-dom';
import st from './Menu.module.scss'
import { FC, useEffect, useState } from 'react';

interface PropsType{
  numMenu:number
  setPar:(num:number)=>void
}

export const Menu: FC<PropsType> = (props) => {
  const [activeItem, setActiveItem] = useState(0)
  const [activebMenu, setActiveBMenu] = useState(false)
  useEffect(() => {
    const currentUrl = window.location.href
    if (currentUrl.includes('profile')) { setActiveItem(1) }
    else if (currentUrl.includes('users')) { setActiveItem(2) }
    else if (currentUrl.includes('settings')) { setActiveItem(3) }
    else { setActiveItem(0) }
    props.setPar(activeItem)
  }, [activeItem]);
  return (
    <nav className={st.navigation}>
      <div className={st.menu}>
        <ul className={st.menu__items}>
          <li className={st.menu__items_item + ' ' + (props.numMenu == 0 && st.active)}>
            <Link to="/" onClick={() => { setActiveItem(0) }}>Главная</Link>
          </li>
          <li className={st.menu__items_item + ' ' + (props.numMenu == 1 && st.active)}>
            <Link to="/profile" onClick={() => { setActiveItem(1) }}>Профиль</Link>
          </li>
          <li className={st.menu__items_item + ' ' + (props.numMenu == 2 && st.active)}>
            <Link to="/users" onClick={() => { setActiveItem(2) }}>Пользователи</Link>
          </li>
          <li className={st.menu__items_item + ' ' + (props.numMenu == 3 && st.active)}>
            <Link to="/settings" onClick={() => { setActiveItem(3) }}>Настройки</Link>
          </li>
        </ul>
      </div>
     
      <div className={st.bMenu} >
        <div className={st.bMenu__burger} onClick={()=>{setActiveBMenu(true)}}>
          <div className={st.bMenu__burger_line}></div>
          <div className={st.bMenu__burger_line}></div>
          <div className={st.bMenu__burger_line}></div>
        </div>
        <ul className={st.bMenu__items + ' '+(activebMenu && st.bMenu__items_active)}>
          <div className={st.bMenu__close} onClick={()=>{setActiveBMenu(false)}}>X</div>
          <li className={st.bMenu__items_item}>
            <Link to="/" onClick={() => { setActiveItem(0);setActiveBMenu(false) }}>Главная</Link>
          </li>
          <li className={st.bMenu__items_item}>
            <Link to="/profile" onClick={() => { setActiveItem(1);setActiveBMenu(false) }}>Профиль</Link>
          </li>
          <li className={st.bMenu__items_item}>
            <Link to="/users" onClick={() => { setActiveItem(2);setActiveBMenu(false) }}>Пользователи</Link>
          </li>
          <li className={st.bMenu__items_item}>
            <Link to="/settings" onClick={() => { setActiveItem(3);setActiveBMenu(false) }}>Настройки</Link>
          </li>
        </ul>
      </div>
      
    </nav>
  )
}
