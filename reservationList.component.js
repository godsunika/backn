import React, { useState, useEffect } from 'react'
import { Box, Container, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from 'react-query'

const ReservationListComponent = ({ api }) => {
  const [getResult, setGetResult] = useState(null);
  const fortmatResponse           = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const { status, isLoading, data: books, error, refetch: getAllBooks } = useQuery(
    "query-books",
    async () => {
      return await api.get("/api/book");
    },
    // {
      // enabled: false,
      // onSuccess: (res) => {
      //   const result = {
      //     status : res.status + "-" + res.statusText,
      //     headers: res.headers,
      //     data   : res.data,
      //   };
      //   // console.log(JSON.parse(result.data));
      //   setGetResult(fortmatResponse(result.data));
      //   console.log(typeof(getResult))
      //   console.log(getResult)
      // },
      // onError: (err) => {
      //   setGetResult(fortmatResponse(err.response?.data || err));
      // },
    // }
  );
  
  // useEffect(() => {
  //   if (isLoading) setGetResult("loading...");
  // }, [isLoading]);

  function getAllData() {
    try {
      getAllBooks();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }
  
  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;
  
  const columns = [
    { field: '_id', headerName: 'ID', flex: 1, hide: true }, //width: 50,
    { field: 'title', headerName: 'Title', flex: 2, sortable: true }, //width: 250,
    { field: 'author', headerName: 'Author', flex: 1.5, sortable: true }, //width: 250,
    { field: 'category', headerName: 'Category', flex: 1, sortable: true }, //width: 150,
    { field: 'price', headerName: 'Price', flex: 1, sortable: true }, //width: 150,
    { field: 'stock', headerName: 'Stock', flex: 1, sortable: true }, //width: 150,
    // { field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160, valueGetter: (params) =>   `${params.row.firstName || ''} ${params.row.lastName || ''}`, },
  ];
  
  return (
    <Box 
      mt         = {-25}
      py         = {25}
      alignItems = "center"
      sx         = {{
        display       : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        position      : 'relative',
        zIndex        : 0,
        bgcolor       : '#05A8AA',
        width         : 'auto',
        height        : '100vh',
        px            : {
          xs: 1,
          sm: 3,
          md: 10
        },
      }}>
        <Container style={{padding: 0}}>
          <Box my={2}>
            <Button size="large" sx={{bgcolor: "#D15523"}} variant="contained" fullWidth  onClick={getAllData}>Get Data</Button>
          </Box>
          {/* {(getResult && getResult != "loading...") ? */}
          <Box 
            alignItems = "center"
            sx         = {{
              // p             : 1,
              // width         : 'auto',
              justifyContent      : 'center',
              bgcolor             : 'white',
              height              : 600,
              borderTopRightRadius: {
                xs: 8,
                sm: 10,
                md: 20
              },
              borderTopLeftRadius: {
                xs: 8,
                sm: 10,
                md: 20
              },
              borderBottomRightRadius: {
                xs: 8,
                sm: 10,
                md: 20
              },
              borderBottomLeftRadius: {
                xs: 8,
                sm: 10,
                md: 20
              },
            }}
          >
            <DataGrid
              rows     = {books.data}
              columns  = {columns}
              loading  = {isLoading}
              getRowId = {row => row._id}
              pagination
              disableColumnMenu
              disableSelectionOnClick
              // style={{width: "90%"}}
              // getRowId={row => row.yourUniqueField}
              // pageSize           = {5}
              // rowsPerPageOptions = {[5]}
              // width = "100%"
              // loading  = {true}
            />
          </Box> 
        </Container>
      </Box>
  )
}

export default ReservationListComponent;