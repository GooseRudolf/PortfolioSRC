import axios from 'axios'
const instance = axios.create({
    baseURL:'https://6523f436ea560a22a4e91c67.mockapi.io/users'
    //withCredentials:true
})

export const authApi = {
    getLogins(){
        return instance.get('').then(response=>response.data)
    },
    logAuth(login:string, password:string){
        return instance.post('',{login, password})
    }
}

export const userApi = {
    getUsers(){
        return instance.get('').then(response=>response.data)//users
    },
    getUsersById(id: number){
        return instance.get('/'+id).then(response=>response.data)//users
    }
}

export const profileApi = {
    setThtme(id: number, theme:any){
        return instance.put('/'+id,{theme}).then(response=>response.data)
    },
    setUser(id: number, user:any){
        return instance.put('/'+id,{...user}).then(response=>response.data)
    },
    setWorks(id: number, works:Array<any>){
        return instance.put('/'+id, {works}).then(response=>response.data)
    }
}