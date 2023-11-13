import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useJarStyles } from 'store/hooks/WebHooks';
import _ from "lodash";
import * as yup from "yup"
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CategoryList from "sections/CategoryList";
import JarProperties from "sections/JarProperties";
import JarLists from "sections/JarLists";

const schema = yup.object({
    shape_id: yup.string().required("You must choose one of SHAPE"),
    lid_id: yup.string().required("You must choose one of LID"),
    handle_id: yup.string().required("You must choose one of HANDLE"),
    jar_selected: yup.string().required("You must choose one of JARS"),
}).required()

const TERM = {
    "grinding_type": "grinding_type",
    "shape_id": "shape",
    "lid_id": "lid",
    "handle_id": "handle",
}

function CustomizationJarStyles(props) {
    const { chooser } = props
    switch (chooser) {
        case "property":
            return (<JarProperties {...props} />)

        case "list":
            return (<JarLists {...props} />)
    }
}

function StepChooseJarStyles(props) {
    const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION)
    const navigate = useNavigate();
    const {
        current,
        __moveToggler,
        __toastToggler,
        __updateHandler,
        __resetCustomization,
    } = props

    const [grindingType, setGrindingType] = useState(null)
    const [chooser, setChooser] = useState("property")

    const {
        refetch: fetchGrindingTypes,
        data: grindingList,
        isLoading: grindingLoader
    } = useJarStyles(current_customization_id)

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            type_id: '',
            shape_id: '',
            lid_id: '',
            handle_id: '',
            jar_selected: ''
        }
    })

    const updateHandler = (e, id, type) => {
        e.preventDefault();

        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            type: TERM[type],
            id: id
        }

        __updateHandler(formData, "none")
    }
    const updatePropertyHandler = (e, type) => {
        e.preventDefault();

        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            type: TERM[type],
            id: e.target.value
        }
        __updateHandler(formData, "none")
    }
    const onSubmitHandler = (fData) => {
        navigate(`/customize/personalize-message`, {
            replace: true,
        });
    }

    useEffect(() => {
        if (errors?.shape_id) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.shape_id?.message
            })
        }
        else if (errors?.lid_id) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.lid_id?.message
            })
        }
        else if (errors?.handle_id) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.handle_id?.message
            })
        }
        else if (errors?.jar_selected) {
            __toastToggler({
                open: true,
                type: 'error',
                message: errors.jar_selected?.message
            })
        }
    }, [errors])

    useEffect(() => {
        if (current_customization_id) {
            fetchGrindingTypes(current_customization_id)
        }
    }, [current_customization_id])

    useEffect(() => {
        if (current?.grinding_type) {
            setGrindingType(current?.grinding_type.type_id)
        }

        if (current?.shape) {
            setValue('shape_id', current?.shape?.type_id);
        }
        else {
            setValue('shape_id', "");
        }

        if (current?.lid) {
            setValue('lid_id', current?.lid?.type_id);
        }
        else {
            setValue('lid_id', "");
        }

        if (current?.handle) {
            setValue('handle_id', current?.handle?.type_id);
        }
        else {
            setValue('handle_id', "");
        }

        if (current?.jar?.length) {
            setValue('jar_selected', "available");
        }
        else {
            setValue('jar_selected', "");
        }

        if (current?.shape?.type_id && current?.lid?.type_id && current?.handle?.type_id) {
            setChooser("list")
        }
        else {
            setChooser("property")
        }
    }, [current])

    useEffect(() => {
        if (grindingList?.data) {
            const result = grindingList?.data.filter((list) => list.selected === "true");
            if (result) {
                setGrindingType(result[0].type_id)
            }
        }
    }, [grindingList])

    const ShowSteps = useMemo(() => <CustomizationJarStyles
        chooser={chooser}
        current={current}
        control={control}
        grindingType={grindingType}
        updatePropertyHandler={updatePropertyHandler}
        updateHandler={__updateHandler}
        __toastToggler={__toastToggler}
    />, [chooser, current, grindingType]);

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="vi-body-wrapper">            
            <div className='vi-body-title'>
                <h4>Select Your Required Jar Style</h4>
            </div>
            <div className="vi-body-content">
                <div className="vi-category-scroller">
                    <CategoryList
                        loading={grindingLoader}
                        category={grindingList?.data}
                        selected={grindingType}
                        changeHandler={updateHandler} />
                </div>
                <div className="vi-property-scroller">
                    <input
                        type="hidden"
                        name="jar_selected"
                        defaultValue=""
                        {...register('jar_selected')}
                    />
                    {ShowSteps}
                </div>
            </div>
            <div className='vi-body-footer'>
                <div className="buton-wrapper">
                    {current?.shape?.type_id && current?.lid?.type_id && current?.handle?.type_id ? (<Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={__resetCustomization}>
                        Reset Preferences
                    </Button>) : (<Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) => __moveToggler(e, 'color-and-motor')}>
                        Back
                    </Button>)}
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
        </form>
    );
}

export default StepChooseJarStyles;
