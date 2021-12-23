import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Typography, Grid, TextField } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepOrange[400],
    color: 'white',
  },
  addHead: {
    backgroundColor: 'green',
    color: 'white',
  },
  listHead: {
    backgroundColor: deepPurple[400],
    color: 'white',
  },
});
const Edit = () => {
  const classes = useStyles();
  return (
    <>
      <Box
        textAlign="center"
        mt={4}
        mb={2}
        className={classes.headingColor}
        p={2}
      >
        <Typography variant="h3">React Crud Json-server-MUI</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Box textAlign="center" p={2} mb={2} className={classes.addHead}>
              <Typography variant="h4">Add Student</Typography>
            </Box>

            <Box component="form" sx={{ p: 2, border: '1px dashed grey' }}>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12}>
                  <TextField
                    id="stuname"
                    name="stuname"
                    label="Student Name"
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    autoComplete="stuname"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
              </Grid>
              <Box m={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  ADD
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Edit;
