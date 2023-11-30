import { Fragment } from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPassword } from 'store/hooks/AuthHooks';
import isEmailValidator from "validator/lib/isEmail";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from "yup";

const forgotSchema = yup.object({
    email: yup.string()
        .required("Enter the Email")
        .email("Invalid email address!")
        .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid email")),
});

function ForgotPasswordWidget(props) {
    const { open, __openHandler, __toastToggler } = props

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotSchema),
        mode: "onSubmit",
        defaultValues: {
            email: "",
        },
    });

    const {
        mutate: forgotPassword
    } = useForgotPassword();

    const forgotPasswordHandler = (formData) => {
        forgotPassword(formData, {
            onSuccess: (response) => {
                __toastToggler({
                    open: true,
                    type: "success",
                    message: "A new password has been sent. Please login with new password",
                });

                setValue("email", "")
                __openHandler(false)
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

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={() => __openHandler(false)}>
                <DialogTitle>Forgot Password</DialogTitle>
                <form
                    onSubmit={handleSubmit(forgotPasswordHandler)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the email address you'd like your password reset information sent to!
                        </DialogContentText>
                        <Controller
                            name="email"
                            control={control}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    autoFocus
                                    fullWidth
                                    error={!!error}
                                    onChange={onChange}
                                    value={value}
                                    margin="dense"
                                    variant="standard"
                                    placeholder="Email Address"
                                    helperText={
                                        errors.email &&
                                        `${errors.email.message}`
                                    }
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => __openHandler(false)}>Cancel</Button>
                        <Button type="submit">Reset</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}

export default ForgotPasswordWidget;
