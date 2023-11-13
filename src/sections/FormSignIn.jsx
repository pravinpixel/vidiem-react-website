import { Fragment } from "react";
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getLocalStorage } from "helpers/HelperFunctions";
import { CONSTANTS } from "helpers/AppConstants";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PerfectScrollbar from 'react-perfect-scrollbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import isEmailValidator from 'validator/lib/isEmail';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ForgotPasswordWidget from "widgets/ForgotPasswordWidget";
import * as yup from "yup"
import Grid from '@mui/material/Grid';

const schema = yup.object({
    email: yup.string()
        .required("Enter the Email")
        .email("Invalid email address!")
        .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid email")),
    password: yup.string()
        .required('Enter the Password'),
})

const registerShcema = yup.object().shape({
    name: yup.string()
        .required("Enter the Name")
        .matches(/^[aA-zZ\s]+$/, "Only Alphabets are allowed!"),
    email: yup.string()
        .required("Enter the Email")
        .email("Invalid email address!")
        .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new yup.ValidationError("Invalid email")),
    dob: yup.string()
        .required("Enter the Date of Birth"),
    mobile_no: yup
        .string()
        .required("Enter the Phone Number")
        .min(10, "Invalid phone number!")
        .max(10, "Invalid phone number!")
        .matches(/^[0-9]+$/, "Only Numbers are allowed!"),
    password: yup.string()
        .required("Enter the Password"),
    confirm_password: yup
        .string()
        .required("Enter the Confirm Password")
        .oneOf([yup.ref("password"), null], "Passwords does not match!"),
});

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function FormSignIn(props) {

    const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION)

    const {
        activeTab,
        __tabChangeHandler,
        __loginHandler,
        __registerHandler,
        __moveToggler,
        __toastToggler
    } = props

    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            email: '',
            password: '',
            uuid: current_customization_id
        }
    })

    const {
        control: registerControl,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerError },
    } = useForm({
        resolver: yupResolver(registerShcema),
        mode: "onChange",
        defaultValues: {
            name: '',
            email: '',
            dob: '',
            mobile_no: '',
            password: '',
            confirm_password: '',
            uuid: current_customization_id
        }
    });

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
                <PerfectScrollbar
                    options={scrollbarOptions}>
                    <div className="vi-forms">
                        <form
                            onSubmit={handleSubmit(__loginHandler)}
                            className="vi-dummy">
                            <Grid
                                container
                                direction="row"
                                rowSpacing={1}
                                columnSpacing={2}>
                                <Grid item xs={12}>
                                    <input
                                        type="hidden"
                                        name="uuid"
                                        {...register('uuid')}
                                    />
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
                                                size="small"
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
                                        name="password"
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
                                                size="small"
                                                type="password"
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Password"
                                                helperText={errors.password && `${errors.password.message}`}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} className="txt-center">
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        type='submit'
                                        sx={{
                                            marginBlock: "10px",
                                        }}>
                                        Sign In & Continue
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <ForgotPasswordWidget __toastToggler={__toastToggler} />
                        <Divider
                            color="red"
                            sx={{ width: "100%", padding: "15px 0px" }}
                            className="v-divider">
                            OR
                        </Divider>
                        <form
                            onSubmit={handleRegisterSubmit(__registerHandler)}
                            className="vi-dummy">
                            <Grid
                                container
                                direction="row"
                                rowSpacing={1}
                                columnSpacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={registerControl}
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                error={!!registerError}
                                                onChange={onChange}
                                                value={value}
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Name"
                                                helperText={
                                                    registerError.name &&
                                                    `${registerError.name.message}`
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="email"
                                        control={registerControl}
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
                                                placeholder="Email"
                                                helperText={
                                                    registerError.email &&
                                                    `${registerError.email.message}`
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="dob"
                                        control={registerControl}
                                        render={({
                                            field: {
                                                onChange,
                                                value,
                                            },
                                            fieldState: { error },
                                        }) => (
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}>
                                                <DemoContainer
                                                    components={["DatePicker"]}>
                                                    <DatePicker
                                                        value={value}
                                                        margin="dense"
                                                        slotProps={{
                                                            textField: {
                                                                variant: "filled",
                                                                fullWidth: true,
                                                                size: "small",
                                                                error: !!error,
                                                                helperText:
                                                                    registerError.dob &&
                                                                    `${registerError.dob.message}`,
                                                            },
                                                        }}
                                                        onChange={onChange}
                                                        // onChange={(e) => {
                                                        //     onChange(dayjs(e).format("DD-MM-YYYY"));
                                                        // }}
                                                        format={"DD-MM-YYYY"}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="mobile_no"
                                        control={registerControl}
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
                                                placeholder="Phone Number"
                                                helperText={
                                                    registerError.mobile_no &&
                                                    `${registerError.mobile_no.message}`
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="password"
                                        control={registerControl}
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
                                                type="password"
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Password"
                                                helperText={
                                                    registerError.password &&
                                                    `${registerError.password.message}`
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="confirm_password"
                                        control={registerControl}
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
                                                type="password"
                                                margin="dense"
                                                variant="filled"
                                                placeholder="Confrim password"
                                                helperText={
                                                    registerError.confirm_password &&
                                                    `${registerError.confirm_password.message}`
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} className="txt-center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="medium"
                                        sx={{
                                            marginBlock: "10px",
                                        }}>
                                        Register & Continue
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
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
                    <Divider orientation="vertical" flexItem />
                    <Button
                        className='next'
                        size="medium"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        onClick={handleSubmit(__loginHandler)}>
                        Next
                    </Button>
                </div>
            </div>
        </Fragment>
    );
}

export default FormSignIn;
