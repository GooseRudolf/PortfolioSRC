import {FC} from 'react'
import st from './AddPost.module.scss'
import { AddPostBody } from '../../../../common/AddPostBody/AddPostBody'

interface PropsType{
    setWork:(id:number, work:any)=>void
    userId:number
}


export const AddPost:FC<PropsType> = (props) => {

    const clickBtn = (title:string, url:string)=>{
        props.setWork(props.userId, {title, url})
    }
    return (
        <div className={st.addPost}>
            <div className="container">
                <AddPostBody clickBtn={clickBtn} mode={1} />
            </div>
        </div>
  )
}
