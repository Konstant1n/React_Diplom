import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import api from "../../services/api";
import CircularStatic from "../../components/CircularStatic/CircularStatic";
import { Container } from "@mui/material";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useNavigation } from "react-router-dom";
import Button from '@mui/material/Button';





const PostInModal = ({ post }) => {
    const navigate = useNavigate();
    const [isShowLikes, setIsShowLikes] = useState(false);


    if (!post) {
        return (
            <>
                <CircularStatic />
                <h1>Post not found</h1>
            </>
        )
    }

    const [firstLikedUser = null, ...likes] = post.likes;

    const handleOpenPagePosts = () => {
        navigate('/post/'+post._id);
    }
    

    return (

       

        <Container sx={{ display: 'flex', width: '700px', padding: '0!important' }}>
            <Box sx={{ width: '60%' }}>
                <img
                    src={`${post.imgUrl}`}
                    alt={post.title}
                    loading="lazy"
                    width={'100%'}
                />
            </Box>
            <Box sx={{ width: '40%', display: 'flex', justifyContent: 'start', alignContent: 'center', paddingTop: '15px', flexDirection: 'column'}}>
                <Typography gutterBottom variant="h4" component="div" sx={{textAlign: 'center'}} >
                {post.title}
                <Divider />
                </Typography>
                

                
                <Typography gutterBottom variant="h6" component="div" sx={{textAlign: 'center'}} >
                {!isShowLikes ? (
                    <p
                        onClick={() => setIsShowLikes(true)}
                    >
                        {
                            post.likes.length ? (
                                <span>Likes: {firstLikedUser && <NavLink to={`/users/${firstLikedUser._id}`}>{firstLikedUser.login}</NavLink>} and {likes.length ? likes.length : 0}</span>
                            ) : (
                                <p>No Likes</p>
                            )
                        }
                    </p>
                ) : (
                    <ul>
                        <button onClick={() => setIsShowLikes(false)}>Hide</button>
                        {post.likes.map(like => <li key={like._id}><NavLink to={`/users/${like._id}`}>{like.login}</NavLink></li>)}
                    </ul>
                )}
                 </Typography>
                 <Button variant="contained" onClick={handleOpenPagePosts} sx={{width: '80%', margin: '0 auto'}  }>Open Post</Button>

            </Box>
        </Container>
    )
}

export default PostInModal;