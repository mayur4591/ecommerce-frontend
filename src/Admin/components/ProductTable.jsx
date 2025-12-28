import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductTable = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(store => store)

    const [page, setPage] = useState(1); // 1-based for UI
    const [pageSize, setPageSize] = useState(5);

    const handleProductDelete = async (prductId) => {
      // wait for delete to complete, then refresh current page
      await dispatch(deleteProduct(prductId))
      dispatch(findProducts(buildQuery(page-1, pageSize)))
    }

    const buildQuery = (pageNumber, pageSize) => ({
      category: "",
      colors: [],
      sizes:[],
      minPrice: 0,
      maxPrice: 10000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber,
      pageSize,
      stock: "",
    })

    useEffect(() => {
      dispatch(findProducts(buildQuery(page-1, pageSize)))
    },[page, pageSize, dispatch])
  return (
    <div className='p-5'>
        <Card className='mt-2'>
            <CardHeader title="All Products"/>
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align='left'>Title</TableCell>
            <TableCell align="left">Brand</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Price&nbsp;(Rs.)</TableCell>
            <TableCell align="left">Discount&nbsp;(%)</TableCell>
            <TableCell align="left">Final Price&nbsp;(Rs.)</TableCell>
            <TableCell align="left">Delete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {products.products?.content?.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align='left' component="th" scope="row">
                <Avatar src={item.imageUrl}></Avatar>
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="left">{item.brand}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.discountPercent}</TableCell>
              <TableCell align="left">{item.discountedPrice}</TableCell>
              <TableCell align="left"><Button onClick={() => handleProductDelete(item.id)} variant='outlined'>Delete</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className='p-4 flex items-center justify-between'>
      <div>
        Showing page {products.products?.number != null ? products.products.number + 1 : page} of {products.products?.totalPages ?? 1}
      </div>
      <Stack spacing={2}>
        <Pagination
          count={products.products?.totalPages ?? 1}
          page={products.products?.number != null ? products.products.number + 1 : page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </div>
        </Card>
       
    </div>
  )
}

export default ProductTable