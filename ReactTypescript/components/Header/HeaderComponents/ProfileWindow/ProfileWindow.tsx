import { useState, useEffect, useRef, FC } from 'react'
import st from './ProfileWindow.module.scss'
import { Link } from 'react-router-dom'
import { Image } from '../../../common/Image/Image'

interface PropsType {
    login: string
    avatarUrl: string,
    exitFunc: () => void
}

export const ProfileWindow: FC<PropsType> = (props) => {
    const [menuMode, setMenuMode] = useState(false)
    const ref = useRef(null)
    const ref2 = useRef(null)
    const handleMouseClick = (e: MouseEvent) => {
        if ((e.target! != ref2.current) && (e.target != ref.current)) {
            setMenuMode(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleMouseClick)
        return () => document.removeEventListener('click', handleMouseClick)
    }, [])
    return (
        <div className={st.profileWindow}>
            <div className={st.profileWindow__avatar} onClick={() => { setMenuMode(true) }}>
                <Image imageUrl={props.avatarUrl} isAvatar={true}/>
                <div className={st.profileWindow__avatar_ref} ref={ref2}></div>
            </div>
            {
                menuMode &&
                <div className={st.profileWindow__menu} ref={ref}>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/settings'>Settings</Link>
                    <button onClick={() => { props.exitFunc() }}>LogOut</button>
                </div>
            }
        </div>
    )
}

