import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useParams } from "react-router-dom";
import api from "../../services/api";
import PostCard from "../../components/PostCard";
import { useIndificate } from "../../hooks";
// import Button from '../../components/Button';
import Input from "../../components/Input";
import { Avatar, Container } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import MasonryImageList from "../../components/MasonryImageList/MasonryImageList";
import Page404 from "../../components/Page404/Page404";

import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const UploadPost = ({
    handleAddPost
}) => {
    const [isOpenForm, setIsOpenForm] = useState(false);

    const handleOpenForm = () => setIsOpenForm(true);

    const handleCloseForm = () => setIsOpenForm(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, image } = e.target.elements;
        const body = {
            title: title.value,
            image: image.files[0],
        }

        api.createPost(body)
            .then(data => {
                handleAddPost(data);
                toast.success('The post was added successfully');
                handleCloseForm();
            })
            .catch(err => {
                toast.error(err.response.data,)
                // alert(err.message);
            })
    }

    if (!isOpenForm) {
        return (
            <Button onClick={handleOpenForm} variant="contained" sx={{ height: '35px', width: '106px', mt: '30px', mb: '30px' }}>Add post</Button>
        )
    }

    return (
        // <form onSubmit={handleSubmit}>
        //     <br />
        //     <button onClick={handleCloseForm} type="button">Cancel</button>
        //     <Input name="title" label="Title" type="text" placeholder="Title..." />
        //     <Input name="image" label="Photo" type="file" placeholder="Photo..." />
        //     <button type="submit">Create post</button>
        //     <br />
        // </form>
        <form onSubmit={handleSubmit}>
            <>
                <br />
                <Typography variant="h3" component="h3" sx={{ textAlign: 'center' }}>
                    Add post:
                </Typography>

                <Box sx={{ display: 'flex !important', flexDirection: 'column' }}>

                    <TextField
                        margin="normal"
                        fullWidth
                        name="title"
                        label="Title"
                        variant="outlined"
                        placeholder="Title..."
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="image"
                        type="file"
                        variant="outlined"
                        placeholder="Photo..."
                        sx={{mb: '25px'}}
                    />

                    <Button onClick={handleCloseForm} variant="contained" type="button" color="error" >
                        Cancel
                    </Button>

                    <Button type="submit" variant="contained" sx={{ mt: 2 }} color="success">
                        Create post
                    </Button>

                </Box>
                <br />
            </>
        </form >
    )
}

const User = (props) => {


    const params = useParams();
    const isPersonalPage = useIndificate(params.userId);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleAddPost = (post) => {
        const newUser = {
            ...user,
            posts: [...user.posts, post],
        }

        setUser(newUser);
    }


    useEffect(() => {
        api.getUserById(params.userId)
            .then(user => setUser(user))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [])

    if (isLoading) return

    // const handleClick = () => {
    // };



    return (
        <>
            <Container maxWidth="md" >
                {/* <Button

                    onClick={() => {
                    }}
                    variant="contained" sx={{ height: '35px', width: '106px' }}>
                    Back
                </Button>

                <NavLink to="/users">Users</NavLink> */}


                {
                    !user ?
                        // <h1>User  not found</h1>
                        <Page404 /> :
                        (
                            <Box sx={{ width: '100%', mt: '35px' }}>
                                <Stack spacing={2}>
                                    <Item sx={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>

                                        <Avatar
                                            src={user.avatar}
                                            sx={{ width: 150, height: 150, mr: '35px' }}
                                        />
                                        <Box sx={{ width: '100%' }} >
                                            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: "start", alignItems: 'center' }}>
                                                <ListItem sx={{ display: 'flex', alignItems: 'left' }}>
                                                    <ListItemText primary={user.firstName + ' ' + user.lastName} secondary={user.login} sx={{ display: 'block' }} />
                                                </ListItem>

                                                <ListItem sx={{ display: 'block', alignItems: 'left' }}>
                                                    <ListItemText primary={user.posts.length + ' ' + 'posts'} sx={{ display: 'flex', alignItems: 'left' }} />
                                                    <ListItemText primary={user.followersCount + ' ' + 'followers'} sx={{ display: 'flex', alignItems: 'left' }} />
                                                    <ListItemText primary={user.followingsCount + ' ' + 'followings'} sx={{ display: 'flex', alignItems: 'left' }} />
                                                </ListItem>
                                            </Box>
                                            {/* {user._id} */}
                                            {/* 
                                            {user.isFollow ?
                                                <Button

                                                onClick={() => {
                                                    handleClick();
                                                }}
                                                    variant="contained" sx={{ height: '50px', width: '100%', mb: '35px' }}>
                                                    Unfollow
                                                </Button> :
                                                <Button
                                                onClick={() => {
                                                    handleClick();
                                                }}
                                                    variant="outlined" color="error" sx={{ height: '50px', width: '100%' }}>
                                                    Follow
                                                </Button>} */}


                                        </Box>

                                    </Item>



                                </Stack>
                                {isPersonalPage && <UploadPost handleAddPost={handleAddPost} sx={{ height: '50px', width: '100%', mb: '35px' }} />}




                                {/* <p>Posts:</p>
                                <div className="posts">
                                    {user.posts.map(post => <PostCard key={post._id} post={post} />)}
                                </div> */}
                                <MasonryImageList user={user} />
                            </Box>

                        )
                }
            </Container>
        </>

    )
}

export default User;