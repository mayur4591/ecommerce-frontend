import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {
    return (
        <div className="px-5 lg:px-20">
            <div>
                <h1 className="font-bold text-xl py-7">Delivery Address</h1>
                <AddressCard />
            </div>

            <div className="py-20">
                <OrderTracker activeStep={3} />
            </div>

            {/* STACK VERTICALLY WITH PERFECT FULL-WIDTH CARDS */}
            <Grid container spacing={3}>
                {[1, 1, 1,1].map((item, index) => (
                    <Grid item xs={12} key={index}>
                        <div className="w-full shadow-xl rounded-md p-5 border">
                            <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                {/* LEFT SIDE FULL WIDTH BLOCK */}
                                <Grid item xs={10}>
                                    <div className="flex items-center space-x-4">
                                        <img
                                            className="w-[5rem] h-[5rem] object-cover object-top"
                                            src="https://cdn.onpointfresh.com/wp-content/uploads/2024/05/23b87c5fed96f5ca616a94ab6fd743e9.jpg"
                                            alt=""
                                        />

                                        <div className="space-y-2 ml-5">
                                            <p className="font-semibold">
                                                Men Slim Mid Rise Black Jeans
                                            </p>
                                            <p className="opacity-50 text-xs font-semibold space-x-5">
                                                <span>Color: Pink</span>
                                                <span>Size: M</span>
                                            </p>
                                            <p>Seller: Manyvar</p>
                                            <p>Rs.1299/-</p>
                                        </div>
                                    </div>
                                </Grid>

                                {/* RIGHT SIDE RATING BUTTON */}
                                <Grid item xs={2}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                            color: deepPurple[500],
                                            cursor: "pointer",
                                        }}
                                    >
                                        <StarBorderIcon sx={{ fontSize: "2rem" }} />
                                        <span className="ml-2 font-semibold">
                                            Rate & Review
                                        </span>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default OrderDetails
