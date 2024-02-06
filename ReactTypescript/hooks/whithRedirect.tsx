import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToPropsRedirect = (state:any)=>({
    isAuth:state.auth.isAuth
})

export const  withRedirect = (Component:any) => { 
    const RedirectConponent =(props:any)=>{
        if(!props.isAuth) return <Navigate to={'/login'}/>
        return <Component {...props}/>
    }
    const ConnectRedirectComponent = connect(mapStateToPropsRedirect)(RedirectConponent)
    return ConnectRedirectComponent
}
