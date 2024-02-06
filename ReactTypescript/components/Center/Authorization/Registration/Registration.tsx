import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Form } from '../FormAuth/FormAuth'
import {Link, useNavigate} from 'react-router-dom'
import { connect } from 'react-redux'
import { registrationThunk } from '../../../../redux/reducers/authReducer'
import st from '../LogIn/LogIn.module.scss'
import {FC, useState} from 'react'
import { Preloader } from '../../../common/Preloader/Preloader'
type Inputs = {
    login: string,
    password: string
}
interface PropsType{
    registrationThunk:(login:string, passwprd:string)=>any
    isFetching:boolean
}

export const Registration: FC<PropsType> = (props) => {
    const { reset } = useForm<Inputs>({ mode: 'onChange' })
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        const result:number  = await props.registrationThunk(data.login, data.password)
        reset()
        if(result===1){
            navigate('/')
        }else{
           setError('Какая-то ошибка')
        }
    }
    return (props.isFetching?<Preloader/>:
        <div className={st.login}>
            <div className={st.form}>
                <Form onSubmit={onSubmit}>
                    <legend>Registration</legend>
                    <Input name="login" type='text' placeholder='input Login' required={true} minLength={5} />
                    <Input name="password" type='password' placeholder='input Password' required={true} minLength={5} />
                    <button className={st.button}>Регистрация</button>
                </Form>
                <div className={st.form__dontHaveAccaunt}> Уже есть аккаунта? <Link to={'/login'}>Авторизируйтесь!</Link></div>
                {error!=''&& <div className={st.form__errorMessage}>{error}</div>}
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    isFetching: state.ui.isFetching
})
export const RealRegistration = connect(mapStateToProps,{registrationThunk})(Registration)