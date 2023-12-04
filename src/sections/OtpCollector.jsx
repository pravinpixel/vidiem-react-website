import { useEffect, useState } from 'react'
import { useOtpLogin, useResendOtp } from "store/hooks/AuthHooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocalStorage, getLocalStorage } from "helpers/HelperFunctions";
import { CONSTANTS } from "helpers/AppConstants";
import { useQueryClient } from "react-query";
import IconButton from '@mui/material/IconButton';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from '@mui/material/Grid';
import * as yup from "yup";

const otpSchema = yup
    .object({
        otp: yup.string()
            .required("Enter the OTP")
            .min(6, "Invalid OTP")
            .max(6, "Invalid OTP")
            .matches(/^[0-9]+$/, "Only Numbers are allowed!"),
    })

function OtpCollector(props) {
    const queryClient = useQueryClient();

    const {
        __otpModalToggler,
        __toastToggler
    } = props

    const { mutate: otpLogin } = useOtpLogin();
    const { mutate: resendOtp } = useResendOtp();

    const mobile_number = getLocalStorage(CONSTANTS.MOBILE)

    const [counter, setCounter] = useState(30);

    const {
        control: oControl,
        handleSubmit: oHandleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors: oErrors },
    } = useForm({
        resolver: yupResolver(otpSchema),
        mode: "onChange",
        defaultValues: {
            otp: "",
            mobile: ""
        },
    });

    const loginOtpHandler = (formData) => {
        otpLogin(formData, {
            onSuccess: (response) => {
                setLocalStorage(CONSTANTS.CUSTOMER_TOKEN, response.data);
                __otpModalToggler(true)

                // Call current customization once logged in!
                queryClient.refetchQueries('CurrentCustomisation');
            },
            onError: (error) => {
                __toastToggler({
                    open: true,
                    type: "error",
                    message: error?.message,
                });
            },
        });
    }
    const resendOtpHandler = (e) => {
        e.preventDefault();

        let formData = {
            mobile: getValues("mobile")
        }
        resendOtp(formData, {
            onSuccess: (response) => {
                //setLocalStorage(CONSTANTS.CUSTOMER_TOKEN, response.data);
                __otpModalToggler(true)

                // Call current customization once logged in!
                //queryClient.refetchQueries('CurrentCustomisation');
            },
            onError: (error) => {
                __toastToggler({
                    open: true,
                    type: "error",
                    message: error?.message,
                });
            },
        });
    }

    useEffect(() => {
        if (mobile_number) {
            setValue("mobile", mobile_number)
        }
    }, [mobile_number])

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <form
            onSubmit={oHandleSubmit(loginOtpHandler)}
            className="otp-forms">
            <DialogTitle>Guest Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the OTP detail below to
                    Login!
                </DialogContentText>
                <input
                    type="hidden"
                    name="mobile"
                    {...register('mobile')}
                />
                <Grid
                    container
                    direction="row"
                    rowSpacing={1}
                    columnSpacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            name="otp"
                            control={oControl}
                            render={({
                                field: {
                                    onChange,
                                    value,
                                    ...field
                                },
                                fieldState: { error },
                                formState,
                            }) => (
                                <TextField
                                    autoFocus
                                    fullWidth
                                    {...field}
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    margin="dense"
                                    variant="outlined"
                                    placeholder="OTP"
                                    helperText={
                                        oErrors.otp &&
                                        `${oErrors.otp.message}`
                                    }
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {counter !== 0 ? (<Button startIcon={<AlarmOnIcon />}>
                            {counter}
                        </Button>) : null}
                    </Grid>
                    <Grid item xs={8} className='txt-right'>
                        <span>Didn't get it? </span>
                        <Button disabled={counter === 0 ? false : true} onClick={(e) => resendOtpHandler(e)}>
                            Resend OTP
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => __otpModalToggler(false)}>
                    Cancel
                </Button>
                <Button type="submit">Login</Button>
            </DialogActions>
        </form>
    );
}

export default OtpCollector;
