import { FC } from 'react'
import st from './Item.module.scss'
import { Image } from '../../../../common/Image/Image'

interface PropsType{
    imgUrl:string,
    avatarUrl:string,
    named:string,
    author:string,
    onClickItem:(itemData:any)=>void
}

export const Item:FC<PropsType> = (props) => {
    return (
        <div className={st.item} 
        onClick={()=>{props.onClickItem({ text:props.named, url:props.imgUrl})}}>
            <div className={st.item_img}>
                <Image imageUrl={props.imgUrl} isAvatar={false}/>
            </div>
            <div className={st.item_description}>
                <div className={st.item_description_ava}>
                    <Image imageUrl={props.avatarUrl} isAvatar={true}/>
                </div>
                <div className={st.item_description_named}>
                    <div className={st.item_description_named_nameOfImage}>
                        {props.named}
                    </div>
                    <div className={st.item_description_named_nameOfAuthor}>
                        {props.author}
                    </div>
                </div>
            </div>
        </div>
    )
}
