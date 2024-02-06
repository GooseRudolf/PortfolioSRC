import {FC} from 'react'
import st from './Popup.module.scss'

interface PropsType{
    setPopupMode:(flag:boolean)=>void
    children:any
}

export const Popup: FC<PropsType>= ({children, setPopupMode}) => {
  return (
    <div className={st.popup + ' popup'}>
        <div className={st.popup__background} onClick={() => { setPopupMode(false) }}></div>
        <div className={st.popup__body}>{children}</div>
    </div>
  )
}