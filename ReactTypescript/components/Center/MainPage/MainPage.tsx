import { FC, useEffect, useState } from 'react'
import { HelloScreen } from './Elements/HelloScreen/HelloScreen'
import { Item } from './Elements/Item/Item'
import st from './MainPage.module.scss'
import { connect } from 'react-redux'
import { AddPost } from './Elements/AddPost/AddPost'
import { getRundomWorksThunk, setNewWorkThunk } from '../../../redux/reducers/uiReducer'
import { Preloader } from '../../common/Preloader/Preloader'
import { Popup } from '../../common/Popup/Popup'
import { AddPostBody } from '../../common/AddPostBody/AddPostBody'
const imgUrl = 'https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg'
const avatarUrl = 'https://i.redd.it/c1bsy011lm6b1.png'

interface PropsType{
    setPar:(num:number)=>void
    isAuth:boolean
    setNewWorkThunk:(id:number, work:any)=>void
    userId:number
    getRundomWorksThunk:()=>void
    works:Array<any>
    isFetching:boolean
}

const MainPage: FC<PropsType> = (props) => {
    const [popupMode, setPopupMode] = useState(false)
    const [imageData, setImageData] = useState({id:-1, text:'', url:''})
    const onClickItem = (itemData:any)=>{
        setPopupMode(true)
        setImageData(itemData)
    }
    useEffect(()=>{ props.setPar(0) },[])
    useEffect(()=>{ props.getRundomWorksThunk() },[])

    return (
        props.isFetching?<Preloader/>:
        <div className={st.mainPage + ' ' + (props.isAuth&& st.mainPage_isAuth)}>
            {!props.isAuth?<HelloScreen/>:<AddPost setWork={props.setNewWorkThunk} userId={props.userId}/>}
            <div className={st.elements}>
                <div className="container">
                    <div className={st.imageList}>
                        {props.works.map(e => {
                            return (<Item imgUrl={e.url} avatarUrl={e.avatar}
                                named={e.title} author={e.login}  
                                onClickItem={onClickItem} key={e.id}/>
                                )
                        })}
                    </div>
                </div>
            </div>

            {popupMode && 
            <Popup setPopupMode={setPopupMode}>
                <AddPostBody clickBtn={()=>{}} 
                    clickBtnDelete={undefined}
                        mode={0} imageData={imageData}/>
            </Popup> }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    works:state.ui.works,
    isAuth: state.auth.isAuth,
    userId:state.auth.userId,
    isFetching:state.ui.isFetching
})
export const RealMainPage = connect(mapStateToProps, 
            { setNewWorkThunk, getRundomWorksThunk})(MainPage)