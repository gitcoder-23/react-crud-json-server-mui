import * as React from 'react';
import { makeStyles } from '@mui/styles';

import {
  Box,
  Paper,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { rootApiUrl } from '../constants';

const useStyles = makeStyles({
  viewHead: {
    backgroundColor: deepPurple[400],
    color: 'white',
  },
});

const View = (props) => {
  // console.log('params', props.match.params.stuId);
  const classes = useStyles();
  const history = useHistory();
  const [student, setStudent] = useState({});

  const [loadingState, setLoadingState] = useState(false);
  const { stuId } = useParams();

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
  React.useEffect(() => {
    getStudent();
  }, []);

  return (
    <Grid item md={6} xs={12}>
      <Box textAlign="center" p={2} mb={2} className={classes.viewHead}>
        <Typography variant="h4">View Student</Typography>
        <Button variant="contained" onClick={() => history.push('/')}>
          Back To Home
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Student Name</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingState == true ? (
              <Typography variant="h5" textAlign="center">
                Loading...Please Wait.
              </Typography>
            ) : (
              <>
                {student.length == 0 ? (
                  <>
                    <Typography variant="h5" textAlign="center">
                      No data found!
                    </Typography>
                  </>
                ) : (
                  <>
                    <TableRow
                      key=""
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {student.stuname}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {student.email}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
export default View;
