import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { useMyProfile, useMyProfileUpdate } from "store/hooks/AuthHooks";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import SideBar from 'layouts/utility/SideBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup"
import ToasterWidget from 'widgets/ToasterWidget';
import dayjs from "dayjs";

const schema = yup.object({
    gender: yup.string()
        .required("Choose the Gender"),
    name: yup.string()
        .required("Enter the Name"),
    dob: yup.string()
        .required("Enter the Date of Birth"),
    hasTxt: yup.boolean(),
    password: yup.string()
        .when('hasTxt', {
            is: (value) => value === true,
            then: (schema) => schema.required('Enter the Password'),
            otherwise: (schema) => schema,
        }),
    confirm_password: yup.string()
        .when('hasTxt', {
            is: (value) => value === true,
            then: (schema) => schema.required('Enter the Confirm Password').oneOf([yup.ref("password"), null], "Passwords does not match!"),
            otherwise: (schema) => schema,
        }),
})

function MyProfile() {
    const [profile, setMyProfile] = useState(null)
    const [toaster, setToaster] = useState({
        open: "",
        type: "",
        message: "",
    });

    const {
        refetch: fetchMyProfile,
        data: profileData
    } = useMyProfile()
    const {
        mutate: startProfileUpdate,
    } = useMyProfileUpdate();

    useEffect(() => {
        if (profileData?.data) {
            setMyProfile(profileData?.data)
        }
    }, [profileData])

    useEffect(() => {
        fetchMyProfile()
    }, [])

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            uuid: '',
            gender: '',
            name: '',
            mobile_no: '',
            email: '',
            dob: '',
            newsletter: '',
            special_offer: '',
            password: '',
            confirm_password: '',
            hasTxt: false,
        }
    })

    const passwordWatch = watch("password")
    const confirmPasswordWatch = watch("confirm_password")

    const __toastToggler = (obj) => {
        setToaster({
            ...toaster,
            open: obj.open,
            type: obj.type,
            message: obj.message,
        });
    }
    const onSubmit = (formData) => {
        startProfileUpdate(formData, {
            onSuccess: (response) => {
                __toastToggler({
                    open: true,
                    type: "success",
                    message: "Profile updated ... successfully!",
                });
            },
            onError: (error) => {
                __toastToggler({
                    open: true,
                    type: "error",
                    message: "Something went wrong!",
                });
            },
        });
    }

    useEffect(() => {
        if (profile) {
            let alter = {
                gender: profile?.gender,
                name: profile?.name,
                mobile_no: profile?.mobile_no,
                email: profile?.email,
                dob: dayjs(profile?.dob),
                newsletter: profile?.newsletter === "1" ? true : false,
                special_offer: profile?.special_offer === "1" ? true : false,
                password: '',
                confirm_password: ''
            }

            reset(alter);
        }
    }, [profile]);

    useEffect(() => {
        if (passwordWatch !== '' && confirmPasswordWatch !== '') {
            setValue('hasTxt', true);
        }
        else {
            setValue('hasTxt', false);
        }
    }, [passwordWatch, confirmPasswordWatch]);

    return (
        <div className="dashbord my_accounts">
            <section className="dasboard-body">
                <Container maxWidth="xl">
                    <div className='dashboard-content'>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch">
                            <SideBar />
                            <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
                                <div className='table-wrapper'>
                                    <h3>My Profile</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsum tempore</p>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="profile-forms">
                                        <Grid
                                            container
                                            direction="row"
                                            rowSpacing={1}
                                            columnSpacing={0}>
                                            <Grid
                                                container
                                                direction="row"
                                                rowSpacing={4}
                                                columnSpacing={2}>
                                                <Grid item xs={12}>
                                                    <FormLabel id="gender-label">Title</FormLabel>
                                                    <Controller
                                                        name="gender"
                                                        control={control}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error }
                                                        }) => (
                                                            <RadioGroup
                                                                row
                                                                aria-labelledby="gender-label"
                                                                name="gender-group"
                                                                value={value}
                                                                onChange={onChange}>
                                                                <FormControlLabel value="Mr." control={<Radio />} label="Mr." />
                                                                <FormControlLabel value="Mrs." control={<Radio />} label="Mrs." />
                                                                <FormControlLabel value="Ms." control={<Radio />} label="Ms." />
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </Grid>
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
                                                                error={!!error}
                                                                onChange={onChange}
                                                                value={value}
                                                                label="Your Name *"
                                                                variant="outlined"
                                                                placeholder="Your Name"
                                                                helperText={errors.name && `${errors.name.message}`}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={12}>
                                                    <Controller
                                                        name="dob"
                                                        control={control}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error }
                                                        }) => (
                                                            <TextField
                                                                fullWidth
                                                                error={!!error}
                                                                onChange={onChange}
                                                                value={value}
                                                                label="Date of Birth *"
                                                                variant="outlined"
                                                                placeholder="yyyy-mm-dd"
                                                                helperText={errors.dob && `${errors.dob.message}`}
                                                            />
                                                        )}
                                                    />
                                                </Grid> */}
                                                <Grid item xs={12}>
                                                    <Controller
                                                        name="dob"
                                                        control={control}
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
                                                                        slotProps={{
                                                                            textField: {
                                                                                variant: "outlined",
                                                                                fullWidth: true,
                                                                                error: !!error,
                                                                                helperText:
                                                                                    errors.dob &&
                                                                                    `${errors.dob.message}`,
                                                                            },
                                                                        }}
                                                                        onChange={onChange}
                                                                        label="Date of Birth *"
                                                                        placeholder="yyyy-mm-dd"
                                                                        format={"YYYY-MM-DD"}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <h4>Change Password</h4>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="password"
                                                        control={control}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error }
                                                        }) => (
                                                            <TextField
                                                                fullWidth
                                                                error={!!error}
                                                                onChange={onChange}
                                                                value={value}
                                                                label="Password *"
                                                                variant="outlined"
                                                                placeholder="Password"
                                                                helperText={errors.password && `${errors.password.message}`}
                                                                type="password"
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Controller
                                                        name="confirm_password"
                                                        control={control}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error }
                                                        }) => (
                                                            <TextField
                                                                fullWidth
                                                                error={!!error}
                                                                onChange={onChange}
                                                                value={value}
                                                                label="Confirm Password *"
                                                                variant="outlined"
                                                                placeholder="Confirm Password"
                                                                helperText={errors.confirm_password && `${errors.confirm_password.message}`}
                                                                type="password"
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Controller
                                                        name="newsletter"
                                                        control={control}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error }
                                                        }) => (
                                                            <FormControlLabel onChange={onChange} control={<Checkbox checked={value} />} label="Sign up for our newsletter!" />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Controller
                                                        name="special_offer"
                                                        control={control}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error }
                                                        }) => (
                                                            <FormControlLabel onChange={onChange} control={<Checkbox checked={value} />} label="Receive special offers!" />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button type='submit'>Save Changes</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </section>
            <ToasterWidget data={toaster} handler={__toastToggler} />
        </div>
    );
}

export default MyProfile;
