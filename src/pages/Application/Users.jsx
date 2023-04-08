import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CircularStatic from "../../components/CircularStatic/CircularStatic";
import UserForListOfUsers from "./UserForListOfUsers";
import {Container } from "@mui/material";
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import Page404 from "../../components/Page404/Page404";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [inputValueLogin, setInputValueLogin] = useState('');

 
    useEffect(() => {
        api.getUsers()
            .then(users => setUsers(users))
            .finally(() => setIsLoading(false));
    }, [])

    

    const handleChangeInputLogin = (e) => {
        const {value} = e.target
        api.getUsers(value)
        .then(users => setUsers(users))
        .finally(() => setIsLoading(false));
    }

    const handleDebouncedInputLogin = debounce(handleChangeInputLogin, 500);

    return (
        <>
        <Container maxWidth="sm" >
        <TextField onChange={handleDebouncedInputLogin} id="outlined-search" label="Enter user login..." type="search"  sx={{width: '100%'}}/>
        </Container>
        <br />
        {isLoading ? <CircularStatic /> : (
            <div>
                {
                    !users.length ?
                        <Page404/> :
                        // users.map(user => <User key={user._id} user={user} />)
                        users.map(user => <UserForListOfUsers key={user._id} user={user} users={users} setUsers={setUsers} />)
                }
            </div>
        )}
        </>
    )
}

export default Users;