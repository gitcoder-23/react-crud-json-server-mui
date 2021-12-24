import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, Typography, Grid, TextField } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import List from './List';
import axios from 'axios';
import { rootApiUrl } from '../constants';

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
const Home = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [status, setStatus] = useState();
  const [studentState, setStudentState] = useState({
    id: uuidv4(),
    stuname: '',
    email: '',
  });
  const onTextFieldChange = (e) => {
    setStudentState({
      ...studentState,
      [e.target.name]: e.target.value,
    });
    // console.log('onTextFieldChange', studentState);
  };
  // or
  // function onFieldChange(e) {
  //   setAddState({
  //     stuname: e.target.value,
  //     email: e.target.value,
  //   });
  // }

  const addStuClick = async (e) => {
    e.preventDefault();
    if (!studentState.stuname || !studentState.email) {
      setError('Please fill all fields..');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      try {
        const addOps = await axios.post(`${rootApiUrl}/students`, studentState);
        // console.log('addOps', addOps);
        // for add and list auto show
        setStatus(true);
        setStudentState({
          stuname: '',
          email: '',
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (status) {
    return <Home />;
  }
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
                    onChange={(e) => onTextFieldChange(e)}
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
                    onChange={(e) => onTextFieldChange(e)}
                  />
                </Grid>
              </Grid>
              <Box m={3}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => addStuClick(e)}
                >
                  ADD
                </Button>
              </Box>
              {error && <h3 style={{ color: 'red' }}>{error}</h3>}
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box textAlign="center" p={2} mb={2} className={classes.listHead}>
              <Typography variant="h4">Student List</Typography>
            </Box>
            {/* List Component */}
            <List />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
