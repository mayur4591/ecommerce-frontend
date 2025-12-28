import { StarIcon } from '@heroicons/react/20/solid'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Grid from '@mui/material/Grid'
import ProductReviewCard from './ProductReviewCard'
import { Box, LinearProgress } from '@mui/material'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../State/Product/Action'
import { addItemToCart } from '../../../State/Cart/Action'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import mens_kurta from '../../../Data/mens_kurts'

export default function ProductDetails() {

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const { products } = useSelector(store => store);
    const { isAuthenticated } = useSelector(store => store.auth);

    const [selectedSize, setSelectedSize] = useState(null);
    const [openLoginAlert, setOpenLoginAlert] = useState(false);

    // ✅ ADD TO CART HANDLER
    const handleAddToCart = () => {

        // Not logged in
        if (!isAuthenticated) {
            setOpenLoginAlert(true);
            return;
        }

        // ❗ Size not selected
        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        const data = {
            productId: params.productId,
            sizes: selectedSize.name
        };

        dispatch(addItemToCart(data));
        navigate("/cart");
    };

    // ✅ FETCH PRODUCT DETAILS
    useEffect(() => {
        dispatch(findProductsById({ productId: params.productId }));
    }, [dispatch, params.productId]);

    const product = products.product;

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">

                {/* PRODUCT TOP SECTION */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">

                    {/* LEFT: IMAGE */}
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                alt={product?.title}
                                src={product?.imageUrl}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* RIGHT: PRODUCT INFO */}
                    <div className="lg:col-span-1 max-w-2xl px-4 pb-16">

                        <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                            {product?.brand}
                        </h1>
                        <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                            {product?.title}
                        </h1>

                        {/* PRICING */}
                        <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                            <p className="font-semibold">Rs.{product?.discountedPrice}</p>
                            <p className="opacity-50 line-through">Rs.{product?.price}</p>
                            <p className="text-green-600 font-semibold">
                                {product?.discountPersent}% Off
                            </p>
                        </div>

                        {/* RATINGS */}
                        <div className="mt-6">
                            <div className="flex items-center space-x-3">
                                <Rating name="read-only" value={4} readOnly />
                                <p className="opacity-50 text-sm">5677 Ratings</p>
                                <p className="opacity-50 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    2479 Reviews
                                </p>
                            </div>
                        </div>

                        {/* SIZE SELECTION */}
                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Size</h3>

                            <fieldset className="mt-4">
                                <div className="grid grid-cols-4 gap-3">
                                    {product?.sizes?.map((sizeObj, index) => (
                                        <label
                                            key={index}
                                            className={`group relative flex items-center justify-center rounded-md border p-3 cursor-pointer
                                            ${selectedSize?.name === sizeObj.name
                                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                                    : "border-gray-300 bg-white"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="size"
                                                className="hidden"
                                                onChange={() => setSelectedSize(sizeObj)}
                                            />

                                            <span className={`text-sm font-medium uppercase
                                                ${selectedSize?.name === sizeObj.name
                                                    ? "text-white"
                                                    : "text-gray-900"}
                                            `}>
                                                {sizeObj.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        {/* ADD TO CART BUTTON */}
                        <Button
                            onClick={handleAddToCart}
                            variant="contained"
                            sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", mt: 5 }}
                        >
                            ADD TO CART
                        </Button>

                        {/* DESCRIPTION */}
                        <div className="py-10 border-t mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Description</h3>
                            <p className="text-base text-gray-900 mt-4">
                                {product?.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* REVIEWS SECTION */}
                <section>
                    <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
                    <div className="border p-5">
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className="space-y-5">
                                    {[1, 1, 1].map((_, idx) => (
                                        <ProductReviewCard key={idx} />
                                    ))}
                                </div>
                            </Grid>

                            <Grid item xs={5}>
                                <h1 className="text-xl font-semibold pb-2">Product Ratings</h1>

                                <div className="flex items-center space-x-3">
                                    <Rating value={4.6} precision={0.5} readOnly />
                                    <p className="opacity-60">6547 Ratings</p>
                                </div>

                                <Box className="mt-5 space-y-3">
                                    {[
                                        { label: "Excellent", value: 40, color: "success" },
                                        { label: "Very Good", value: 30, color: "success" },
                                        { label: "Good", value: 25 },
                                        { label: "Average", value: 20, color: "warning" },
                                        { label: "Poor", value: 10, color: "error" }
                                    ].map((item, idx) => (
                                        <div key={idx}>
                                            <p>{item.label}</p>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={item.value}
                                                color={item.color}
                                            />
                                        </div>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>

                {/* SIMILAR PRODUCTS */}
                <section className="pt-10">
                    <h1 className="py-5 text-xl font-bold">Similar Products</h1>
                    <div className="flex flex-wrap space-y-5">
                        {mens_kurta.map((item, index) => (
                            <HomeSectionCard key={index} product={item} />
                        ))}
                    </div>
                </section>
            </div>

            {/* 🔔 LOGIN REQUIRED SNACKBAR */}
            <Snackbar
                open={openLoginAlert}
                autoHideDuration={3000}
                onClose={() => setOpenLoginAlert(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity="warning"
                    onClose={() => setOpenLoginAlert(false)}
                    sx={{ width: "100%" }}
                >
                    Please login to add items to cart
                </Alert>
            </Snackbar>
        </div>
    );
}
