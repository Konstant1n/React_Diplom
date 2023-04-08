import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import api from "../../services/api";
import { Container, Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';

const StyledFavoriteIcon = styled(FavoriteIcon)({
    fontSize: '3rem',
    color: 'red',
    padding: '0.2rem',
});

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)({
    fontSize: '3rem',
    padding: '0.2rem',
    color: 'red',
});



const PostForFeed = (item) => {
    // const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(item.item);
    const [isShowLikes, setIsShowLikes] = useState(false);
    const [toggleLike, setToggleLike] = useState(false);

    // useEffect(() => {
    //     api.getPostById(postId)
    //         .then(data => {
    //             setPost(data);
    //         })
    // }, [])

    // const handleClickBack = () => navigate(-1);


    // if (!post) {
    //     setTimeout(() => <h1>Post not found</h1>, 2000);    //Bug fix - crutch
    //     return null;
    // }

    const [firstLikedUser = null, ...likes] = post.likes;

    

    const handleLike = () => {
        setToggleLike(!toggleLike)
        api.handleLike(post)
            .then(data => {
                toast.success('Liked');

            })
            .catch(err => {
                toast.error(err.response.data,)
            })
        
    }

    return (
        <Container maxWidth="md">
            {/* <Button onClick={handleClickBack} variant="contained" color="primary">Back</Button> */}
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>{post.title}</Typography>
            <Box>
                <img style={{ width: '100%' }} src={post.imgUrl} alt="post" />
            </Box>
            <StyledFavoriteBorderIcon onClick={handleLike} />
            {/* <StyledFavoriteIcon /> */}
            {!isShowLikes ? (
                <Typography onClick={() => setIsShowLikes(true)} component="p">
                    {post.likes.length ? (
                        <span>Likes: {firstLikedUser && <NavLink to={`/users/${firstLikedUser._id}`}>{firstLikedUser.login}</NavLink>} and {likes.length ? likes.length : 0}</span>
                    ) : (
                        <span>No Likes</span>
                    )}
                </Typography>
            ) : (
                <div>
                    <Button onClick={() => setIsShowLikes(false)} variant="contained" color="primary">Hide</Button>
                    <List>
                        {post.likes.map((like) => (
                            <ListItem key={like.id} button component={NavLink} to={`/users/${like._id}`}>
                                <ListItemText primary={like.login} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            )}
        </Container>
    );
}

export default PostForFeed;