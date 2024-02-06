import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import st from './ProfilePage.module.scss'
import { withRouter } from '../../../hooks/withRoute'
import {getUsersByIdThunk} from '../../../redux/reducers/usersReducer'
import {setNewWorkThunk, deleteWorkThunk, updateWorkThunk} from '../../../redux/reducers/uiReducer'
import { ProfileDescription } from './Elements/ProfileDescription/ProfileDescription'
import { Item } from './Elements/Item/Item'
import { Preloader } from '../../common/Preloader/Preloader'
import { AddPostBody } from '../../common/AddPostBody/AddPostBody'
import { Popup } from '../../common/Popup/Popup'
import { Image } from '../../common/Image/Image'

const banerUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cebd17f1-b283-45e5-8600-6ec3edc558fd/dee2aqv-222532a7-8676-4788-b8e3-08d4f5be55e2.png/v1/fill/w_1280,h_640,q_80,strp/profile_banner_by_darkfigure4_dee2aqv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvY2ViZDE3ZjEtYjI4My00NWU1LTg2MDAtNmVjM2VkYzU1OGZkXC9kZWUyYXF2LTIyMjUzMmE3LTg2NzYtNDc4OC1iOGUzLTA4ZDRmNWJlNTVlMi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.sdy7FtZ92V4tHXX-hTf0PupZmkD7CQoG-BkmOY0_mQg'

interface PropsType{
    getUsersByIdThunk:(id:number)=>void
    setNewWorkThunk:(id:number, work:any)=>void
    deleteWorkThunk:(id:number, idWork:number)=>void
    updateWorkThunk:(id:number, changeWork:any)=>void
    setPar:(num:number)=>void
    isAuth:boolean
    router:any
    userId:number
    user:any
    isFetching: boolean
}

export const ProfilePage: FC<PropsType> = (props) => {
    const [isOvner, setIsOwner] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        props.setPar(1)
        let userId = props.router.params.userId
        if (!userId) {
            if (props.isAuth) { 
                props.getUsersByIdThunk(props.userId)
                setIsOwner(true)
            } 
            else { navigate('/login') }
        }else{ props.getUsersByIdThunk(userId) }
    }, [props.isAuth])

    return (props.isFetching?<Preloader/>: <Profile user={props.user} isOvner={isOvner} userId={props.userId} 
                                            setWork={props.setNewWorkThunk} deleteWork={props.deleteWorkThunk}
                                            changeWork={props.updateWorkThunk}/>)
}
interface ProfilePropsType{
    user:any
    isOvner:boolean
    setWork:(id:number, work:any)=>void
    deleteWork:(id:number, idWork:number)=>void
    changeWork:(id:number, work:any)=>void
    userId:number
}
const Profile:FC<ProfilePropsType> = (props) =>{
    const [popupMode, setPopupMode] = useState(false)
    const [addPostMode, setAddPostMode] = useState(0)
    const [imageData, setImageData] = useState({id:-1, text:'', url:''})

    const onClickBtn = (title:string, url:string)=>{
        props.setWork(props.userId, {title, url})
    }
    const onClickBtnChange = (title:string, url:string, id?:number)=>{
        props.changeWork(props.userId, {title, url, id})
    }
    const onClickBtnDelete = (id:number)=>{
        props.deleteWork(props.userId, id)
    }
    const onClickItem = (itemData:any)=>{
        setPopupMode(true)
        setAddPostMode(props.isOvner?2:0)
        setImageData(itemData)
    }
    const onClickAddButon = ()=>{
        setPopupMode(true)
        setAddPostMode(1)
        setImageData({id:-1, text:'', url:''})
    }
    return(
        <div className={st.maf}>
            <div className={st.baner} >
                <div className={st.baner__body}>
                    <Image imageUrl={props.user.banerUrl} isAvatar={false}/>
                </div>
            </div>
            <div className={st.profileContent}>
                <div className="container">
                    <ProfileDescription avatarUrl={props.user.avatarUrl} 
                                        name={props.user.login} aboutMe={props.user.aboutMe} 
                                        isOvner={props.isOvner}
                                        userId={props.userId} setWork={props.setWork}
                                        onAddPostClick={onClickAddButon}/>
                    <div className={st.worck}>
                        <div className={st.worck__items} > 
                        {props.user.works&&
                            props.user.works.map((work:any)=>{
                                return <Item imgUrl={work.url} named={work.title} key={work.id} id={work.id} onClickFunction={onClickItem} />      
                            })
                        }
                       </div>
                    </div>
                </div>
            </div>

            {popupMode && <Popup setPopupMode={setPopupMode}>
                    <AddPostBody clickBtn={addPostMode==1?onClickBtn:onClickBtnChange} clickBtnDelete={addPostMode==2?onClickBtnDelete:undefined}
                        mode={addPostMode} imageData={imageData}/>
                </Popup> }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    userId:state.auth.userId,
    user:state.users.activeUser,
    isFetching: state.ui.isFetching
})
export const RealProfile = connect(mapStateToProps, {getUsersByIdThunk, setNewWorkThunk, deleteWorkThunk, updateWorkThunk})(withRouter(ProfilePage))