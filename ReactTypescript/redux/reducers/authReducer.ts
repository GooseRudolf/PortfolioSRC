import { createSlice } from '@reduxjs/toolkit'
import { authApi} from '../../api/api'
import { setColorThunk, setIsFetching } from './uiReducer'
import { setColor } from './uiReducer'  

type actionType = {
    type:string
    payload:any
}

const authSlice = createSlice({
    name:'auth',
    initialState:{
        isAuth:false,
        userId:null,
        user:{
            login:'',
            avatarUrl:'',
            aboutMe:'',
            banerUrl:''
        }
    },
    reducers:{
        setIsAuth(state, action:actionType){
            state.isAuth = action.payload
        },
        setUser(state, action:actionType){
            state.user = action.payload
        },
        setUserId(state, action:actionType){
            state.userId = action.payload
        }
    }
})
const { setIsAuth, setUserId} = authSlice.actions
export const { setUser }= authSlice.actions
export const authReducer = authSlice.reducer


export const registrationThunk  = (login:string, password:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const result = await authApi.logAuth(login, password)
        if (result.status === 201){
            dispatch(setUserId(result.data.id))
            dispatch(setColorThunk(result.data.id, {
                black_color:'#1b1a22',
                blue_color:'#242230',
                pink_color:'#dd214c',
                white_color:'#ffffff',
            }))
            dispatch(setIsAuth(true))
            dispatch(setUser({login:login,avatarUrl:'',banerUrl:''}))
            dispatch(setIsFetching(false))
            return 1
        }
        dispatch(setIsFetching(false))
        return 0
    }
}

export const logInThunk = (login:string, password:string)=>{
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        const logins = await authApi.getLogins()
        const result = logins.find((el:any)=>((el.login === login) && (el.password === password))) 
        if(result){
            dispatch(setUserId(result.id))
            dispatch(setIsAuth(true))
            dispatch(setUser({login:login, avatarUrl:result.avatarUrl, aboutMe:result.aboutMe, banerUrl:result.banerUrl}))
            dispatch(setColor(result.theme))
            dispatch(setIsFetching(false))
            return 1
        }
        dispatch(setIsFetching(false))
        return 0
    }
}

export const logOutThunk = ()=>{
    return async (dispatch: Function) => {
        dispatch(setIsAuth(false))
        dispatch(setColor({
            black_color:'#1b1a22',
            blue_color:'#242230',
            pink_color:'#dd214c',
            white_color:'#ffffff',
        }))
        dispatch(setUser({login:'',avatarUrl:''}))
    }
}

