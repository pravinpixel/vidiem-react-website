import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useJarStyles, useJarProperties, useResetJarPropertiesAlt } from 'store/hooks/WebHooks';
import { useQueryClient } from "react-query";
import _, { values } from "lodash";
import * as yup from "yup"
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CategoryList from "sections/CategoryList";
import JarProperties from "sections/JarProperties";
import JarLists from "sections/JarLists";

const schema = yup.object({
    jar_selected: yup.string().required("You must choose one of JARS"),
    has_shape: yup.boolean(),
    has_lid: yup.boolean(),
    has_handle: yup.boolean(),
    shape_id: yup.string().when("has_shape", {
        is: (value) => value === true,
        then: (schema) => schema.required("You must choose one of SHAPE"),
        otherwise: (schema) => schema,
    }),
    lid_id: yup.string().when("has_lid", {
        is: (value) => value === true,
        then: (schema) => schema.required("You must choose one of LID"),
        otherwise: (schema) => schema,
    }),
    handle_id: yup.string().when("has_handle", {
        is: (value) => value === true,
        then: (schema) => schema.required("You must choose one of HANDLE"),
        otherwise: (schema) => schema,
    }),
})

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

        default:
            return (<JarProperties {...props} />)
    }
}

function StepChooseJarStyles(props) {
    const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION)
    const prop_history = getLocalStorage(CONSTANTS.PROP_HISTORY)
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        current,
        __moveToggler,
        __toastToggler,
        __updateHandler,
        //__resetCustomization,
    } = props

    const [grindingType, setGrindingType] = useState(current?.grinding_type?.type_id)
    const [chooser, setChooser] = useState(null)
    const [propHistory, setPropHistory] = useState(prop_history ? JSON.parse(prop_history) : {})

    const {
        refetch: fetchGrindingTypes,
        data: grindingList,
        isLoading: grindingLoader
    } = useJarStyles(current_customization_id)
    const {
        refetch: fetchJarProperties,
        data: jarPropertyList,
        isLoading: propertyLoader
    } = useJarProperties(grindingType)
    const {
        mutate: resetPropertiesAlt,
    } = useResetJarPropertiesAlt();

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            type_id: '',
            shape_id: '',
            lid_id: '',
            handle_id: '',
            jar_selected: '',
            has_shape: false,
            has_lid: false,
            has_handle: false
        }
    })

    const __resetProperties = (e, id, type) => {
        if (current?.shape?.type_id || current?.lid?.type_id || current?.handle?.type_id) {
            let formData = {
                uuid: current_customization_id
            }
            resetPropertiesAlt(formData, {
                onSuccess: (response) => {
                    let formData = {
                        uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
                        type: TERM[type],
                        id: id
                    }
                    __updateHandler(formData, "none")
                },
                onError: (error) => {
                    console.log(error);
                },
            });
        }
        else {
            let formData = {
                uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
                type: TERM[type],
                id: id
            }
            __updateHandler(formData, "none")
        }
    }
    const __resetCustomization = (e) => {
        e.preventDefault();
        let formData = {
            uuid: current_customization_id
        }
        resetPropertiesAlt(formData, {
            onSuccess: (response) => {
                // Call current customization once logged in!
                queryClient.refetchQueries('CurrentCustomisation');
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }
    const updatePropertyHandler = (e, type) => {
        e.preventDefault();
        //const typeId = e.target.value

        // setSavedValue((state) => {
        //     return {
        //         ...state, [grindingType]: { ...state[grindingType], [type]: typeId }
        //     }
        // })

        // grindingList?.data?.forEach((cat) => {
        //     val[cat?.type_id][type] = typeId
        // })
        // console.log(val, 'val')
        // setSavedValue(val)

        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            type: TERM[type],
            current_type_id: grindingType,
            id: e.target.value
        }
        __updateHandler(formData, "none")
    }
    const onSubmitHandler = (fData) => {
        navigate(`/customize/personalize-message`, {
            replace: true,
        });
    }

    // Check form errors and show notifications
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
    // Fetch Categories
    useEffect(() => {
        if (current_customization_id) {
            fetchGrindingTypes(current_customization_id)
        }
    }, [current_customization_id])
    // On update default category to current customization
    useEffect(() => {
        if (grindingList?.data) {
            const catHistory = {}
            const result = grindingList?.data.filter((list) => {
                catHistory[list['type_id']] = {
                    shape_id: null,
                    lid_id: null,
                    handle_id: null
                }
                return list.selected === "true"
            });
            if (result) {
                if (!_.has(current, 'grinding_type')) {
                    let formData = {
                        uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
                        type: "grinding_type",
                        id: result[0].type_id
                    }
                    __updateHandler(formData, "none")
                }
            }

            setPropHistory(catHistory)
        }
    }, [grindingList])
    // Fetch Jar Properties
    useEffect(() => {
        if (grindingType) {
            fetchJarProperties(grindingType)

        }
    }, [grindingType])
    // Jar property available or not
    useEffect(() => {
        if (jarPropertyList) {
            var shapeFlag = false;
            var lidFlag = false;
            var handleFlag = false;
            shapeFlag = jarPropertyList?.data?.shape.some(function (c) {
                if (c["selected"]) {
                    return true;
                }
            });
            lidFlag = jarPropertyList?.data?.lid.some(function (c) {
                if (c["selected"]) {
                    return true;
                }
            });
            handleFlag = jarPropertyList?.data?.handle.some(function (c) {
                if (c["selected"]) {
                    return true;
                }
            });

            setValue('has_shape', shapeFlag);
            setValue('has_lid', lidFlag);
            setValue('has_handle', handleFlag);
        }
    }, [jarPropertyList])
    // Set values to form
    useEffect(() => {
        if (current?.grinding_type) {
            setGrindingType(current?.grinding_type?.type_id)
        }

        // Set Form values for validations
        if (current?.shape) {
            setValue('shape_id', current?.shape?.type_id);
            setPropHistory((state) => {
                return {
                    ...state, [current?.grinding_type?.type_id]: {
                        ...state[current?.grinding_type?.type_id], ["shape_id"]: current?.shape?.type_id
                    }
                }
            })
        }
        else {
            setValue('shape_id', "");
        }
        if (current?.lid) {
            setValue('lid_id', current?.lid?.type_id);
            setPropHistory((state) => {
                return {
                    ...state, [current?.grinding_type?.type_id]: {
                        ...state[current?.grinding_type?.type_id], ["lid_id"]: current?.lid?.type_id
                    }
                }
            })
        }
        else {
            setValue('lid_id', "");
        }
        if (current?.handle) {
            setValue('handle_id', current?.handle?.type_id);
            setPropHistory((state) => {
                return {
                    ...state, [current?.grinding_type?.type_id]: {
                        ...state[current?.grinding_type?.type_id], ["handle_id"]: current?.handle?.type_id
                    }
                }
            })
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

        // Show Property or List panels
        if (current?.grinding_type?.type_id === "8" || current?.grinding_type?.type_id === "10") {
            setChooser("list")
            //console.log("inside one")
        }
        else {
            //__onSectionToggler(current)
            const hasShape = getValues("has_shape");
            const hasLid = getValues("has_lid");
            const hasHandle = getValues("has_handle");

            if (hasShape === true && hasLid === true && hasHandle === true) {
                if (current?.shape?.type_id && current?.lid?.type_id && current?.handle?.type_id) {
                    //console.log("Scenario - true, true, true")
                    setChooser("list")
                }
                else {
                    setChooser("property")
                }
            }
            else if (hasShape === true && hasLid === true && hasHandle === false) {
                if (current?.shape?.type_id && current?.lid?.type_id) {
                    //console.log("Scenario - true, true, false")
                    setChooser("list")
                }
                else {
                    setChooser("property")
                }
            }
            else if (hasShape === true && hasLid === false && hasHandle === false) {
                if (current?.shape?.type_id) {
                    //console.log("Scenario - true, false, false")
                    setChooser("list")
                }
                else {
                    setChooser("property")
                }
            }
            else if (hasShape === false && hasLid === false && hasHandle === false) {
                //console.log("Scenario - false, false, false")
                setChooser("property")
            }
            else if (hasShape === false && hasLid === true && hasHandle === true) {
                if (current?.lid?.type_id && current?.handle?.type_id) {
                    // console.log("Scenario - false, true, true")
                    setChooser("list")
                }
                else {
                    setChooser("property")
                }
            }
            else if (hasShape === false && hasLid === false && hasHandle === true) {
                if (current?.handle?.type_id) {
                    //console.log("Scenario - false, false, true")
                    setChooser("list")
                }
                else {
                    setChooser("property")
                }
            }
            else if (hasShape === false && hasLid === true && hasHandle === false) {
                if (current?.lid?.type_id) {
                    //console.log("Scenario - false, true, false")
                    setChooser("list")
                }
                else {
                    setChooser("property")
                }
            }
            else {
                //console.log("else")
                setChooser("property")
            }
        }
    }, [current])
    // 
    useEffect(() => {
        if (propHistory) {
            setLocalStorage(CONSTANTS.PROP_HISTORY, JSON.stringify(propHistory))
        }
    }, [propHistory])
    // String to object
    // useEffect(() => {
    //     if (savedValue) {
    //         setLocalStorage(CONSTANTS.PROP_HISTORY, JSON.stringify(savedValue))
    //         // const hasCategory = savedValue[grindingType];
    //         // if (hasCategory) {
    //         //     setPropHistory(hasCategory)
    //         // }
    //     }
    // }, [savedValue])

    const ShowSteps = useMemo(() => <CustomizationJarStyles
        chooser={chooser}
        current={current}
        control={control}
        grindingType={grindingType}
        propHistory={""}
        jarPropertyList={jarPropertyList}
        propertyLoader={propertyLoader}
        updatePropertyHandler={updatePropertyHandler}
        updateHandler={__updateHandler}
        __toastToggler={__toastToggler}
    />, [chooser, current, grindingType, jarPropertyList]);

    console.log("propHistory", propHistory)

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
                        changeHandler={__resetProperties} />
                </div>
                <div className="vi-property-scroller">
                    <input
                        type="hidden"
                        name="jar_selected"
                        {...register('jar_selected')}
                    />
                    <input
                        type="hidden"
                        name="has_shape"
                        {...register('has_shape')}
                    />
                    <input
                        type="hidden"
                        name="has_lid"
                        {...register('has_lid')}
                    />
                    <input
                        type="hidden"
                        name="has_handle"
                        {...register('has_handle')}
                    />
                    {ShowSteps}
                </div>
            </div>
            <div className='vi-body-footer'>
                <div className="buton-wrapper">
                    {current?.shape?.type_id || current?.lid?.type_id || current?.handle?.type_id ? (<Button
                        className='prev'
                        size="medium"
                        startIcon={<ArrowBackIosNewOutlinedIcon />}
                        onClick={(e) => __resetCustomization(e)}>
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
