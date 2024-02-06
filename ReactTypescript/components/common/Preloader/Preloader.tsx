import st from './Preloader.module.scss'
import preloaderImg from '../../../assets/image/tutter-tutter-the-mouse.gif'
import {useEffect, useState} from 'react'
export const Preloader = () => {
    let pos = 0
    const [loadStr, setLoadStr] = useState('Загрузка...')
    useEffect(()=>{
        const timer = setInterval(() => {
            if(pos===0) setLoadStr('Загрузка.')
            else if (pos===1) setLoadStr('Загрузка..')
            else setLoadStr('Загрузка...')
            if (++pos===3) pos = 0
        }, 1000)
        return () => clearTimeout(timer);
    },[])

    return (
        <div className={st.preloader}>
            <div className={st.preloader__container}>
                <div className={st.preloader__img}>
                    <img src={preloaderImg} alt="preloader image" />
                </div>
                <div className={st.preloader__title}>{loadStr}</div>
            </div>
        </div>
    )
}
