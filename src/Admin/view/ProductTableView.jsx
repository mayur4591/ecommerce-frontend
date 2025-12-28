import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductTableView = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(store => store)
    
    const handleProductDelete = (prductId) => {
        dispatch(deleteProduct(prductId))
    }
    useEffect(() => {
            const data = {
              category: "",
              colors: [],
              sizes:[],
              minPrice: 0,
              maxPrice: 10000,
              minDiscount: 0,
              sort: "price_low",
              pageNumber: 0,
              pageSize: 5,
              stock: "",
            }
        
            dispatch(findProducts(data))
    },[products.deletedProduct])
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

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Card>
       
    </div>
  )
}

export default ProductTableView