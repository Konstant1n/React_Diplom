import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/selectors";
import { useForm } from "react-hook-form";
// import Input from '../../components/Input';
import { convertToBase64 } from "../../utils/convertToBase64";
import { updateCurrentUserThunk } from "../../store/thunks";
import { Container, Input } from "@mui/material";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DEFAULT_AVATAR = 'https://img.freepik.com/free-icon/user_318-159711.jpg';




const firstNameValidation = {
    required: {
        value: true,
        message: 'First name field is required!'
    },
    pattern: {
        // value: /^[A-Za-z]+$/i,   //only alphabetical characters in  Latin 
        value: /^[\p{L}]+$/ui,  //only alphabetical characters in either Latin or Cyrillic script:
        message: 'First name must contains only alphabet symbols!'
    },
};

const lastNameValidation = {
    required: {
        value: true,
        message: 'Last name field is required!'
    },
    pattern: {
        value: /^[\p{L}]+$/ui,
        message: 'Last name must contains only alphabet symbols!'
    },
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


const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [avatar, setAvatar] = useState(user.avatar)
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            login: user.login
        }
    });

    const onSubmit = (data) => {
        dispatch(updateCurrentUserThunk({ ...data, avatar }))
    }

    const handelAvatarChange = async (e) => {
        const base64Url = await convertToBase64(e.target.files[0]);
        e.target.value = null;
        setAvatar(base64Url);
    }


    return (

        <Container style={{
            display: 'flex', justifyContent: 'center', marginTop: '50px', gap: '25px'
        }}
            sx={{
                '@media (max-width: 400px)': {
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                },
            }}
        >

            <Box>
                <label>
                    <img style={{ width: 150 }} src={avatar || DEFAULT_AVATAR} alt="avatar" />
                    <input type="file" placeholder="avatar" onChange={handelAvatarChange} hidden />
                </label>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '350px' }}>
                    <TextField
                        label="First name"
                        type="text"
                        placeholder="firstName"
                        {...register('firstName', firstNameValidation)}
                        error={formState.errors.firstName}
                        helperText={formState.errors.firstName ? formState.errors.firstName.message : ''}
                        sx={{ display: 'block', width: '100%' }}
                    />


                    <TextField
                        label="Last name"
                        type="text"
                        placeholder="lastName"
                        {...register('lastName', lastNameValidation)}
                        error={formState.errors.lastName}
                        helperText={formState.errors.lastName ? formState.errors.lastName.message : ''}
                        sx={{ display: 'block' }}
                    />

                    <TextField
                        label="Login"
                        type="text"
                        placeholder="Login"
                        {...register('login', loginValidation)}
                        error={formState.errors.login}
                        helperText={formState.errors.login ? formState.errors.login.message : ''}
                        sx={{ display: 'block' }}
                    />

                    <TextField
                        label="Email"
                        type="text"
                        placeholder="Email"
                        {...register('email', emailValidation)}
                        error={formState.errors.email}
                        helperText={formState.errors.email ? formState.errors.email.message : ''}
                        sx={{ display: 'block' }}
                    />

                    <Button type="submit" variant="contained" disabled={!formState.isValid && formState.isSubmitted} >Save</Button>
                </Box>

            </form>
            <style jsx>{`
        .MuiOutlinedInput-root {
          width: 100%;
        }
        form {
            width: 270px;
        }
      `}</style>
        </Container>
    )
}

export default Profile;