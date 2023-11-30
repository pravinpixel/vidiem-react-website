import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalStorage, setLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useTriggerPayment, useTriggerPaymentSuccess, useAddCoupon } from "store/hooks/AuthHooks";
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as yup from "yup"
import _ from "lodash";

const schema = yup.object({
    coupon_code: yup.string().required("Must enter valid coupon code"),
}).required()

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function StepPayment(props) {
    const matches = useMediaQuery('(max-width:1024px)');
    const navigate = useNavigate();
    const {
        __moveToggler,
        __toastToggler,
        product
    } = props

    const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION)
    const [orderId, setOrderId] = useState(null)
    const [amount, setAmount] = useState(0)

    const {
        control,
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            coupon_code: '',
            uuid: ''
        }
    })

    const {
        mutate: triggerPayment,
    } = useTriggerPayment();
    const {
        mutate: triggerPaymentSuccess,
    } = useTriggerPaymentSuccess();
    const {
        mutate: addCouponHandler,
    } = useAddCoupon();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    const fetchOrderId = (formData) => {
        triggerPayment(formData, {
            onSuccess: (response) => {
                setLocalStorage(CONSTANTS.V_ORDER, response?.data.rp_order_id)
                setOrderId(response?.data.rp_order_id)
                setAmount(response?.data.total_amount)
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }
    const onCouponSubmit = (formData) => {
        addCouponHandler(formData, {
            onSuccess: (response) => {

                // fetch razorpay once coupon submited!
                let formData = {
                    uuid: current_customization_id
                }
                fetchOrderId(formData)
                if (response?.success) {
                    __toastToggler({
                        open: true,
                        type: 'success',
                        message: "Coupon code applied successfully!"
                    })
                }
            },
            onError: (error) => {
                __toastToggler({
                    open: true,
                    type: 'error',
                    message: error?.message
                })
            },
        });
    }
    const onSuccessCallback = (data) => {
        let formData = {
            "razorpay_payment_id": data?.razorpay_payment_id,
            "razorpay_order_id": getLocalStorage(CONSTANTS.V_ORDER),
            "razorpay_signature": data.hasOwnProperty("razorpay_signature") ? data?.razorpay_signature : null,
        }
        triggerPaymentSuccess(formData, {
            onSuccess: (response) => {
                navigate(`/checkout/order-confirmation`, {
                    replace: true,
                });
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }
    const triggerPaymentRazorpay = (e) => {
        e.preventDefault();
        const options = {
            key: process.env.REACT_APP_RAZOR_KEY,
            currency: "INR",
            //amount: Math.round(product?.total_amount * 100),
            amount: Math.round(amount),
            name: "Vidiem Payment",
            description: "Test Payment Transaction",
            image: "/assets/footer_logo.png",
            order_id: orderId,
            handler: function (response) {
                navigate(`/checkout/order-confirmation`, {
                    replace: true,
                });

                onSuccessCallback(response)
                // let formData = {
                //     "razorpay_payment_id": response.razorpay_payment_id,
                //     "razorpay_order_id": response.razorpay_order_id,
                //     "razorpay_signature": response.razorpay_signature
                // }
            },
            prefill: {
                name: _.has(product, 'guest_data') ? product?.guest_data?.guest_name : product?.user_data?.name,
                email: _.has(product, 'guest_data') ? product?.guest_data?.guest_email : product?.user_data?.email,
                contact: _.has(product, 'guest_data') ? product?.guest_data?.guest_phone : product?.user_data?.phone
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    useEffect(() => {
        if (current_customization_id) {
            setValue('uuid', current_customization_id);
            let formData = {
                uuid: current_customization_id
            }

            // fetch razorpay order ID from onLoad
            fetchOrderId(formData)
        }
    }, [current_customization_id]);

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, [])

    return (
        <div className="vi-body-wrapper">
            <div className='vi-body-title'>
                <h4>Apply Coupon</h4>
            </div>
            <div className="vi-body-content">
                <PerfectScrollbar
                    options={scrollbarOptions}>
                    <form
                        onSubmit={handleSubmit(onCouponSubmit)}
                        className="vi-forms coupon-forms">
                        <input
                            type="hidden"
                            name="uuid"
                            defaultValue={current_customization_id}
                            {...register('uuid')}
                        />
                        <Grid
                            container
                            direction="row"
                            rowSpacing={1}
                            columnSpacing={2}>
                            <Grid item xs={12} className='pos-rel'>
                                <Controller
                                    name="coupon_code"
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                        formState,
                                    }) => (
                                        <TextField
                                            fullWidth
                                            hiddenLabel
                                            error={!!error}
                                            onChange={onChange}
                                            value={value}
                                            margin="dense"
                                            variant="filled"
                                            placeholder="Enter Coupon Code"
                                            helperText={errors.coupon_code && `${errors.coupon_code.message}`}
                                            size="small"
                                        />
                                    )}
                                />
                                <Button
                                    className='apply-btn'
                                    size="medium"
                                    type='submit'>
                                    Apply
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <h4>Order Summary</h4>
                            </Grid>
                            <Grid item xs={12}>
                                <h3>{product?.body?.basetitle} - {product?.color?.title}<span><strong>₹</strong> {product?.total_amount_before_discount}</span></h3>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <h5>Subtotal <span><strong>₹</strong> {product?.total_amount_before_discount ? product?.total_amount_before_discount : product?.total_amount}</span></h5>
                                <h5>Shipping Charges <span>Free</span></h5>
                                {/*<h5>Packing <span><strong>₹</strong> {product?.packing?.price}</span></h5>*/}
                                {product?.coupon ? (<h5>Coupon Applied <label className='coupon'>{product?.coupon.applied_code}</label> <span><strong>₹</strong> {product?.coupon.total_discount}</span></h5>) : null}
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <h3>Total Paid <span className='color-red'><strong>₹</strong> {product?.total_amount}</span></h3>
                            </Grid>
                        </Grid>
                    </form>
                </PerfectScrollbar>
            </div>
            <div className='vi-body-footer'>
                <div className="buton-wrapper">
                    <Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) => __moveToggler(e, '/checkout/shipping-and-billing')}>
                        Back
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button
                        className='next'
                        size="medium"
                        endIcon={matches ? <img src={process.env.PUBLIC_URL + '/assets/icons/razor_mini.png'} alt="razor" /> : <img src={process.env.PUBLIC_URL + '/assets/icons/razor_full.png'} alt="razor" />}
                        onClick={(e) => triggerPaymentRazorpay(e)}>
                        Proceed to Pay on
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default StepPayment;
