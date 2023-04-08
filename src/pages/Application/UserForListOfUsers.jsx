import React from "react";
import api from "../../services/api";
import { NavLink } from 'react-router-dom';
import { Avatar, Container } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const UserForListOfUsers = ({ user, users, setUsers }) => {



    const handleClick = () => {


        api.handleChangeFollow(user);

        const newUsers = users.map(u => {
            if (u._id === user._id) {
                return { ...u, isFollow: !u.isFollow }
            }
            return u;
        });
        setUsers(newUsers);
    };

    return (
        <>
            <Container maxWidth="sm" >
                <Box sx={{ width: '100%', paddingTop: '20px' }}>

                    <Stack spacing={2}>
                        <Item sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>

                            <NavLink
                                to={{
                                    pathname: `/users/${user._id}`,
                                    state: { users },
                                }}>
                                {/* Open profile: {user.login} */}

                                <Avatar
                                    src={user.avatar}
                                    sx={{ width: 56, height: 56, mr: '20px' }}
                                />
                            </NavLink>

                                
                            <ListItemText primary={user.firstName + ' ' + user.lastName} secondary={user.login} sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column'  }} />


                            {user.isFollow ?
                                <Button

                                    onClick={() => {
                                        handleClick();
                                    }}
                                    variant="contained" sx={{ height: '35px', width: '106px' }}>
                                    Unfollow
                                </Button> :
                                <Button
                                    onClick={() => {
                                        handleClick();
                                    }}
                                    variant="outlined" color="error" sx={{ height: '35px', width: '106px' }}>
                                    Follow
                                </Button>}


                        </Item>


                    </Stack>

                </Box>
            </Container>
        </>
    )
}

export default UserForListOfUsers;