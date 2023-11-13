import { useEffect, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddAddress } from "store/hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "helpers/HelperFunctions";
import { CONSTANTS } from "helpers/AppConstants";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import isEmailValidator from "validator/lib/isEmail";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import PerfectScrollbar from "react-perfect-scrollbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import _ from "lodash";

const schema = yup.object({
    delivery_name: yup.string()
        .required("Enter the Name")
        .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    delivery_address: yup.string()
        .required("Enter the Address"),
    delivery_zip: yup.string()
        .required("Enter the 6 digit Zipcode")
        .min(6, "Invalid zipcode!")
        .max(6, "Invalid Zipcode!")
        .matches(/^[0-9]+$/, "Only Numbers are allowed!"),
    delivery_city: yup.string()
        .required("Enter the City Name")
        .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    delivery_state: yup.string()
        .required("Enter the State Name")
        .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    delivery_country: yup.string()
        .required("Enter the Country Name")
        .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    delivery_mobile_no: yup.string()
        .required("Enter the Phone Number")
        .min(10, "Invalid phone number!")
        .max(10, "Invalid phone number!")
        .matches(/^[0-9]+$/, "Only Numbers are allowed!"),
    delivery_emailid: yup.string()
        .required("Enter the Email")
        .email("Invalid email address!")
        .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid email")),

    same_as_billing: yup.boolean(),

    billing_name: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the Name")
            .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    }),
    billing_address: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the Address"),
    }),
    billing_zip: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the 6 digit Zipcode")
            .min(6, "Invalid zipcode!")
            .max(6, "Invalid Zipcode!")
            .matches(/^[0-9]+$/, "Only Numbers are allowed!"),
    }),
    billing_city: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the City Name")
            .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    }),
    billing_state: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the State Name")
            .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    }),
    billing_country: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the Country Name")
            .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    }),
    billing_mobile_no: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the Phone Number")
            .min(10, "Invalid phone number!")
            .max(10, "Invalid phone number!")
            .matches(/^[0-9]+$/, "Only Numbers are allowed!"),
    }),
    billing_emailid: yup.string().when('same_as_billing', {
        is: false,
        then: () => yup.string()
            .required("Enter the Email")
            .email("Invalid email address!")
            .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid email")),
    })
})

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
};

function FormAddress(props) {
    const matches = useMediaQuery("(max-width:1024px)");
    const current_customization_id = getLocalStorage(
        CONSTANTS.CURRENT_CUSTOMIZATION
    );
    const authToken = getLocalStorage(CONSTANTS.CUSTOMER_TOKEN);
    const navigate = useNavigate();
    const { product, __moveToggler } = props;

    const {
        control,
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            uuid: current_customization_id,

            delivery_name: '',
            delivery_address: '',
            delivery_address2: '',
            delivery_mobile_no: '',
            delivery_city: '',
            delivery_zip: '',
            delivery_state: '',
            delivery_country: '',
            delivery_emailid: '',
            delivery_add_info: '',
            delivery_company_name: 'none',

            billing_name: '',
            billing_address: '',
            billing_address2: '',
            billing_mobile_no: '',
            billing_city: '',
            billing_zip: '',
            billing_state: '',
            billing_country: '',
            billing_emailid: '',
            billing_add_info: '',
            billing_company_name: 'none',

            same_as_billing: false
        },
    });

    const sameWatching = watch("same_as_billing");
    const delivery_name = watch("delivery_name");
    const delivery_address = watch("delivery_address");
    const delivery_address2 = watch("delivery_address2");
    const delivery_city = watch("delivery_city");
    const delivery_zip = watch("delivery_zip");
    const delivery_state = watch("delivery_state");
    const delivery_country = watch("delivery_country");
    const delivery_mobile_no = watch("delivery_mobile_no");
    const delivery_emailid = watch("delivery_emailid");
    const delivery_add_info = watch("delivery_add_info");

    const { mutate: addAddressHandler } = useAddAddress();

    const onSubmit = (formData) => {
        let makeFormData = {
            uuid: current_customization_id,

            delivery_name: formData?.delivery_name,
            delivery_company_name: formData?.delivery_company_name,
            delivery_address: formData?.delivery_address,
            delivery_address2: formData?.delivery_address2,
            delivery_city: formData?.delivery_city,
            delivery_zip: formData?.delivery_zip,
            delivery_state: formData?.delivery_state,
            delivery_country: formData?.delivery_country,
            delivery_mobile_no: formData?.delivery_mobile_no,
            delivery_emailid: formData?.delivery_emailid,
            delivery_add_info: formData?.delivery_add_info,

            billing_name: formData?.billing_name,
            billing_company_name: formData?.billing_company_name,
            billing_address: formData?.billing_address,
            billing_address2: formData?.billing_address2,
            billing_city: formData?.billing_city,
            billing_zip: formData?.billing_zip,
            billing_state: formData?.billing_state,
            billing_country: formData?.billing_country,
            billing_mobile_no: formData?.billing_mobile_no,
            billing_emailid: formData?.billing_emailid,
            billing_add_info: formData?.billing_add_info
        };

        addAddressHandler(makeFormData, {
            onSuccess: (response) => {
                navigate(`/checkout/payment`, {
                    replace: true,
                });
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    useEffect(() => {
        if (product?.customer_details) {
            reset(product?.customer_details);
        }
    }, [product]);



    useEffect(() => {
        if (sameWatching) {
            setValue("billing_name", delivery_name ? delivery_name : '', { shouldValidate: true })
            setValue("billing_address", delivery_address ? delivery_address : '', { shouldValidate: true })
            setValue("billing_address2", delivery_address2 ? delivery_address2 : '', { shouldValidate: true })
            setValue("billing_mobile_no", delivery_mobile_no ? delivery_mobile_no : '', { shouldValidate: true })
            setValue("billing_city", delivery_city ? delivery_city : '', { shouldValidate: true })
            setValue("billing_zip", delivery_zip ? delivery_zip : '', { shouldValidate: true })
            setValue("billing_state", delivery_state ? delivery_state : '', { shouldValidate: true })
            setValue("billing_country", delivery_country ? delivery_country : '', { shouldValidate: true })
            setValue("billing_emailid", delivery_emailid ? delivery_emailid : '', { shouldValidate: true })
            setValue("billing_add_info", delivery_add_info ? delivery_add_info : '', { shouldValidate: true })
        }
        else {
            setValue("billing_name", '')
            setValue("billing_address", '')
            setValue("billing_address2", '')
            setValue("billing_mobile_no", '')
            setValue("billing_city", '')
            setValue("billing_zip", '')
            setValue("billing_state", '')
            setValue("billing_country", '')
            setValue("billing_emailid", '')
            setValue("billing_add_info", '')
        }
    }, [
        sameWatching,
        delivery_name,
        delivery_address,
        delivery_address2,
        delivery_mobile_no,
        delivery_city,
        delivery_zip,
        delivery_state,
        delivery_country,
        delivery_emailid,
        delivery_add_info
    ])

    return (
        <Fragment>
            <div className="vi-body-content alt">
                <PerfectScrollbar options={scrollbarOptions}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="vi-forms"
                    >
                        {_.isEmpty(product?.user_data) && !authToken ? (
                            <h4 className="retweet">
                                <span style={{ color: "#E31E24" }}>
                                    Sign in
                                </span>{" "}
                                to View Saved Addresses
                            </h4>
                        ) : null}
                        <input
                            type="hidden"
                            name="uuid"
                            defaultValue={current_customization_id}
                            {...register("uuid")}
                        />
                        <div className="pad-wrap">
                            <Grid
                                container
                                direction="row"
                                rowSpacing={1}
                                columnSpacing={2}
                            >
                                <Grid item xs={12}>
                                    <h4>Shipping Address</h4>
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="delivery_name"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Name *"
                                                helperText={
                                                    errors.delivery_name &&
                                                    `${errors.delivery_name.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="delivery_mobile_no"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Phone *"
                                                helperText={
                                                    errors.delivery_mobile_no &&
                                                    `${errors.delivery_mobile_no.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="delivery_address"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Address *"
                                                helperText={
                                                    errors.delivery_address &&
                                                    `${errors.delivery_address.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="delivery_address2"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Address 2"
                                                helperText={
                                                    errors.delivery_address2 &&
                                                    `${errors.delivery_address2.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="delivery_zip"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Zipcode *"
                                                helperText={
                                                    errors.delivery_zip &&
                                                    `${errors.delivery_zip.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="delivery_city"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping City *"
                                                helperText={
                                                    errors.delivery_city &&
                                                    `${errors.delivery_city.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="delivery_state"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping State *"
                                                helperText={
                                                    errors.delivery_state &&
                                                    `${errors.delivery_state.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="delivery_country"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Country *"
                                                helperText={
                                                    errors.delivery_country &&
                                                    `${errors.delivery_country.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="delivery_add_info"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Landmark"
                                                helperText={
                                                    errors.delivery_add_info &&
                                                    `${errors.delivery_add_info.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="delivery_emailid"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Shipping Email *"
                                                helperText={
                                                    errors.delivery_emailid &&
                                                    `${errors.delivery_emailid.message}`
                                                }
                                                size="small"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <h4>Billing Address</h4>
                                    <Controller
                                        name="same_as_billing"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(e) =>
                                                            onChange(
                                                                e.target.checked
                                                            )
                                                        }
                                                        checked={value}
                                                    />
                                                }
                                                label="Same as shipping address!"
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        name="billing_name"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Name"
                                                helperText={errors.billing_name && `${errors.billing_name.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="billing_mobile_no"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Phone"
                                                helperText={errors.billing_mobile_no && `${errors.billing_mobile_no.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="billing_address"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Address"
                                                helperText={errors.billing_address && `${errors.billing_address.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="billing_address2"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Address 2"
                                                // helperText={errors.billing_address2 && `${errors.billing_address2.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="billing_zip"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Zipcode"
                                                helperText={errors.billing_zip && `${errors.billing_zip.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="billing_city"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing City"
                                                helperText={errors.billing_city && `${errors.billing_city.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="billing_state"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing State"
                                                helperText={errors.billing_state && `${errors.billing_state.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="billing_country"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Country"
                                                helperText={errors.billing_country && `${errors.billing_country.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="billing_add_info"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Landmark"
                                                helperText={errors.billing_add_info && `${errors.billing_add_info.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="billing_emailid"
                                        control={control}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error }
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!error}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Billing Email"
                                                helperText={errors.billing_emailid && `${errors.billing_emailid.message}`}
                                                size="small"
                                                disabled={sameWatching}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </PerfectScrollbar>
            </div>
            <div className="vi-body-footer">
                <div className="buton-wrapper">
                    <Button
                        className="prev"
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) =>
                            __moveToggler(e, "/customize/personalize-message")
                        }
                    >
                        Edit Build
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button
                        className="next"
                        size="medium"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        //type='submit'
                        onClick={handleSubmit(onSubmit)}
                    >
                        {matches ? "Proceed to Pay" : "Proceed to Payment"}
                    </Button>
                </div>
            </div>
        </Fragment>
    );
}

export default FormAddress;
