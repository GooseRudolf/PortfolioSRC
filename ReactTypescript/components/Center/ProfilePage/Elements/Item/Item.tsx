import { FC } from 'react'
import st from './Item.module.scss'
import { Image } from '../../../../common/Image/Image'
interface PropsType{
    imgUrl:string
    named:string
    id:number
    onClickFunction:(itemData:any)=>void
}
export const Item:FC<PropsType> = (props) => {
    return (
        <div className={st.item} onClick={()=>{props.onClickFunction({id:props.id, text:props.named, url:props.imgUrl})}}>
            <div className={st.item__img}>
                <Image imageUrl={props.imgUrl} isAvatar={false} />
            </div>
            <div className={st.item__description}>
                {props.named}
            </div>
        </div>
    )
}
