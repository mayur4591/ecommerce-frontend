import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'
import { getCart } from '../../../State/Cart/Action'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const OrderSummary = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");
    // ✅ FIXED SELECTOR
    const order = useSelector((state) => state.order);
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();

    // If the previous page passed an address via navigation state, prefer it.
    const passedAddress = location.state?.address || null;
    const navItems = location.state?.items || null;
    const navTotals = location.state?.totals || null;

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }

        // if navigation didn't pass items and cart is empty, try loading cart
        if (!navItems && (!cart || !cart.cart)) {
            dispatch(getCart());
        }
    }, [orderId, dispatch, navItems, cart]);

    // derive fields with fallbacks to handle different API shapes
    const rawShipping = passedAddress || order?.order?.shippingAddress || order?.shippingAddress || null;

    // AddressCard expects an object with an `addresses` array. If we received
    // a plain shipping object, wrap it into that shape so the card renders.
    const shippingAddress = rawShipping
        ? (rawShipping.addresses ? rawShipping : { firstName: rawShipping.firstName, lastName: rawShipping.lastName, addresses: [rawShipping] })
        : null;

    // Prefer items/totals passed via navigation state (from the delivery step)
    const items = navItems || order?.order?.orderItems || order?.orderItems || order?.orders?.orderItems || order?.orders || cart?.cart?.cartItems || cart?.cartItems || [];

    const totals = navTotals || {
        price: order?.order?.price || order?.price || cart?.cart?.price || 0,
        discount: order?.order?.discount || order?.discount || cart?.cart?.discount || 0,
        totalDiscountedPrice: order?.order?.totalDiscountedPrice || order?.totalDiscountedPrice || cart?.cart?.totalDiscountedPrice || cart?.cart?.total || 0,
    };

    const price = totals.price;

    // debug info to help identify why items/address may be missing
    // eslint-disable-next-line no-console
    console.log('OrderSummary data', { locationState: location.state, order, cart, shippingAddress, items, price });

    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={shippingAddress}/>
            </div>

            <div>
                <div className='lg:grid grid-cols-3 relative mt-5'>
                    <div className='col-span-2'>
                        {Array.isArray(items) && items.length > 0 ? (
                            items.map((item) => (
                                <CartItem key={item.id || item._id || Math.random()} item={item} />
                            ))
                        ) : (
                            <p className='text-center text-gray-500'>No items to display</p>
                        )}
                    </div>

                    <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border'>
                            <p className='uppercase font-bold'>Price Details</p>
                            <hr />
                            <div className='space-y-3 font-semibold mb-10'>
                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>Rs.{price}</span>
                                </div>

                                <div className='flex justify-between pt-3 '>
                                    <span>Discount</span>
                                    <span className='text-green-600'>{totals.discount ? `- RS.${totals.discount}` : '- RS.0'}</span>
                                </div>

                                <div className='flex justify-between pt-3 text-black'>
                                    <span>Delivery Charges</span>
                                    <span className='text-green-600'>Free</span>
                                </div>

                                <div className='flex justify-between pt-3 font-bold'>
                                    <span>Total Amount</span>
                                    <span>Rs.{totals.totalDiscountedPrice || price}/-</span>
                                </div>
                            </div>

                            <Button variant='contained'
                                className='w-full'
                                onClick={() => navigate(`/checkout?step=4`, { state: { address: shippingAddress, items, totals } })}
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
