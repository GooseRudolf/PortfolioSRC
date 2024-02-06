import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import st from './FormAuth.module.scss'
import eyeIcon from '../../../../assets/image/eye.png'
import loginIcon from '../../../../assets/image/profileicon.jpg'

interface PropsType {
    children: Array<any>
    onSubmit: (data: Inputs) => void
}
type Inputs = {
    login: string,
    password: string
}

export const Form: FC<PropsType> = ({ children, onSubmit }) => {
    const methods = useForm<Inputs>({ mode: 'onChange' })
    const { handleSubmit , formState:{errors}} = methods
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={st.form}>
            {React.Children.map(children, (child) => {
                return child.props.name
                    ? React.createElement(child.type, {
                        ...{
                            ...child.props,
                            register: methods.register,
                            key: child.props.name,
                            errors: errors
                        },
                    })
                    : child
            })}
        </form>
    )
}

interface PropsInputType{
    required:boolean
    minLength:number

    type:string
    placeholder:string
    name:string

    errors?:any
    register?:any
}
export const Input: FC<PropsInputType> = (props) => {
    const [passMode, setPassMode] = useState(true)
    let validators: { required?: string; minLength?: {value:number, message:string} }
    validators= {}
    if(props.required)
        validators.required = 'Поле обязательное'
    if(props.minLength != 0)
        validators.minLength = { value: props.minLength ,message: `меньше ${props.minLength} символов` }

    return <div className={st.input} >
        <div className={st.input__container + ' '+ (props.errors?.[props.name] && st.error)}>
            <div className={st.input__icon}> <img src={loginIcon} alt="" /> </div>

            <input type={passMode?props.type:'text'} 
                    placeholder={props.placeholder} 
                    {...props.register(props.name,validators)} />
            {props.type == 'password' && 
                <div className={st.input__showPssword} 
                onClick={() => { setPassMode(!passMode) }}>
                    <img src={eyeIcon} alt="" />
                </div>
            }
        </div>

        {props.errors?.[props.name] &&
            <div className={props.errors?.[props.name] && st.input__error}> 
                    {props.errors?.[props.name].message} 
            </div>
        }
    </div>
}
