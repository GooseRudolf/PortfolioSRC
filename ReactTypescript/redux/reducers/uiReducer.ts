import { createSlice } from '@reduxjs/toolkit'
import { profileApi, userApi } from '../../api/api'
import { setUser } from './authReducer'
import { getUsersByIdThunk } from './usersReducer'
type actionType = {
    type:string
    payload:any
}

const uiSlice = createSlice({
    name:'ui',
    initialState:{
        isFetching:false,
        menuParagrph:0,
        personalTheme:{
            black_color:'#1b1a22',
            blue_color:'#242230',
            pink_color:'#dd214c',
            white_color:'#ffffff',
        },
        works:[{id:0}],
        idWork:0
    },
    reducers:{
        setMenuParagrph(state, action:actionType){
            state.menuParagrph = action.payload
        },
        setIsFetching(state, action:actionType){
            state.isFetching = action.payload
        },
        setColor(state, action:actionType){
            state.personalTheme = {...action.payload}
        },
        setIdWork(state, action:actionType){
            state.idWork = action.payload
        },
        setWorks(state, action:actionType){
            state.works = action.payload
        },
        addWork(state, action:actionType){
            action.payload[0].id = ++state.idWork
            state.works = state.works.concat(action.payload)
        }
    }
})
const { setMenuParagrph, setWorks, addWork, setIdWork} = uiSlice.actions
export const { setIsFetching, setColor} = uiSlice.actions
export const uiReducer = uiSlice.reducer

export const setParagraphThunk = (numberParagraph:number) => {
    return (dispatch: Function) => {
        dispatch(setMenuParagrph(numberParagraph))
    }
}

export const setColorThunk = (idUser:number, theme:any) => {//change any
    return async(dispatch: Function) => {
        await profileApi.setThtme(idUser, theme)
        dispatch(setColor(theme))
    }
}

export const setUserThunk = (idUser:number, user:any) => {//change any
    return async(dispatch: Function) => {
        await profileApi.setUser(idUser, user)
        dispatch(setUser(user))
    }
}

export const setNewWorkThunk = (idUser:number, newWork:any) => {//change any
    return async(dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await userApi.getUsersById(idUser)
        let max = (result.works.length!==0)?(result.works.reduce((acc:any, curr:any) => acc.id > curr.id ? acc : curr)).id:-1
        newWork.id = max+1
        result.works.push(newWork)
        await profileApi.setWorks(idUser, result.works)
        dispatch(getUsersByIdThunk(idUser))

        const tmp = [{ 
            login:result.login, avatar:result.avatarUrl, 
            title:newWork.title,url:newWork.url,id:100 }]
        dispatch(addWork(tmp))

        dispatch(setIsFetching(false))
    }
}

export const updateWorkThunk = (idUser:number, newWork:any) => {//change any
    return async(dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await userApi.getUsersById(idUser)
        result.works.forEach((item:any, i:number)=> {
            if(item.id === newWork.id){
                item.title = newWork.title
                item.url = newWork.url
            }
          });
        await profileApi.setWorks(idUser, result.works)
        dispatch(getUsersByIdThunk(idUser))
        dispatch(setIsFetching(false))
    }
}
export const deleteWorkThunk = (idUser:number, idWork:number) => {//change any
    return async(dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await userApi.getUsersById(idUser)
        const filteredWorks = result.works.filter((elem:any) => elem.id !== idWork);
        await profileApi.setWorks(idUser, filteredWorks)
        dispatch(getUsersByIdThunk(idUser))
        dispatch(setIsFetching(false))
    }
}

export const getRundomWorksThunk = () => {//change any
    return async(dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await userApi.getUsers()
        let resultMass:Array<any> = []
        const tmp = { login:'', avatar:'', title:'',url:'',id:0 }
        let id = 0
        result.forEach((e:any)=>{
            tmp.login = e.login
            tmp.avatar = e.avatarUrl
            e.works.forEach((w:any)=>{
                tmp.title = w.title
                tmp.url = w.url
                tmp.id = id++
                resultMass.push({...tmp})
            })
        })
        dispatch(setIdWork(id))
        dispatch(setWorks(shuffle([...resultMass])))
        dispatch(setIsFetching(false))
    }
}

const shuffle = (array:any) => {
    let m = array.length, i;
    let t
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }



