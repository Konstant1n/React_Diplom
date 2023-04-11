import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useState } from 'react';
import api from '../../services/api';
import useIndificate from '../../hooks/useIndificate';
import { toast } from 'react-toastify';

const Comment = ({ createdAt, owner, text, id, setComments, comments }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newCommentText, setNewCommentText] = useState(text);

    const handleDelete = () => {
        api.deleteComment(id).then(() => {
            const newComments = comments.filter(comment => comment.id !== id);
            setComments(newComments);
        })
    }

    const handleEdit = () => {
        text = {
            text: newCommentText
        }
      
        api.editComment(id, text).then(() => {
            toast.success('Post successfully updated');
            const newComments = comments.map(comment => {
                if (comment.id === id) {
                    return {
                        ...comment,
                        text: newCommentText,
                    };
                } else {
                    return comment;
                }

            });
            setComments(newComments);
            setIsEditing(false);
        });
    }

    const isMyComment = useIndificate(owner.id);

    return (
        <>
            <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '4px', mb: '15px', position: 'relative' }}>
                <Avatar src={owner.avatar} sx={{ width: 50, height: 50, mr: '35px' }} />
                <Typography variant="subtitle1">{owner.firstName} {owner.lastName}</Typography>
                <Typography variant="subtitle2">{owner.login}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{createdAt}</Typography>

                {isEditing ? (
                    <TextField
                        value={newCommentText}
                        onChange={event => setNewCommentText(event.target.value)}
                        multiline
                        fullWidth
                        autoFocus
                        margin="normal"
                    />
                ) : (
                    <Typography variant="body1">{text}</Typography>
                )}

                {isMyComment && !isEditing && (
                    <>
                        <IconButton
                            aria-label="edit"
                            onClick={() => {
                                setIsEditing(true);
                                setNewCommentText(text);
                            }}
                            sx={{ position: 'absolute', top: '6px', right: '36px' }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={() => setDialogOpen(true)}
                            sx={{ position: 'absolute', top: '6px', right: '4px' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
                {isMyComment && isEditing && (
                    <>
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={() => handleEdit()}>Save</Button>
                    </>
                )}
            </Box>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Do you really want to delete your comment?</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{text}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button color="error" onClick={() => {
                        setDialogOpen(false);
                        handleDelete(id);
                    }} autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>

        </>

    );
};

export default Comment;