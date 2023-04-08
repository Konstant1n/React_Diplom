import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Page404() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md" >
        <Grid container spacing={2} sx={{flexDirection: 'column', alignContent: 'center'}}>
          <Grid xs={6}>
            <Typography variant="h1"sx={{textAlign: 'center'}}>
              404
            </Typography>
            <Typography variant="h6" sx={{textAlign: 'center'}}>
              The page you’re looking for doesn’t exist.
            </Typography>
            {/* <Button variant="contained">Back Home</Button> */}
          </Grid>
          <Grid xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}