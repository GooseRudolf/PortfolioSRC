import { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setColorThunk, setUserThunk } from '../../../redux/reducers/uiReducer'
import st from './Settings.module.scss'
import { withRedirect } from '../../../hooks/whithRedirect'
import { Image } from '../../common/Image/Image'
interface PropsType {
    setPar: (num: number) => void
    setColorThunk: (id: number, theme: any) => void
    setUserThunk: (id: number, user: any) => void
    theme: {
        black_color: string,
        blue_color: string,
        pink_color: string,
        white_color: string,
    }
    user:{
        login: string
        avatarUrl: string
        aboutMe: string
        banerUrl:string
    }

    userId: number
}

export const Settings: FC<PropsType> = (props) => {
    const [theme, changeTheme] = useState({ ...props.theme })
    const [user, changeUser] = useState({ ...props.user})
    useEffect(() => { props.setPar(3) }, [])
    const setColor = (e: any) => {
        props.setColorThunk(props.userId, theme)
    }
    const setUserInfo = (e: any) => {
        props.setUserThunk(props.userId, user)
    }

    return (
        <div className={st.settings}>
            <div className="container">
                <div className={st.settings__block}>
                    <div className={st.settings__block_title}>Изменить информацию профиля</div>
                    <div className={st.changeProfileInformation}>

                        <div className={st.changeProfileInformation__block}>
                            <div className={st.changeProfileInformation__block_img}>
                                <Image imageUrl={props.user.avatarUrl} isAvatar={true}/>
                            </div>
                            <div className={st.changeProfileInformation__block_input}>
                                <input type="text" name='avatarUrl' value={user.avatarUrl}
                                    onChange={(e: any) => { changeUser({ ...user, avatarUrl: e.target.value }) }} 
                                    onBlur={setUserInfo}/>
                            </div>
                        </div>

                        <div className={st.changeProfileInformation__block}>
                            <div className={st.changeProfileInformation__block_contsiner}>
                                <div className={st.changeProfileInformation__block_text}>
                                    login
                                </div>
                                <div className={st.changeProfileInformation__block_input}>
                                    <input className={st.changeProfileInformation__block_input}
                                        type="text" name='login' value={user.login}
                                        onChange={(e: any) => { changeUser({ ...user, login: e.target.value }) }} 
                                        onBlur={setUserInfo}/>
                                </div>
                            </div>
                            <div className={st.changeProfileInformation__block_contsiner}>
                                <div className={st.changeProfileInformation__block_text}>
                                    About Me
                                </div>
                                <div className={st.changeProfileInformation__block_input}>
                                    <input className={st.changeProfileInformation__block_input}
                                        type="text" name='login' value={user.aboutMe}
                                        onChange={(e: any) => { changeUser({ ...user, aboutMe: e.target.value }) }} 
                                        onBlur={setUserInfo}/>
                                </div>
                            </div>

                            <div className={st.changeProfileInformation__block_contsiner}>
                                <div className={st.changeProfileInformation__block_text}>
                                    Baner
                                </div>
                                <div className={st.changeProfileInformation__block_input}>
                                    <Image imageUrl={props.user.banerUrl} isAvatar={false}/>
                                    <input className={st.changeProfileInformation__block_input}
                                        type="text" name='bamerUrl' value={user.banerUrl}
                                        onChange={(e: any) => { changeUser({ ...user, banerUrl: e.target.value }) }} 
                                        onBlur={setUserInfo}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={st.settings__block}>
                    <div className={st.settings__block_title}>Изменить тему</div>
                    <div className={st.changeTheme}>
                        <div className={st.changeTheme__block}>
                            <div className={st.changeTheme__block_text}>
                                Цвет заднего фона
                            </div>
                            <div className={st.changeTheme__block_input}>
                                <input type="color" name="blue_color"
                                    value={theme.blue_color}
                                    onChange={(e: any) => { changeTheme({ ...theme, blue_color: e.target.value }) }}
                                    onBlur={setColor} />
                            </div>
                        </div>
                        <div className={st.changeTheme__block}>
                            <div className={st.changeTheme__block_text}>
                                Цвет меню
                            </div>
                            <div className={st.changeTheme__block_input}>
                                <input type="color" name="black_color"
                                    value={theme.black_color}
                                    onChange={(e: any) => { changeTheme({ ...theme, black_color: e.target.value }) }}
                                    onBlur={setColor} />
                            </div>
                        </div>
                        <div className={st.changeTheme__block}>
                            <div className={st.changeTheme__block_text}>
                                Цвет кнопок
                            </div>
                            <div className={st.changeTheme__block_input}>
                                <input type="color" name="pink_color"
                                    value={theme.pink_color}
                                    onChange={(e: any) => { changeTheme({ ...theme, pink_color: e.target.value }) }}
                                    onBlur={setColor} />
                            </div>
                        </div>
                        <div className={st.changeTheme__block}>
                            <div className={st.changeTheme__block_text}>
                                Цвет текста
                            </div>
                            <div className={st.changeTheme__block_input}>
                                <input type="color" name="white_color"
                                    value={theme.white_color}
                                    onChange={(e: any) => { changeTheme({ ...theme, white_color: e.target.value }) }}
                                    onBlur={setColor} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    theme: state.ui.personalTheme,
    user: state.auth.user,
    userId: state.auth.userId
})
export const RealSettings = connect(mapStateToProps, { setColorThunk, setUserThunk})(withRedirect(Settings))
//export const RealSettings = connect(mapStateToProps, {setColorThunk})(Settings)
