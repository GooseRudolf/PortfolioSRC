import { Route, Routes } from "react-router-dom";
import st from './Main.module.scss'
import { RealMainPage } from "./MainPage/MainPage";
import { RealProfile } from "./ProfilePage/ProfilePage";
import { RealLogIn } from "./Authorization/LogIn/LogIn";
import { RealRegistration } from "./Authorization/Registration/Registration";
import { connect } from "react-redux";
import { setParagraphThunk } from "../../redux/reducers/uiReducer"; 
import { FC } from "react";
import { RealUser } from "./Users/Users";
import { RealSettings } from "./Settings/Settings";

interface PropsType{
    setParagraphThunk:(num:number)=>void
}

export const Main: FC<PropsType> = (props) => {
    return (
        <main className={st.main}>
            <Routes>
                <Route path='/' element={<RealMainPage setPar={props.setParagraphThunk}/>} />
                <Route path='/profile/:userId?' element={<RealProfile setPar={props.setParagraphThunk} />} />
                <Route path='/users/*' element={<RealUser setPar={props.setParagraphThunk}/>} />
                <Route path='/settings/*' element={<RealSettings setPar={props.setParagraphThunk}/>} />
                <Route path='/login/*' element={<RealLogIn/>} />
                <Route path='/registration/*' element={<RealRegistration/>} />
            </Routes>
        </main>
    )
}

export const RealMain = connect(null,{setParagraphThunk})(Main)