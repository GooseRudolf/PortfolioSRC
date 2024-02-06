import { FC } from 'react'
import st from './Button.module.scss'

interface PropsType{
    text:string,
    number:number,
    onClickFunction:any
}

export const Button:FC<PropsType> = (props) => {
    let styleClass;
    switch(props.number){
        case 1:
            styleClass = st.btn1
            break
        default:
            styleClass = st.btn0
            break
    }
  return (
    <div className={st.button} onClick={()=>{props.onClickFunction()}}>
        <button className={st.button__body + ' ' + styleClass} >
            {props.text}
        </button>
    </div>
  )
}
