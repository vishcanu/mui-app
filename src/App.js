import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Card, CardContent, Grid, TablePagination } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import { dummyData } from "./dummyData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import Divider from '@mui/material/Divider';


function App() {
  const rowsPerPageOptions = [10, 20];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const [filterClassNo, setFilterClassNo] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    tableFilter();
  }, [filterClassNo, filterTopic, selectedDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterClassNoChange = (event) => {
    setFilterClassNo(event.target.value);
    setPage(0);
  };

  const handleFiletrTopicChange = (event) => {
    setFilterTopic(event.target.value);
    setPage(0);
  };

  const filterDate = (e) => {
    let newdate = new Date(e.$d);
    setSelectedDate(e.$d);
  };
  const dateFilter = (filteredData) => {
    const filteredDataByMonth = filteredData.filter((data) => {
      if (!selectedDate) return true;

      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();

      const entryDate = new Date(data.date);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth();

      return selectedYear === entryYear && selectedMonth === entryMonth;
    });
    setFilteredData(filteredDataByMonth);
  };
  const tableFilter = () => {
    dateFilter(
      dummyData.filter(
        (dataEntry) =>
          dataEntry.class_No
            .toLowerCase()
            .includes(filterClassNo.toLowerCase()) &&
          dataEntry.topic.toLowerCase().includes(filterTopic.toLowerCase())
      )
    );
  };
  return (
    <Box>
      <Card style={{ padding: "5px" }}>
        <CardContent>
          <Grid container direction={"row"} justifyContent={"space-between"}>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={"Select Month and Year"}
                  views={["month", "year"]}
                  onChange={filterDate}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <TextField
                label="Search by class no."
                value={filterClassNo}
                onChange={handleFilterClassNoChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Search by Topics"
                value={filterTopic}
                onChange={handleFiletrTopicChange}
              />
            </Grid>
            <Grid item>
              <Button startIcon={<KeyboardDoubleArrowLeftIcon />}>Back</Button>
              <Button startIcon={<ClassOutlinedIcon />}>2023MERNS1</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Divider />
      <Card>
        <CardContent>
          <TableContainer style={{ borderRadius: "5px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      background: "linear-gradient(to right, #b1a6e0, #5c40d6)",
                      color: "white",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    style={{
                      background: "linear-gradient(to right, #b1a6e0, #5c40d6)",
                      color: "white",
                    }}
                  >
                    Class No
                  </TableCell>
                  <TableCell
                    style={{
                      background: "linear-gradient(to right, #b1a6e0, #5c40d6)",
                      color: "white",
                    }}
                  >
                    Topic
                  </TableCell>
                  <TableCell
                    style={{
                      background: "linear-gradient(to right, #b1a6e0, #5c40d6)",
                      color: "white",
                    }}
                  >
                    Class Link
                  </TableCell>
                  <TableCell
                    style={{
                      background: "linear-gradient(to right, #b1a6e0, #5c40d6)",
                      color: "white",
                    }}
                  >
                    Recorded Class Video
                  </TableCell>
                  <TableCell
                    style={{
                      background: "linear-gradient(to right, #b1a6e0, #5c40d6)",
                      color: "white",
                    }}
                  >
                    Study Material
                  </TableCell>
                  <TableCell
                    style={{
                      background: "linear-gradient(to right, #b1a6e0, #5c40d6)",
                      color: "white",
                    }}
                  >
                    Assessment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((dataEntry, index) => (
                    <TableRow key={index}>
                      <TableCell>{dataEntry.date}</TableCell>
                      <TableCell>{dataEntry.class_No}</TableCell>
                      <TableCell>{dataEntry.topic}</TableCell>
                      <TableCell>
                        <a
                          href={dataEntry.class_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Class
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={dataEntry.recorded_class_video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Watch Video
                        </a>
                      </TableCell>
                      <TableCell>{dataEntry.study_material}</TableCell>
                      <TableCell>
                        <IconButton
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "blue",
                          }}
                        >
                          <FileDownloadRoundedIcon />
                        </IconButton>
                        {dataEntry.asssessment}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
