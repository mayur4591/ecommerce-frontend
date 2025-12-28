import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import Payment from './Payment';

const steps = ['Login', 'Delevery address',"Order Summary",'Payment'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const location=useLocation();
    const querySearch = new URLSearchParams(location.search)

    const step = querySearch.get("step")
    const stepNum = parseInt(step, 10) || 0


    const handleNext = () => {
        querySearch.set("step",step+1)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        querySearch.set("step",step-1)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };




    return (
        <div className='px-10 lg:px-20'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={stepNum}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>

                        </Box>
                        <div className='mt-10'>
                            {stepNum === 2 ? (
                                <DeliveryAddressForm />
                            ) : stepNum === 3 ? (
                                <OrderSummary />
                            ) : stepNum === 4 ? (
                                <Payment />
                            ) : (
                                <DeliveryAddressForm />
                            )}
                        </div>
                    </React.Fragment>
                )}
            </Box>
        </div>

    );
}
