import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../api/api'
import { setIsFetching } from './uiReducer'

type actionType = {
    type:string
    payload:any
}

const userSlice = createSlice({
    name:'users',
    initialState:{
        users:[],
        activeUser:{
            login:null,
            avatarUrl:null
        }
    },
    reducers:{
        setUsers(state, action:actionType){
            state.users = action.payload
        },
        setActiveUser(state, action:actionType){
            state.activeUser = action.payload
        }
    }
})
const { setUsers, setActiveUser } = userSlice.actions
export const userReducer = userSlice.reducer

export const getUsersThunk = () => {
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        dispatch(setUsers( await userApi.getUsers()))
        dispatch(setIsFetching(false))
    }
}

export const getUsersByIdThunk = (id:number) => {
    return async (dispatch: Function) => {
        dispatch(setIsFetching(true))
        dispatch(setActiveUser( await userApi.getUsersById(id)))
        dispatch(setIsFetching(false))
    }
}




