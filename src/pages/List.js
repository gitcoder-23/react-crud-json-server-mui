import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { rootApiUrl } from '../constants';
const List = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const getStudents = async () => {
    try {
      const allStudents = await axios.get(`${rootApiUrl}/students`);
      // console.log('allStudents', allStudents);
      const { data, status } = allStudents;
      setLoadingState(true);
      if (status == 200) {
        setTimeout(() => {
          setLoadingState(false);
          setStudentsData(data);
        }, 600);
      }
    } catch (error) {
      console.log('Something went wrong!');
    }
  };
  const deleteStudent = async (stuId) => {
    try {
      // if (window.alert('Do you want?')) {
      //   const delStudent = await axios.delete(
      //     `${rootApiUrl}/students/${stuId}`
      //   );
      // }
      // const delStudent = await axios.delete(`${rootApiUrl}/students/${stuId}`);
      // getStudents();
      const delStudent = await axios.delete(`${rootApiUrl}/students/${stuId}`);
      var newStudent = studentsData.filter((item) => {
        console.log('item', item);
        return item.id !== stuId;
      });
      setStudentsData(newStudent);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#Sl.No</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingState == true ? (
              <Typography variant="h5" textAlign="center">
                Loading...Please Wait.
              </Typography>
            ) : (
              <>
                {studentsData.length == 0 ? (
                  <>
                    <Typography variant="h5" textAlign="center">
                      No data found!
                    </Typography>
                  </>
                ) : (
                  <>
                    {studentsData &&
                      studentsData.reverse().map((data, index) => (
                        <>
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.stuname}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {data.email}
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title="View">
                                <IconButton>
                                  <Link to={`/view/${data.id}`}>
                                    <VisibilityIcon color="primary" />
                                  </Link>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton>
                                  <Link to={`/edit/${data.id}`}>
                                    <EditIcon />
                                  </Link>
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() => deleteStudent(data.id)}
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
