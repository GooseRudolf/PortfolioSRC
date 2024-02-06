import { FC, useEffect } from "react"
import { connect } from "react-redux"
import { getUsersThunk } from "../../../redux/reducers/usersReducer"
import st from './Users.module.scss'
import { User } from "./Elements/User/User"
import { Preloader } from "../../common/Preloader/Preloader"

interface PropsType {
    setPar: (num: number) => void
    getUsersThunk: () => void
    users: Array<any>
    isFetching: boolean
}
const Users: FC<PropsType> = (props) => {
    useEffect(() => {
        props.setPar(2)
        props.getUsersThunk()
    }, [])
    return (props.isFetching?<Preloader/>:<UsersList users={props.users}/>)
}

interface UsersPropsType {
    users: Array<any>
}
const UsersList:FC<UsersPropsType> = (props) => {
    console.log(props.users)
    return (
        <div className={st.users}>
            <div className="container">
                <div className={st.users__list}>
                    {props.users.map(u => {
                        return (
                            <User key={u.id} login={u.login} 
                                  avatarUrl={u.avatarUrl} id={u.id} status={u.aboutMe}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    users: state.users.users,
    isFetching: state.ui.isFetching
})
export const RealUser = connect(mapStateToProps, { getUsersThunk })(Users)
