import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useNavigate } from 'react-router-dom';
import { useColors, useMotors } from 'store/hooks/WebHooks';
import * as yup from "yup"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MotorInfoWidget from "widgets/MotorInfoWidget";
import ContentLoader from "widgets/ContentLoader";
import ProImage from "components/elements/ProImage";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import _ from "lodash";

const schema = yup.object({
    color_id: yup.string().required("You must choose one of COLOR"),
    motor_id: yup.string().required("You must choose one of MOTOR"),
}).required()

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function StepChooseColorAndMotor(props) {
    const navigate = useNavigate();
    const {
        current,
        __moveToggler,
        __toastToggler,
        __updateHandler
    } = props

    const [preview, setPreview] = useState(false)
    const [info, setInfo] = useState(null)
    const [activeColor, setActiveColor] = useState(null)

    const {
        refetch: fetchColors,
        data: colorList,
        isLoading: colorLoading
    } = useColors(current?.body?.base_id)
    const {
        refetch: fetchMotors,
        data: motorList,
        isLoading: motorLoading
    } = useMotors(current?.body?.base_id)

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            color_id: '',
            motor_id: ''
        },
        mode: 'onSubmit'
    })

    const updateHandler = (e, type) => {
        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            type: type,
            id: e.target.value
        }
        __updateHandler(formData, "none")
    }
    const __previewToggler = (toggle, data) => {
        setPreview(toggle)
        setInfo(data)
    }
    const onSubmitHandler = () => {
        navigate(`/customize/jar-styles`, {
            replace: true,
        });
    }

    useEffect(() => {
        if (errors?.color_id) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.color_id?.message
            })
        }
        else if (errors?.motor_id) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.motor_id?.message
            })
        }
    }, [errors])
    useEffect(() => {
        if (current?.body) {
            fetchColors(current?.body?.base_id)
            fetchMotors(current?.body?.base_id)
        }
        if (current?.color) {
            setValue('color_id', current?.color?.bm_color_id);
            setActiveColor(current?.color?.bm_color_id)
        }
        else {
            // Set by color
            let colors = _.filter(colorList && colorList?.colours, { 'active': 1 });
            if (colors?.length) {
                let formData = {
                    uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
                    type: "color",
                    id: colors[0].bm_color_id
                }
                __updateHandler(formData, "none")

                setValue('color_id', colors[0].bm_color_id);
                setActiveColor(colors[0].bm_color_id)
            }
            else {
                setValue('color_id', '');
                setActiveColor(null)
            }
        }
        if (current?.motor) {
            setValue('motor_id', current?.motor?.motor_id);
        }
        else {
            setValue('motor_id', '');
        }
    }, [current, colorList])

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="vi-body-wrapper">
            <div className='vi-body-title'>
                <h4>Choose Color And Motor</h4>
            </div>
            <PerfectScrollbar
                options={scrollbarOptions}
                className="vi-body-content">
                {colorLoading && motorLoading ? (<ContentLoader size={20} color="error" />) : (
                    <Fragment>
                        <section className="vi-colors">
                            <h4>Select Color</h4>
                            <Controller
                                name="color_id"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        name="color-group"
                                        className="color-selector"
                                        onChange={(e) => updateHandler(e, "color")}>
                                        {colorList && colorList?.colours.map((color, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={color?.bm_color_id}
                                                control={<Radio />}
                                                label={
                                                    <div className={color?.bm_color_id == activeColor ? "selected" : ""}>
                                                        <ProImage image={color?.color_code_image} height="100%" width="100%" variant="circular" />
                                                    </div>
                                                }
                                            />))}
                                    </RadioGroup>
                                )}
                            />
                        </section>
                        <section className="vi-motors">
                            <h4>Select Motor</h4>
                            <Controller
                                name="motor_id"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        name="motor-group"
                                        onChange={(e) => updateHandler(e, "motor")}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            spacing={2}>
                                            {motorList && motorList?.data.map((motor, index) => (
                                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                                    <FormControlLabel
                                                        key={index}
                                                        value={motor?.motor_id}
                                                        control={<Radio />}
                                                        className="motor-selector"
                                                        label={<>
                                                            <div>
                                                                <ProImage image={motor?.basepath} height="80px" width="80px" variant="rectangular" />
                                                            </div>
                                                            <div>
                                                                <h4>{motor.name} <InfoOutlinedIcon onClick={() => __previewToggler(true, motor)}
                                                                    sx={{
                                                                        fontSize: "18px",
                                                                        color: "#E31E24"
                                                                    }}
                                                                />
                                                                </h4>
                                                                <p>{motor?.description.replace(/<(.|\n)*?>/g, '')}</p>
                                                                <h5><strong>₹</strong> {motor.price}</h5>
                                                            </div>
                                                        </>}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </RadioGroup>
                                )}
                            />
                        </section>
                    </Fragment>
                )}
            </PerfectScrollbar>
            <div className='vi-body-footer'>
                <div className="buton-wrapper">
                    <Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) => __moveToggler(e, 'select-product')}>
                        Change Body
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button
                        className='next'
                        size="medium"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        type="submit">
                        Next
                    </Button>
                </div>
            </div>
            <MotorInfoWidget open={preview} handler={__previewToggler} preview={info} />
        </form>
    );
}

export default StepChooseColorAndMotor;
