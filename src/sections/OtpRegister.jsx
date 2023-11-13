import React, { useEffect } from 'react'
import { useOtpGenerate } from "store/hooks/AuthHooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocalStorage, removeLocalStorage } from "helpers/HelperFunctions";
import { CONSTANTS } from "helpers/AppConstants";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import isEmailValidator from "validator/lib/isEmail";
import * as yup from "yup";

const generateSchema = yup
    .object({
        name: yup.string()
            .required("Enter the Name")
            .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
        email: yup.string()
            .required("Enter the Email")
            .email("Invalid email address!")
            .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid email")),
        mobile: yup
            .string()
            .required("Enter the Phone Number")
            .min(10, "Invalid phone number!")
            .max(10, "Invalid phone number!")
            .matches(/^[0-9]+$/, "Only Numbers are allowed!"),
    });

function OtpRegister(props) {
    const {
        __toastToggler,
        __otpModalToggler,
        __stepToggler
    } = props

    const { mutate: generateOtp } = useOtpGenerate();

    const {
        control: gControl,
        handleSubmit: gHandleSubmit,
        watch,
        formState: { errors: gErrors },
    } = useForm({
        resolver: yupResolver(generateSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
        },
    });

    const generateOtpHandler = (formData) => {
        generateOtp(formData, {
            onSuccess: (response) => {
                __stepToggler("otp_sent")
                __toastToggler({
                    open: true,
                    type: "success",
                    message: response.message || "Otp Sent!",
                });
            },
            onError: (errors) => {
                __toastToggler({
                    open: true,
                    type: "error",
                    message: errors?.message,
                });
            },
        });
    }

    const mobWatch = watch("mobile");

    useEffect(() => {
        if (mobWatch) {
            setLocalStorage(CONSTANTS.MOBILE, mobWatch)
        }
        else {
            removeLocalStorage(CONSTANTS.MOBILE)
        }
    }, [mobWatch])

    return (
        <form
            onSubmit={gHandleSubmit(generateOtpHandler)}
            className="otp-forms">
            <DialogTitle>Guest Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the below detail to Login with OTP
                </DialogContentText>
                <Controller
                    name="name"
                    control={gControl}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState,
                    }) => (
                        <TextField
                            autoFocus
                            fullWidth
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            margin="dense"
                            variant="outlined"
                            placeholder="Your Name"
                            helperText={
                                gErrors.name &&
                                `${gErrors.name.message}`
                            }
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={gControl}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState,
                    }) => (
                        <TextField
                            autoFocus
                            fullWidth
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            margin="dense"
                            variant="outlined"
                            placeholder="Your Email"
                            helperText={
                                gErrors.email &&
                                `${gErrors.email.message}`
                            }
                        />
                    )}
                />
                <Controller
                    name="mobile"
                    control={gControl}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                        formState,
                    }) => (
                        <TextField
                            autoFocus
                            fullWidth
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            margin="dense"
                            variant="outlined"
                            placeholder="Your Mobile"
                            helperText={
                                gErrors.mobile &&
                                `${gErrors.mobile.message}`
                            }
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => __otpModalToggler(false)}>
                    Cancel
                </Button>
                <Button type="submit">Send Otp</Button>
            </DialogActions>
        </form>
    );
}

export default OtpRegister;
