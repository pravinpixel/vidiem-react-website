import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setLocalStorage, getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useNavigate } from 'react-router-dom';
import { useBodyStyles } from 'store/hooks/WebHooks';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import * as yup from "yup"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ProImage from "components/elements/ProImage";
import ContentLoader from "widgets/ContentLoader";
import Grid from '@mui/material/Grid';

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

const schema = yup.object({
    body_id: yup.string().required("You need to select one of BODY"),
}).required()

function StepChooseProduct(props) {
    const navigate = useNavigate();
    const {
        current,
        __moveToggler,
        __toastToggler,
        __createHandler,
        __updateHandler
    } = props

    const {
        refetch: fetchBodyStyles,
        data: bodyStyles,
        isLoading: loading
    } = useBodyStyles()

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            body_id: ''
        },
        mode: 'onSubmit'
    })

    const productChangeHandler = (e, type) => {
        setLocalStorage(CONSTANTS.CURRENT_PRODUCT, e.target.value)
        const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION)

        if (current_customization_id) {
            let formData = {
                uuid: current_customization_id,
                type: type,
                id: e.target.value
            }
            __updateHandler(formData, "none")
        }
        else {
            const formData = new FormData()
            formData.append("body_id", e.target.value)
            __createHandler(formData)
        }
    }

    const onSubmitHandler = (fData) => {
        if (!current) {
            const formData = new FormData()
            formData.append("body_id", fData.body_id)
            __createHandler(formData)
        }
        else {
            navigate(`/customize/color-and-motor`, {
                replace: true,
            });
        }
    }

    useEffect(() => {
        if (errors?.body_id) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.body_id?.message
            })
        }
    }, [errors])

    useEffect(() => {
        if (current?.body) {
            setValue('body_id', current?.body?.base_id);
        }
    }, [current])

    useEffect(() => {
        fetchBodyStyles()
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="vi-body-wrapper">
            <div className='vi-body-title'>
                <h4>Choose Your Body Style(5 Items)</h4>
            </div>
            <PerfectScrollbar
                options={scrollbarOptions}
                className="vi-body-content">
                {loading ? (<ContentLoader size={20} color="error" />) : (
                    <Controller
                        name="body_id"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                name="body-group"
                                className="body-selector"
                                onChange={(e) => productChangeHandler(e, "body")}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    rowSpacing={1}
                                    columnSpacing={2}>
                                    {bodyStyles && bodyStyles?.data.map((body, index) => {
                                        return (
                                            <Grid item xs={6} sm={4} md={6} lg={4} xl={3}>
                                                <FormControlLabel
                                                    key={index}
                                                    value={body?.base_id}
                                                    control={<Radio />}
                                                    label={
                                                        <div className="label-wrapper">
                                                            <div className={current?.body?.base_id === body?.base_id ? "selected" : "nonee"}>
                                                                <ProImage image={body?.basepath} height="100%" width="100%" variant="rectangular" />
                                                                {current?.body?.base_id === body?.base_id ? (<span className="right">
                                                                    <CheckBoxSharpIcon sx={{ color: "#E31E24" }} />
                                                                </span>) : null}
                                                            </div>
                                                            <h4>{body.basetitle}</h4>
                                                            <p>{body.basesubtitle}</p>
                                                        </div>
                                                    }
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </RadioGroup>
                        )}
                    />)}
            </PerfectScrollbar>
            <div className='vi-body-footer'>
                <div className="buton-wrapper">
                    <Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) => __moveToggler(e, 'home')}>
                        Back
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button
                        className='next'
                        size="medium"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        type='submit'>
                        Next
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default StepChooseProduct;
