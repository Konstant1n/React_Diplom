import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../store/thunks';
import Auth from "../../containers/Auth";
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState } = useForm();

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

    // const passwordValidation = {
    //     required: {
    //         value: true,
    //         message: 'password field is required!'
    //     },
    //     pattern: {
    //         value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/б,
    //         // value: /^[a-zA-Z0-9_]+$/i, //login consists of Latin letters, numbers and underscores
    //         // message: 'Password consists of Latin letters, numbers and underscores'
    //         message: 'Password" must has min 8 symbols, max 16 symbols, only digital letters and literal letters'
    //     },
    // }

    const passwordValidation = {
        required: {
            value: true,
            message: 'Password field is required!'
        },
        pattern: [
            {
              value: /^(?=.*[a-zA-Z\d])[a-zA-Z\d]{8,16}$/,
              message: 'Password must have min 8 symbols, max 16 symbols, only digital letters and literal letters'
            },
            {
            //   value: /^.{8,}$/,
              value: '11111111',
              message: 'Password must be at least 8 characters long'
            }
          ]
    };




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