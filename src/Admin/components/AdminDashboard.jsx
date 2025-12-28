import { Grid } from "@mui/material";
import React from "react";
import Achivement from "./Achivement";
import MonthlyOverview from "./MonthlyOverview";
import ProductTable from "./ProductTable";
import OrderTableView from "../view/OrderTableView";
import ProductTableView from "../view/ProductTableView";
const AdminDashboard = () => {
  return (
    <div className="p-10">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Achivement />
        </Grid>

        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>

        
        <div className="w-full">
 <Grid item xs={6} md={6}>
          <ProductTableView />
        </Grid>
        </div>
       
      </Grid>
    </div>
  );
};

export default AdminDashboard;
