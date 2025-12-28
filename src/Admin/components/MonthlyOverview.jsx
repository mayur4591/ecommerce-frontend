import React from 'react'
import { TrendingUp, AccountCircle, SettingsCell, AttachMoney, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'

const salesData = [
  {
    stats: '245K',
    title: "Sales",
    color: "primary.main",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />
  },

  {
    stats: '24.5K',
    title: "Customers",
    color: "success.main",
    icon: <AccountCircle sx={{ fontSize: "1.75rem" }} />
  },

  {
    stats: '1.5K',
    title: "Products",
    color: "warning.main",
    icon: <SettingsCell sx={{ fontSize: "1.75rem" }} />
  },

  {
    stats: '88K',
    title: "Revenue",
    color: "info.main",
    icon: <AttachMoney sx={{ fontSize: "1.75rem" }} />
  },
]

const renderStates = () => {
  return salesData.map((item, index) => {
    return (
      <Grid item xs={12} sm={3} key={index}>
        <Box sx={{ display: "flex", alignItems: "center" }}>

          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: "white",
              backgroundColor: item.color
            }}
          >
            {item.icon}
          </Avatar>

          <Box sx={{ display: "flex", flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>

        </Box>
      </Grid>
    )
  })
}

const MonthlyOverview = () => {
  return (
    <Card>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size='small'>
            <MoreVert />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 48.5% growth
            </Box>{' '}
            this Month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '.15px !important'
          }
        }}
      />

      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={6}>
          {renderStates()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MonthlyOverview
