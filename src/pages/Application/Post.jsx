// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, NavLink } from 'react-router-dom';
// import api from "../../services/api";
// import CircularStatic from "../../components/CircularStatic/CircularStatic";
// import { Container } from "@mui/material";
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';

// const Post = () => {
//     const { postId } = useParams();
//     const navigate = useNavigate();
//     const [post, setPost] = useState(post);
//     const [isShowLikes, setIsShowLikes] = useState(false);
//     console.log(post);
//     useEffect(() => {
//         api.getPostById(postId)
//             .then(data => {
//                 setPost(data);
//             })
//     }, [])

//     const handleClickBack = () => navigate(-1);

//     if (!post) {
//         return (
//             <>
//                 <CircularStatic />
//                 <h1>Post not found</h1>
//             </>
//         )
//     }

//     const [firstLikedUser = null, ...likes] = post.likes;

//     return (
//         <Container sx={{ display: 'flex', width: '700px', padding: '0!important' }}>
//             {/* <button onClick={handleClickBack}>Back</button> */}
//             <Box sx={{ width: '60%' }}>
//                 <img
//                     src={`${post.imgUrl}`}
//                     alt={post.title}
//                     loading="lazy"
//                     width={'100%'}
//                 />
//             </Box>
//             <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
//                 <Typography gutterBottom variant="h4" component="div">
//                 {post.title}
//                 </Typography>
//                 <Divider />

//                 {/* {!isShowLikes ? (
//                     <p
//                         onClick={() => setIsShowLikes(true)}
//                     >
//                         {
//                             post.likes.length ? (
//                                 <span>Likes: {firstLikedUser && <NavLink to={`/users/${firstLikedUser._id}`}>{firstLikedUser.login}</NavLink>} and {likes.length ? likes.length : 0}</span>
//                             ) : (
//                                 <p>No Likes</p>
//                             )
//                         }
//                     </p>
//                 ) : (
//                     <ul>
//                         <button onClick={() => setIsShowLikes(false)}>Hide</button>
//                         {post.likes.map(like => <li key={like._id}><NavLink to={`/users/${like._id}`}>{like.login}</NavLink></li>)}
//                     </ul>
//                 )} */}

//             </Box>

//             {/* <img style={{maxWidth: 300,}} src={post.imgUrl} alt="post" /> */}

//         </Container>
//     )
// }

// export default Post;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import api from "../../services/api";

const Post = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isShowLikes, setIsShowLikes] = useState(false);

    useEffect(() => {
        api.getPostById(postId)
            .then(data => {
                setPost(data);
            })
    }, [])

    const handleClickBack = () => navigate(-1);

    // if(!post) {
    //     return (
    //         setTimeout(() => alert('<h1>Post not found</h1'), 1000);
                   
        
    //     )

    // }

    if (!post) {
        setTimeout(() => <h1>Post not found</h1>, 2000);
        return null;
      }

    const [firstLikedUser=null, ...likes] = post.likes;

    return (
        <div>
            <button onClick={handleClickBack}>Back</button>
            <h1>POST: {post.title}</h1>
            <img style={{maxWidth: 300,}} src={post.imgUrl} alt="post" />
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
                    {post.likes.map(like => <li key={like.id}><NavLink to={`/users/${like._id}`}>{like.login}</NavLink></li>)}
                </ul>
            )}
        </div>
    )
}

export default Post;