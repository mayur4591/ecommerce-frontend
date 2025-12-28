import React from 'react'
import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const OrderPlaced = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order || null

  const viewOrder = () => {
    if (order?.id || order?._id) {
      const id = order.id || order._id
      navigate(`/account/order/${id}`)
    } else {
      navigate('/account/order')
    }
  }

  return (
    <div className='p-10 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Your order has been placed successfully</h1>
      {order?.id || order?._id ? (
        <p className='mb-4'>Order ID: <strong>{order.id || order._id}</strong></p>
      ) : null}

      <div className='space-x-4'>
        <Button variant='contained' color='primary' onClick={viewOrder} sx={{bgcolor: '#9155fd'}}>
          View Order
        </Button>
        <Button variant='outlined' onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    </div>
  )
}

export default OrderPlaced
