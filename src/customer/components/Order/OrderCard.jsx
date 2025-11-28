import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust'
import { useNavigate } from 'react-router-dom'

const OrderCard = () => {
  const navigate  = useNavigate();

  return (
    <div onClick={() => navigate(`/account/order/${5}`)} className='ml-10 justify-between'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className='flex cursor-pointer'>
            <img
              className='w-[5rem] h-[5rem] object-cover object-top'
              src="https://campussutra.com/cdn/shop/files/CSMOVSRT7609_3_52eadbc3-3c06-4480-abda-47bf3a54c0dd.jpg?v=1730801146&width=2000"
              alt=""
            />
            <div className='ml-5 space-y-2'>
              <p>Men Slim Mid Rise Black Jeans</p>
              <p className='opacity-50 text-xs font-semibold'>Size: M</p>
              <p className='opacity-50 text-xs font-semibold'>Color: Black</p>
            </div>
          </div>
        </Grid>

         <Grid item xs={2}>
                    <p>Price Rs.1000</p>
                </Grid>

                <Grid item xs={4}>
                    {true && <div> <p>
                        <AdjustIcon sx={{ width: "15px", height: "15px" }} className='text-green-600 mr-2 text-sm' />
                        <span>
                            Delivered On March 03
                        </span>
                    </p>
                        <p className='text-xs'>
                            Your Item has been delivered

                        </p>
                    </div>
                    }
                    {false && <p>
                        <span>
                            Expected Delivery On Mar 03
                        </span>
                    </p>}
                </Grid>
      </Grid>
    </div>
  )
}

export default OrderCard
