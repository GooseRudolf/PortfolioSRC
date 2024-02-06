import { Link } from 'react-router-dom'
import logo from '../../../../assets/image/logo2.png'
import st from './Logo.module.scss'
export const Logo = () => {
  return (
    <div className={st.logo}>
        <div className={st.logo__image}>
            <Link to={'/'}> <img src={logo} alt="" /> </Link>
        </div>
    </div>
  )
}
