import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Comment = ({ createdAt, owner, text, id }) => {
    return (
        <>
            
            <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '4px', mb: '15px' }}>
                <Avatar
                    src={owner.avatar}
                    sx={{ width: 50, height: 50, mr: '35px' }}
                />
                <Typography variant="subtitle1">{owner.firstName} {owner.lastName}</Typography>
                <Typography variant="subtitle1">{owner.login}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{createdAt}</Typography>
                <Typography variant="body1">{text}</Typography>
            </Box>
        </>

    );
};

export default Comment;