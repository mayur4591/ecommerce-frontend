import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import AddressesList from "../AddressCard/AddressesList";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from '../../../State/Cart/Action';
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {

  const navigate=useNavigate();
  const formRef = React.useRef(null);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // Try to use saved shipping addresses on the user profile if available,
  // otherwise fallback to top-level user fields.
  const user = auth?.user || null;
  // Debug: print full addresses array to help diagnose name mismatch issues
  // eslint-disable-next-line no-console
  // eslint-disable-next-line no-console
  const savedAddress = auth?.user?.shippingAddress || auth?.user || null;

  // Build an address container expected by AddressesList when user has multiple addresses
  const addressesContainer = user?.addresses && user.addresses.length > 0
    ? { firstName: user.firstName, lastName: user.lastName, addresses: user.addresses }
    : (savedAddress?.addresses ? savedAddress : null)

  const [selectedAddr, setSelectedAddr] = React.useState(null)

  const handleSubmit = (e) => {
    // allow this handler to be used as both form submit and button click
    if (e && e.preventDefault) e.preventDefault();

    // prefer selected address (from AddressesList) if available
    let address = null;
    if (selectedAddr) {
      address = selectedAddr;
    } else if (formRef.current) {
      const data = new FormData(formRef.current);
      address = Object.fromEntries(data.entries());
    }

    // Prepare items and totals from cart
    const items = Array.isArray(cart?.cart?.cartItems)
      ? cart.cart.cartItems
      : cart?.cartItems || cart?.cart || [];

    const totals = {
      price: cart?.cart?.price || cart?.cart?.totalPrice || 0,
      discount: cart?.cart?.discount || 0,
      totalDiscountedPrice: cart?.cart?.totalDiscountedPrice || cart?.cart?.total || 0,
    };

    // navigate to the order summary step and pass the address, items, and totals via router state
    navigate(`/checkout?step=3`, { state: { address, items, totals } });
  };

  React.useEffect(() => {
    // Ensure cart is loaded so we can pass items to OrderSummary
    if (!cart || !cart.cart) {
      dispatch(getCart());
    }
  }, [cart, dispatch]);

  return (
    <div>
      <Grid container spacing={4}>
        {/* LEFT SECTION */}
        <Grid
          size={{ xs: 12, lg: 5 }}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-7 border-b">
            {/* If user has multiple saved addresses show selectable list, otherwise show single card */}
            {addressesContainer ? (
              <>
                <AddressesList
                  address={addressesContainer}
                  onSelect={(addr) => setSelectedAddr(addr)}
                />
                <Button
                  sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                  size="large"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Deliver Here
                </Button>
              </>
            ) : (
              <>
                <AddressCard address={savedAddress} />
                <Button
                  sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                  size="large"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Deliver Here
                </Button>
              </>
            )}
          </div>
        </Grid>

        {/* RIGHT SECTION */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit} ref={formRef}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City Name"
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State / Province / Region"
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="PIN Code"
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
