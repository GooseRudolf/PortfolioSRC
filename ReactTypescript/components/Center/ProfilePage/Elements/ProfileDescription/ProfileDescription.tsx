import { FC } from 'react'
import st from './ProfileDescription.module.scss'
import { Image } from '../../../../common/Image/Image'

interface PropsType {
    avatarUrl: string,
    name: string
    aboutMe: string
    isOvner: boolean
    setWork:(id:number, work:any)=>void
    userId:number
    onAddPostClick:(flag:boolean)=>void
}

export const ProfileDescription: FC<PropsType> = (props) => {
    return (
        <div className={st.profileHeader}>
            <div className={st.profileHeader__avatar}>
                <Image imageUrl={props.avatarUrl} isAvatar={true} />
            </div>
            <div className={st.profileHeader__information}>
                <div className={st.profileHeader__information_name}>{props.name}</div>
                <div className={st.profileHeader__information_aboutMe}>{props.aboutMe}</div>
                {props.isOvner &&
                    <div className={st.profileHeader__information_btn}
                        onClick={() => { props.onAddPostClick(true) }}>
                        addPost
                    </div>
                }
            </div>
            {/* {popupMode &&
                <div className={st.popup}>
                    <div className={st.popup__background} onClick={() => { setPopupMode(false) }}></div>
                    <div className={st.popup__body}><AddPostBody clickBtn={onClickBtn}/></div>
                </div>
            } */}
        </div>
    )
}
