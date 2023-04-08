// import React, { useState } from "react";
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// import { NavLink } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import api from "../../services/api";
// import { useForm } from "react-hook-form";

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Hipstagram
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }


// const theme = createTheme();

// const emailValidation = {
//     required: {
//         value: true,
//         message: 'Email field is required!'
//     },
//     pattern: {
//         value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(("[^"]+")))+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/,
//         message: 'Incorrect email address'
//     },
// }


// export default function Registration() {
//     const dispatch = useDispatch();
//     const { register, handleSubmit, formState } = useForm();

//     // const onSubmit = (data) => {
//     //     dispatch(loginThunk(data))
//     // };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//           await api.registration(data);
//           navigate('/login');
//         } catch (err) {
//           setApiError(err.response.data);
//         }
//       }

import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, NavLink } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from "../../services/api";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Hipstagram
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();



export default function Registration() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm();

    const onSubmit = async (data) => {
        try {
            await api.registration(data);
            toast.success('Registration was successful');
            navigate('/SignInSide');
        } catch (err) {
            toast.error(err.response.data,)
            setApiError(err.response.data);
        }
    }

    const emailValidation = {
        required: {
            value: true,
            message: 'Email field is required!'
        },
        pattern: {
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(("[^"]+")))+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/,
            message: 'Incorrect email address'
        },
    }

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

    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState(null);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        key='shapka'
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h2" variant="h2">
                            Hipstagram
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box key='regForm' component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"

                                fullWidth
                                label="Login"
                                type="text"
                                placeholder='login'
                                {...register("login", loginValidation)}
                                error={formState.errors.login}
                                helperText={formState.errors.login ? formState.errors.login.message : ''}
                            />

                            <TextField
                                margin="normal"

                                fullWidth
                                label="Email"
                                type="text"
                                placeholder='email'
                                {...register("email", emailValidation)}
                                error={formState.errors.email}
                                helperText={formState.errors.email ? formState.errors.email.message : ''}
                            />


                            <TextField
                                margin="normal"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                fullWidth
                                placeholder='password'
                                {...register("password", passwordValidation)}
                                error={formState.errors.password}
                                helperText={formState.errors.password ? formState.errors.password.message : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        <NavLink to="/SignInSide">Go to login</NavLink>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}


