import { useState, FC, useEffect } from 'react'
import st from './AddPostBody.module.scss'
import { Image } from '../Image/Image'

interface PropsType {
    clickBtn: (title: string, url: string, id?:number) => void
    clickBtnDelete?: (id:number) => void
    mode:number
    imageData?:{
        id:number
        text:string
        url:string
    }
}

export const AddPostBody: FC<PropsType> = (props) => {
    const [url, setUrl] = useState('')
    const [text, setText] = useState('')
    useEffect(()=>{
        if(props.imageData){
            setText(props.imageData.text)
            setUrl(props.imageData.url)
        }
    },[])
    switch (props.mode) {
        case 1: {
            return (
                <div className={st.addPost__container}>
                    <div className={st.addPost__container_deck}>
                        <div className={st.addPost__container_deck_input}>
                            <input type="text" placeholder='Введите название для картинка' value={text}
                                onChange={(e: any) => { setText(e.target.value) }} />
                        </div>
                        <div className={st.addPost__container_deck_input}>
                            <input type="text" placeholder='Введите URL картинка' value={url}
                                onChange={(e: any) => { setUrl(e.target.value) }} />
                        </div>
                        <div className={st.addPost__container_btn} onClick={() => { setUrl('')
                                                                                    props.clickBtn(text, url) 
                                                                                    setText('')}}> Post</div>
                    </div>
                    <div className={st.addPost__container_img}> <Image imageUrl={url} isAvatar={false} /></div>
                </div>
            )
        }
        case 2: {
            return (
                <div className={st.addPost__container}>
                    <div className={st.addPost__container_deck}>
                        <div className={st.addPost__container_deck_input}>
                            <input type="text" placeholder='Введите название для картинка' value={text}
                                onChange={(e: any) => { setText(e.target.value) }} />
                        </div>
                        <div className={st.addPost__container_deck_input}>
                            <input type="text" placeholder='Введите URL картинка' value={url}
                                onChange={(e: any) => { setUrl(e.target.value) }} />
                        </div>
                        <div className={st.addPost__container_deck_buttons}>
                            <div className={st.addPost__container_btn + ' ' + st.btn2} onClick={() => { props.clickBtn(text, url, props.imageData?.id) }}> Change</div>
                            <div className={st.addPost__container_btn + ' ' + st.btn3} 
                                onClick={() => { (props.clickBtnDelete&&props.imageData)&&props.clickBtnDelete(props.imageData.id) }}> Delete
                            </div>
                        </div>
                    </div>
                    <div className={st.addPost__container_img}> <Image imageUrl={url} isAvatar={false} /></div>
                </div>
            )
        }
        default: {
            return (
                <div className={st.addPost__container}>
                    <div className={st.addPost__container_deck}>
                        <div className={st.addPost__container_deck_input}>
                            <input type="text" placeholder='Введите название для картинка' value={text}
                                disabled={true} onChange={() => {}} />
                        </div>
                        <div className={st.addPost__container_deck_input}>
                            <input type="text" placeholder='Введите URL картинка' value={url}
                                disabled={true} onChange={() => {}} />
                        </div>
                    </div>
                    <div className={st.addPost__container_img}> <Image imageUrl={url} isAvatar={false} /></div>
                </div>
            )
        }
    }

}

