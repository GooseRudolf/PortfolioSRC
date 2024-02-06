import {useState} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Form } from '../FormAuth/FormAuth'
import {Link, useNavigate} from 'react-router-dom'
import { connect } from 'react-redux'
import { logInThunk } from '../../../../redux/reducers/authReducer'
import st from './LogIn.module.scss'
import {FC} from 'react'
import { Preloader } from '../../../common/Preloader/Preloader'
type Inputs = { login: string, password: string }

interface PropsType{ 
    logInThunk:(login:string, passwprd:string)=>any 
    isFetching:boolean
}

export const LogIn: FC<PropsType> = (props) => {
    const { reset } = useForm<Inputs>({ mode: 'onChange' })
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result:number  = await props.logInThunk(data.login, data.password)
        reset()
        if(result===1){
            navigate('/')
        }else{
           setError('Не верный логин или пароль')
        }
    }
    return (props.isFetching?<Preloader/>:
        <div className={st.login}>
            <div className={st.form}>
                <Form onSubmit={onSubmit}>
                    <legend>Login</legend>
                    <Input name="login" type='text' placeholder='input Login' required={true} minLength={5} />
                    <Input name="password" type='password' placeholder='input Password' required={true} minLength={5} />
                    <button className={st.button}>Войти</button>
                </Form>
                <div className={st.form__dontHaveAccaunt}> Нет аккаунта? <Link to={'/registration'}>Зарегестрируйтесь!</Link></div>
                {error!=''&& <div className={st.form__errorMessage}>{error}</div>}
            </div>
          
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    isFetching: state.ui.isFetching
})
export const RealLogIn = connect(mapStateToProps,{logInThunk})(LogIn)