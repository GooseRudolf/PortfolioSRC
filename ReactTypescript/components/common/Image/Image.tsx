import {FC} from 'react'
import defAvatar from '../../../assets/image/defaultAvatar.png'
import defImage from '../../../assets/image/defaultImage.jpg'
interface PropsType{
    imageUrl:string
    isAvatar:boolean
}

export const Image: FC<PropsType> = (props) => {
  return (
    <img src={props.imageUrl} alt=""  
        onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src=props.isAvatar?defAvatar:defImage
        }}/>
  )
}
