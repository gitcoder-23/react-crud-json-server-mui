import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Typography, Grid, TextField } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
const Edit = () => {
  const classes = useStyles();
  const history = useHistory();
  const { stuId } = useParams();
  const [loadingState, setLoadingState] = useState(false);

  const [student, setStudent] = useState({
    stuname: '',
    email: '',
  });

  const getStudent = async () => {
    try {
      const oneStudent = await axios.get(`${rootApiUrl}/students/${stuId}`);
      console.log('oneStudent', oneStudent);
      const { data, status } = oneStudent;
      setLoadingState(true);
      if (status == 200) {
        setTimeout(() => {
          setLoadingState(false);
          setStudent(data);
        }, 600);
      }
    } catch (error) {
      console.log('Something went wrong!');
    }
  };

  const onTextFieldChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
    // console.log('onTextFieldChange', student);
  };

  const upDateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateApi = await axios.put(
        `${rootApiUrl}/students/${stuId}`,
        student
      );
      history.push('/');
    } catch (error) {
      console.log('Something went worong!');
    }
  };
  React.useEffect(() => {
    getStudent();
  }, [stuId]);

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
              <Typography variant="h4">Edit Student</Typography>
              <Button variant="contained" onClick={() => history.push('/')}>
                Back To Home
              </Button>
            </Box>

            <Box component="form" sx={{ p: 2, border: '1px dashed grey' }}>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12}>
                  <TextField
                    id="id"
                    name="id"
                    label="Student Id"
                    variant="outlined"
                    autoFocus
                    required
                    fullWidth
                    disabled
                    // value={student.id}
                    value={stuId}
                  />
                </Grid>
              </Grid>

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
                    value={student.stuname}
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
                    value={student.email}
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
                  onClick={(e) => upDateSubmit(e)}
                >
                  UPDATE
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
