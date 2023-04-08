import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CircularStatic from "../../components/CircularStatic/CircularStatic";
import UserForListOfUsers from "./UserForListOfUsers";
import {Container } from "@mui/material";
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import Page404 from "../../components/Page404/Page404";
import PostForFeed from "./PostForFeed";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [inputValueLogin, setInputValueLogin] = useState('');

 
    useEffect(() => {
        api.getFeed()
            .then(posts => setPosts(posts))
            .finally(() => setIsLoading(false));
    }, [])

    

    // const handleChangeInputLogin = (e) => {
    //     const {value} = e.target
    //     api.getUsers(value)
    //     .then(users => setUsers(users))
    //     .finally(() => setIsLoading(false));
    // }

    // const handleDebouncedInputLogin = debounce(handleChangeInputLogin, 500);

    return (
        <>
        <Container maxWidth="sm" >
        {/* <TextField onChange={handleDebouncedInputLogin} id="outlined-search" label="Enter user login..." type="search"  sx={{width: '100%'}}/> */}
        </Container>
        <br />
        {isLoading ? <CircularStatic /> : (
            <div>
                {
                    !posts.length ?
                        <Page404/> :
                        // users.map(user => <User key={user._id} user={user} />)
                        posts.map(item => <PostForFeed key={item._id} item={item} />)
                        // posts.map(item => <li>{JSON.stringify(item)}</li>)
                }
            </div>
        )}
        </>
    )
}

export default Feed;