import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'

const OrderSummary = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");

    // ✅ FIXED SELECTOR
    const order = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId, dispatch]);

    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={order.order?.shippingAddress}/>
            </div>

            <div>
                <div className='lg:grid grid-cols-3 relative mt-5'>
                    <div className='col-span-2'>
                        {order.orders?.orderItems?.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border'>
                            <p className='uppercase font-bold'>Price Details</p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>Rs.{order.order?.price}</span>
                                </div>

                                <div className='flex justify-between pt-3 '>
                                    <span>Discount</span>
                                    <span className='text-green-600'>- RS.499</span>
                                </div>

                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Delivery Charges</span>
                                    <span className='text-green-600'>Free</span>
                                </div>

                                <div className='flex justify-between pt-3 font-bold'>
                                    <span>Total Amount</span>
                                    <span>Rs.4199/-</span>
                                </div>
                            </div>

                            <Button variant='contained'
                                className='w-full'
                                sx={{ px: "2.5rem", py: "0.7rem", bgcolor: "#9155fd" }}>
                                Checkout
                            </Button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OrderSummary;
