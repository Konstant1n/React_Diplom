import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CircularStatic from "../../components/CircularStatic/CircularStatic";
import { Container, Typography, TextField, IconButton, Box } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import Comment from "../CommentForComments/Comment";

const Comments = (post) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        api.getComments(post.post)
            .then(comments => setComments(comments))
            .finally(() => setIsLoading(false));
    }, []);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        console.log(`Comment submitted: ${commentText}`);
        setCommentText('');
    
        const data = {
            postId: post.post._id,
            text: commentText
        };

        console.log(data);
    
        api.createComment(data)
            .then(newComment => setComments([...comments, newComment]))
            .catch(err => console.log(err));
    };

    const handleCommentTextChange = (event) => {
        setCommentText(event.target.value);
    };

    return (
        <Container>
            <br />
            <Box sx={{ position: 'relative' }}>
                        <form onSubmit={handleCommentSubmit}>
                            <TextField
                                fullWidth
                                label="Add a comment"
                                variant="outlined"
                                margin="normal"
                                value={commentText}
                                onChange={handleCommentTextChange}
                            />
                            <IconButton sx={{ position: 'absolute', bottom: 16, right: 9,  }} color="primary" type="submit">
                                <SendIcon />
                            </IconButton>
                        </form>
                    </Box>

            {isLoading ? <CircularStatic /> : (
                <>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment
                                key={comment.id}
                                createdAt={comment.createdAt}
                                owner={comment.owner}
                                text={comment.text}
                                id={comment.id}
                            />
                        ))
                    ) : (
                        <Typography variant="h6">No comments yet</Typography>
                    )}

                </>
            )}
        </Container>
    )
}

export default Comments;
