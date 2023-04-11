import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import Registration from "./Registration";
import SignInSide from "./SignInSide";

const Auth = () => (
    <Routes>
        <Route path="login" element={<SignInSide/>}/>
        <Route path="signInSide" element={<SignInSide/>}/>
        <Route path="registration" element={<Registration/>}/>
        <Route path="*" element={<Navigate to="signInSide"/>}/>
    </Routes>
)

export default Auth;