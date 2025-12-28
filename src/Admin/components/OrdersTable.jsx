import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleShipedOrder = () => {
    console.log("SHIPPING ORDER");
    dispatch(shipOrder(selectedOrderId));
    handleClose();
  };

  const handleConfirmedOrder = () => {
    dispatch(confirmOrder(selectedOrderId));
    handleClose();
  };

  const handleDeliveredOrder = () => {
    dispatch(deliveredOrder(selectedOrderId));
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.confirmedSuccess,
    adminOrder.shippedSuccess,
    adminOrder.deliveredSuccess,
    adminOrder.cancelledSuccess,
    adminOrder.deleteSuccess,
  ]);

  return (
    <div>
      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Images</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Total Items</TableCell>
                <TableCell align="left">Order Value&nbsp;(Rs.)</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Change Status</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {adminOrder.orders?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem, index) => (
                        <Avatar key={index} src={orderItem.product.imageUrl} />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="left">
                    {item.orderItems.map((orderItem, index) => (
                      <p key={index}>{orderItem.product.title}</p>
                    ))}
                  </TableCell>

                  <TableCell align="left">{item.orderItems.length}</TableCell>
                  <TableCell align="left">
                    {item.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="left">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        item.orderStatus === "CONFIRMED"
                          ? "bg-[#dc8d17]" 
                          : item.orderStatus === "SHIPPED"
                          ? "bg-[#6e47e1]"
                          : item.orderStatus === "PLACED"
                          ? "bg-[#b77803]"
                          : item.orderStatus === "PENDING"
                          ? "bg-[gray]"
                          : item.orderStatus === "DELIVERED"
                          ? "bg-[#059605]"
                          : "bg-[red]"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>

                  <TableCell align="left">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Status
                    </Button>
                  </TableCell>

                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteOrder(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Menu Component */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleConfirmedOrder}>Confirmed Order</MenuItem>
        <MenuItem onClick={handleShipedOrder}>Shipped Order</MenuItem>
        <MenuItem onClick={handleDeliveredOrder}>Delivered Order</MenuItem>
      </Menu>
    </div>
  );
};

export default OrdersTable;
