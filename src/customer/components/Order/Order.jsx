import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { getOrderHistory } from "../../../State/Order/Action";

const orderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  const handleStatusChange = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredOrders =
    selectedStatus.length === 0
      ? orders
      : orders.filter((order) =>
          selectedStatus.includes(order.orderStatus)
        );

  return (
    <div className="px-10 py-5">
      <Grid container spacing={2}>

        {/* LEFT FILTER */}
        <Grid item xs={3} className="pr-20">
          <div className="shadow-lg bg-white p-5 sticky top-5 rounded-md">
            <h1 className="font-bold text-lg">Filter</h1>

            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>

              {orderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(option.value)}
                    onChange={() => handleStatusChange(option.value)}
                    className="h-4 w-4"
                  />
                  <label className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* RIGHT ORDER LIST */}
        <Grid item xs={9} sx={{ display: "flex", justifyContent: "center" }}>
          <div className="space-y-5 w-full max-w-2xl">

            {loading && <p>Loading orders...</p>}

            {!loading && filteredOrders.length === 0 && (
              <p>No orders found</p>
            )}

            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}

          </div>
        </Grid>

      </Grid>
    </div>
  );
};

export default Order;
