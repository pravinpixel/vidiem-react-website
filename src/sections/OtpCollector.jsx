import React, { useEffect } from 'react'
import { useOtpLogin } from "store/hooks/AuthHooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocalStorage, getLocalStorage } from "helpers/HelperFunctions";
import { CONSTANTS } from "helpers/AppConstants";
import { useQueryClient } from "react-query";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

    const mobile_number = getLocalStorage(CONSTANTS.MOBILE)

    const {
        control: oControl,
        handleSubmit: oHandleSubmit,
        register,
        setValue,
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

    useEffect(() => {
        if (mobile_number) {
            setValue("mobile", mobile_number)
        }
    }, [mobile_number])

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
