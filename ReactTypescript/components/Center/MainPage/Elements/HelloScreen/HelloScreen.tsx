import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../common/Button/Button'
import st from './HelloScreen.module.scss'
export const HelloScreen = () => {
    const navigate = useNavigate()
    return (
        <div className={st.helloScreen}>
            <div className={st.helloScreen__background}></div>
            <div className={ st.helloScreen__content + ' container'}>
                <p>Картина создает ощущение тепла</p>
                <h2>Делиь своими картинкам!</h2>
                <blockquote cite="https://www.huxley.net/bnw/four.html">
                    <p>Картина — стих, только без слов.</p>
                    <footer>— <cite>Квинт Гораций Флакк</cite></footer>
                </blockquote>
                <Button text={'Зарегестрироваться'} number={0} onClickFunction={()=>{navigate('/registration')}}/>
            </div>
        </div>
    )
}
