import { Grid } from '@mui/material'
import React from 'react'
import OrderCart from './OrderCard'

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" },
]

const Order = () => {
    return (
        <div className="px-10 py-5">
            <Grid container spacing={2}>

                {/* LEFT FILTER */}
                <Grid item xs={3} className='pr-20'>
                    <div className='h-auto shadow-lg bg-white p-5 sticky top-5 rounded-md'>
                        <h1 className='font-bold text-lg'>Filter</h1>

                        <div className='space-y-4 mt-10'>
                            <h1 className='font-semibold'>ORDER STATUS</h1>

                            {orderStatus.map((option) => (
                                <div className='flex items-center' key={option.value}>
                                    <input
                                        type="checkbox"
                                        className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                    />
                                    <label className='ml-3 text-sm text-gray-600'>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* RIGHT CART SECTION */}
                <Grid item xs={9} sx={{ display: "flex", justifyContent: "center" }}>
                    <div className='space-y-5 w-full max-w-2xl'>
                        {[1, 1, 1, 1,1,1,1].map((item, i) => (
                            <OrderCart key={i} />
                        ))}
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default Order
