import React, { FC } from 'react'
import st from './User.module.scss'
import { Link } from 'react-router-dom'
import { Image } from '../../../../common/Image/Image'
const avatarUrl = 'https://i.redd.it/c1bsy011lm6b1.png'
interface PropsType {
    id: number
    login: string
    avatarUrl: string
    status:string
}

export const User: FC<PropsType> = (props) => {
    return (
        <div className={st.user}>
            <div className={st.user__avatar}>
                <Link to={'/profile/' + props.id}>
                    <Image imageUrl={props.avatarUrl} isAvatar={true}/>
                </Link>
            </div>
            <div className={st.user__description}>
                <div className={st.user__description_login}>{props.login}</div>
                <div className={st.user__description_status}>{props.status}</div>
            </div>
        </div>
    )
}
