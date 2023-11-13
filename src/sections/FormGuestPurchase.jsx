import { useState, useRef, Fragment } from "react";
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PerfectScrollbar from 'react-perfect-scrollbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import isEmailValidator from 'validator/lib/isEmail';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import * as yup from "yup"
import Grid from '@mui/material/Grid';
import OtpWidget from "widgets/OtpWidget";

const schema = yup.object({
    name: yup.string()
        .required("Enter the Name")
        .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    email: yup.string()
        .required("Enter the Email")
        .email("Invalid email address!")
        .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid email")),
    phone: yup
        .string()
        .required("Enter the Phone Number")
        .min(10, "Invalid phone number!")
        .max(10, "Invalid phone number!")
        .matches(/^[0-9]+$/, "Only Numbers are allowed!")
})

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function FormGuestPurchase(props) {
    const formRef = useRef();

    const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION)

    const {
        activeTab,
        __tabChangeHandler,
        __moveToggler,
        __guestRegisterHandler
    } = props

    const [otpOpen, setOtpOpen] = useState(false);

    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            uuid: current_customization_id,
            name: '',
            email: '',
            phone: ''
        }
    })

    const __otpModalToggler = (toggle) => {
        setOtpOpen(toggle)
    }

    return (
        <Fragment>
            <div className='vi-body-title'>
                <Tabs
                    value={activeTab}
                    onChange={__tabChangeHandler}>
                    <Tab label="Continue As Guest" />
                    <Tab label="Sign In" />
                </Tabs>
            </div>
            <div className="vi-body-content">
                <PerfectScrollbar options={scrollbarOptions}>
                    <div className="vi-forms">
                        <form
                            onSubmit={handleSubmit(__guestRegisterHandler)}
                            className="vi-dummy"
                            ref={formRef}>
                            <input
                                type="hidden"
                                name="uuid"
                                {...register('uuid')}
                            />
                            <Grid
                                container
                                direction="row"
                                rowSpacing={1}
                                columnSpacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
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
                                                placeholder="Name"
                                                helperText={errors.name && `${errors.name.message}`}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="email"
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
                                                placeholder="Email"
                                                helperText={errors.email && `${errors.email.message}`}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="phone"
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
                                                placeholder="Phone"
                                                helperText={errors.phone && `${errors.phone.message}`}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} className="txt-center">
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        type='submit'>
                                        Continue as Guest
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <Divider
                            color="red"
                            sx={{ width: "100%", padding: "15px 0px" }}
                            className="v-divider">
                            OR
                        </Divider>
                        <section className="txt-center">
                            <OtpWidget
                                open={otpOpen}
                                __otpModalToggler={__otpModalToggler}
                                {...props}
                            />
                        </section>
                    </div>
                </PerfectScrollbar>
            </div>
            <div className='vi-body-footer'>
                <div className="buton-wrapper">
                    <Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) => __moveToggler(e, '/customize/personalize-message')}>
                        Edit Build
                    </Button>
                    <Divider orientation="vertical" className="v-divider" flexItem />
                    <Button
                        className='next'
                        size="medium"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        onClick={handleSubmit(__guestRegisterHandler)}>
                        Next
                    </Button>
                </div>
            </div>
        </Fragment>
    );
}

export default FormGuestPurchase;
