import st from './ProfileLogIn.module.scss'
import {Link} from 'react-router-dom'
export const ProfileLogIn = () => {
  return (
    <Link to="/login" className={st.link}>
      <div className={st.profile}>
          <div className={st.profile__button}>
              Авторизация
          </div>
      </div>
    </Link>
  )
}
