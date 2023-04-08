import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Registration from "./Registration";
import SignInSide from "./SignInSide";

const Auth = () => (
    <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="signInSide" element={<SignInSide/>}/>
        <Route path="registration" element={<Registration/>}/>
        <Route path="*" element={<Navigate to="signInSide"/>}/>
    </Routes>
)

export default Auth;