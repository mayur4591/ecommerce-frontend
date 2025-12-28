import { Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const Achivement = () => {
  return (
    <div>
        <Card className='' sx={{position:"relative", width:["20rem"]}}>
            <CardContent>
                <Typography variant='h6' sx={{letterSpacing:".25px"}}>
                    Shop With ShopyStore
                </Typography>
                <Typography variant='body2'>Congratulations🎉 </Typography>
                <Typography variant='h5' sx={{my:3.1}}>420.8K</Typography>
                <Button size='small' variant='contained'>View Sales</Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default Achivement