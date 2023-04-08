// import React, { useEffect, useState } from "react";
// import { useDispatch } from 'react-redux';
// import { loginThunk } from '../../store/thunks';
// import Auth from "../../containers/Auth";
// import Input from '../../components/Input';
// import InputPassword from '../../components/InputPassword';
// import { NavLink } from 'react-router-dom';


// const Login = () => {
//     const dispatch = useDispatch();
//     const [form, setForm] = useState({login: '', password: ''});
//     const [errors, setErrors] = useState({
//         login: null,
//         password: null,
//     });

//     useEffect(() => {
//         const errors = {};
//         if(form.login.length) {
//             errors.login = null;
//         } else {
//             errors.login = 'Login required!';
//         }

//         if(form.password.length) {
//             errors.password = null;
//         } else {
//             errors.password = 'Password required!';
//         }
//         setErrors(errors);
//     }, [form]);

//     const handleChange = (key, value) => {
//       setForm(prev => ({...prev, [key]: value}));
//     }

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       dispatch(loginThunk(form));
//     }

//     return (
//         <Auth>
//             <form onSubmit={handleSubmit}>
//                 <Input 
//                     label="Login"
//                     type="text" 
//                     placeholder='login' 
//                     onChange={(e) => handleChange('login', e.target.value)}
//                     error={errors.login}
//                 />
//                 <InputPassword
//                     label="Password"
//                     type="password"
//                     placeholder='password' 
//                     onChange={(e) => handleChange('password', e.target.value)}
//                     error={errors.password}
//                 />
//                 <button type='submit'>Login</button>
//             </form>
//             <NavLink to="/registration">Registration</NavLink>
//         </Auth>
//     )
// }

// export default Login;


import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../store/thunks';
import Auth from "../../containers/Auth";
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import { NavLink } from 'react-router-dom';
import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay";

const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState  } = useForm();

    const onSubmit = (data) => {
        dispatch(loginThunk(data));
    };

    const loginValidation = {
        required: {
            value: true,
            message: 'Login field is required!'
        },
        pattern: {
            value: /^[a-zA-Z0-9_]+$/i, //login consists of Latin letters, numbers and underscores
            message: 'Login consists of Latin letters, numbers and underscores'
        },
    }

    const passwordValidation = {
        required: {
            value: true,
            message: 'password field is required!'
        },
        pattern: {
            value: /^[a-zA-Z0-9_]+$/i, //login consists of Latin letters, numbers and underscores
            message: 'Password consists of Latin letters, numbers and underscores'
        },
    }

    return (
        <Auth>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Login"
                    type="text"
                    placeholder='login'
                    {...register("login", loginValidation)}
                    error={formState.errors.login}
                    helperText={formState.errors.login ? formState.errors.login.message : ''}
                    
                />
                <InputPassword
                    label="Password"
                    type="password"
                    placeholder='password'
                    {...register("password", passwordValidation)}
                    error={formState.errors.password}
                    helperText={formState.errors.password ? formState.errors.password.message : ''}
                />
                <button type='submit'>Login</button>
            </form>
            <NavLink to="/registration">Registration</NavLink>
        </Auth>
    )
}

export default Login;