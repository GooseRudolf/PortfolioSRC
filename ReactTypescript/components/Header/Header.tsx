import { connect } from 'react-redux'
import st from './Header.module.scss'
import { logOutThunk } from '../../redux/reducers/authReducer'
import { setParagraphThunk } from '../../redux/reducers/uiReducer'

import { Logo } from './HeaderComponents//Logo/Logo'
import { Menu } from './HeaderComponents/Menu/Menu'
import { ProfileLogIn } from './HeaderComponents/ProfileLogIn/ProfileLogIn'
import { ProfileWindow } from './HeaderComponents/ProfileWindow/ProfileWindow'
import { FC } from 'react'

interface PropsType{
    isAuth:boolean
    login:string
    avatarUrl:string
    numOfParagraph: number
    logOutThunk: ()=>void
    setParagraphThunk:(num:number)=>void
}

export const Header: FC<PropsType> = (props) =>{
    return(
        <header className={st.header}>
            <div className="container">
                <div className={st.header__content}>
                    <Logo/>
                    <Menu numMenu={props.numOfParagraph} setPar={props.setParagraphThunk}/>
                    {props.isAuth
                    ? <ProfileWindow avatarUrl={props.avatarUrl} login={props.login} exitFunc={props.logOutThunk}/>
                    :<ProfileLogIn/>
                    }
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state:any) =>({
    isAuth:state.auth.isAuth,
    login:state.auth.user.login,
    avatarUrl:state.auth.user.avatarUrl,
    numOfParagraph: state.ui.menuParagrph
})

export const RealHeader = connect(mapStateToProps,{logOutThunk, setParagraphThunk})(Header)