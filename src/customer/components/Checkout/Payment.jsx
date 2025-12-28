import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../../State/Order/Action'

const Payment = () => {
  const location = useLocation()
  const address = location.state?.address || null
  const items = location.state?.items || []
  const totals = location.state?.totals || { price: 0, discount: 0, totalDiscountedPrice: 0 }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  return (
    <div className='px-4'>
      <h2 className='text-2xl font-semibold mb-4'>Payment</h2>

      <div className='grid lg:grid-cols-3 gap-6'>
        <div className='col-span-1'>
          <div className='p-5 shadow-lg rounded-md border mb-4'>
            <h3 className='font-semibold mb-2'>Deliver To</h3>
            <AddressCard address={address} />
          </div>
          <div className='p-5 shadow-lg rounded-md border'>
            <h3 className='font-semibold mb-2'>Payment Method</h3>
            <p className='text-sm text-gray-600'>Only Pay On Delivery is available</p>
          </div>
          <div className='p-5 shadow-lg rounded-md border mt-4'>
            <h3 className='font-semibold mb-2'>Order Summary</h3>
            <div className='flex justify-between'><span>Price</span><span>Rs.{totals.price}</span></div>
            <div className='flex justify-between'><span>Discount</span><span>- Rs.{totals.discount}</span></div>
            <div className='flex justify-between font-bold mt-2'><span>Total</span><span>Rs.{totals.totalDiscountedPrice}</span></div>
            <div className='mt-4'>
              <Button
                variant='contained'
                sx={{ bgcolor: '#9155fd' }}
                onClick={async () => {
                  // Prepare raw address object (API likely expects a single address object)
                  const rawAddr = address?.addresses ? address.addresses[0] : address
                  try {
                    setLoading(true)
                    // create order - pass a noop navigate so action's internal navigate (if any) doesn't redirect
                    const res = await dispatch(createOrder({ address: rawAddr, navigate: () => {} }))
                    // res should be the created order (Action now returns data)
                    setLoading(false)
                    if (res) {
                      navigate('/order-placed', { state: { order: res } })
                    }
                  } catch (err) {
                    setLoading(false)
                    // show minimal feedback - in real app show toast or error UI
                    // eslint-disable-next-line no-console
                    console.error('Create order failed', err)
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Placing order...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>

        <div className='col-span-2'>
          <div className='p-5 shadow-lg rounded-md border mb-4'>
            <h3 className='font-semibold mb-2'>Items for Delivery</h3>
            {Array.isArray(items) && items.length ? (
              items.map((it) => <CartItem key={it.id || it._id || Math.random()} item={it} />)
            ) : (
              <p className='text-gray-500'>No items available</p>
            )}
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Payment
