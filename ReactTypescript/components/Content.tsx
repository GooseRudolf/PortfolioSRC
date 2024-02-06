import { RealHeader } from './Header/Header'
import { RealMain } from './Center/Main'
import st from './Content.module.scss'
import { connect } from 'react-redux'
import { FC, useEffect } from 'react'

interface PropsType{
    theme: {
        black_color: string,
        blue_color: string,
        pink_color: string,
        white_color: string,
    }
}

const Content:FC<PropsType> = (props) => {
    useEffect(() => {
        document.documentElement.style.setProperty('--blue_color', props.theme.blue_color)
        document.documentElement.style.setProperty('--black_color', props.theme.black_color)
        document.documentElement.style.setProperty('--pink_color', props.theme.pink_color)
        document.documentElement.style.setProperty('--white_color', props.theme.white_color)
    }, [props.theme])
    return (
        <div className={st.content}>
            <div className={st.header}><RealHeader /></div>
            <div className=""><RealMain/></div>
        </div>
    )
}
const mapStateToProps = (state: any) => ({
    theme: state.ui.personalTheme,
})
export const RealContent = connect(mapStateToProps,{})(Content)