import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { createProduct } from "../../State/Product/Action";

const initializes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    quantity: "",
    price: "",
    discountedPrice: "",
    discountPersent: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    size: initializes,
  });

  const dispatch = useDispatch();
  const loading = useSelector((s) => s.products.loading);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = name === "size_quantity" ? "quantity" : name;

    const updatedSizes = [...productData.size];
    updatedSizes[index][name] = value;

    setProductData((prev) => ({
      ...prev,
      size: updatedSizes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Normalize payload: convert numeric strings to numbers and include expected server field names
      const payload = {
        ...productData,
        quantity: Number(productData.quantity) || 0,
        price: Number(productData.price) || 0,
        discountedPrice: Number(productData.discountedPrice) || 0,
        // send both spellings to be safe (backend may expect discountPercent)
        discountPercent: Number(productData.discountPersent) || 0,
        discountPersent: productData.discountPersent,
        size: productData.size.map((s) => ({ name: s.name, quantity: Number(s.quantity) || 0 })),
      };

      const created = await dispatch(createProduct({ data: payload }));
      // Show success dialog and reset form
      setOpenSuccess(true);
      setProductData({
        imageUrl: "",
        brand: "",
        title: "",
        color: "",
        quantity: "",
        price: "",
        discountedPrice: "",
        discountPersent: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        description: "",
        size: initializes.map(s => ({...s})),
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to add product";
      setErrorMessage(msg);
      setOpenError(true);
    }
  };

  return (
    <Fragment>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ textAlign: "center", mb: 4, mt: 2 }}
      >
        Add New Product
      </Typography>

      <Card
        sx={{
          mx: "auto",
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* ================= IMAGE URL SECTION ================= */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            Product Image
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <div className="w-full">
            <Grid container spacing={3}>
              <Grid item xs={12} width={1000}>
                <TextField
                  fullWidth
                  label="Image URL (Cover Image)"
                  name="imageUrl"
                  value={productData.imageUrl}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </div>

          {/* ================= BASIC DETAILS SECTION ================= */}
          <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 1 }}>
            Basic Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={productData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={productData.color}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discounted Price"
                type="number"
                name="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discount %"
                type="number"
                name="discountPersent"
                value={productData.discountPersent}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} width={1000}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={productData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* ================= CATEGORY SECTION ================= */}
          <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 1 }}>
            Categories
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <div></div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} width={250}>
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select
                  label="Top Level Category"
                  name="topLevelCategory"
                  value={productData.topLevelCategory}
                  onChange={handleChange}
                >
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4} width={250}>
              <FormControl fullWidth>
                <InputLabel>Second Level Category</InputLabel>
                <Select
                  label="Second Level Category"
                  name="secondLevelCategory"
                  value={productData.secondLevelCategory}
                  onChange={handleChange}
                >
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                  <MenuItem value="brands">Brands</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4} width={250}>
              <FormControl fullWidth>
                <InputLabel>Third Level Category</InputLabel>
                <Select
                  label="Third Level Category"
                  name="thirdLevelCategory"
                  value={productData.thirdLevelCategory}
                  onChange={handleChange}
                >
                  <MenuItem value="top">Tops</MenuItem>
                  <MenuItem value="women_dress">Dress</MenuItem>
                  <MenuItem value="t-shirts">T-Shirts</MenuItem>
                  <MenuItem value="saree">Saree</MenuItem>
                  <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* ================= SIZES SECTION ================= */}
          <Typography variant="h6" fontWeight={600} sx={{ mt: 4, mb: 1 }}>
            Sizes
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {productData.size.map((s, index) => (
            <Box
              key={index}
              sx={{
                background: "#f7f7f7",
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Size Name"
                    name="name"
                    value={s.name}
                    onChange={(e) => handleSizeChange(e, index)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    name="size_quantity"
                    value={s.quantity}
                    onChange={(e) => handleSizeChange(e, index)}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}

          {/* SUBMIT BUTTON */}
          <Grid item xs={12} textAlign="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ px: 6, py: 1.6, borderRadius: 3 }}
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} /> Adding...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={4000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Product added successfully
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default CreateProductForm;
