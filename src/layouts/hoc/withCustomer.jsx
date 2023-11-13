import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateCustomization, useUpdateCustomization, useCurrentCustomization } from "store/hooks/ProductHooks";
import { getSessionStorage, setSessionStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import ToasterWidget from "widgets/ToasterWidget";

const withCustomer = (Component) => {

    const CustomerComponent = () => {
        const { step } = useParams()
        const navigate = useNavigate();
        const current_customization_id = getSessionStorage(CONSTANTS.CURRENT_CUSTOMIZATION)

        const [product, setProduct] = useState(null)
        const [drawer, setDrawer] = useState(false)
        const [toaster, setToaster] = useState({
            open: '',
            type: '',
            message: ''
        })

        const {
            mutate: createCustomization,
            isLoading: createLoader
        } = useCreateCustomization();
        const {
            mutate: updateCustomization,
            isLoading: updateLoader
        } = useUpdateCustomization();
        const {
            refetch: fetchCurrentCustomization,
            data: customizationData,
            isLoading: customizationLoader
        } = useCurrentCustomization(current_customization_id)

        const __drawerToggler = (toggle) => {
            setDrawer(toggle)
        }
        const __toastToggler = (obj) => {
            setToaster({
                ...toaster,
                open: obj.open,
                type: obj.type,
                message: obj.message
            })
        }
        const __moveToggler = (e, move) => {
            e.preventDefault();

            if (move === "home") {
                navigate('/home');
            }
            else {
                navigate(`/customize/${move}`, {
                    replace: true,
                    // state: {
                    //     id: 7,
                    //     color: 'green'
                    // }
                });
            }
        }
        const __createCustomizationHandler = (fData) => {
            const formData = new FormData()
            formData.append("body_id", fData.body_id)

            createCustomization(formData, {
                onSuccess: (response) => {
                    setSessionStorage(CONSTANTS.CURRENT_CUSTOMIZATION, response?.uuid)
                    navigate(`/customize/color-and-motor`, {
                        replace: true,
                    });
                },
                onError: (error) => {
                    console.log(error);
                },
            });
        }
        const __updateCustomizationHandler = (fData) => {
            useUpdateCustomization(fData, {
                onSuccess: (response) => {
                    // Call get api & redirect
                },
                onError: (error) => {
                    console.log(error);
                },
            });
        }
        const __clearCustomizationHandler = (fData) => {

        }

        useEffect(() => {
            if (customizationData) {
                setProduct(customizationData?.data)
            }
        }, [customizationData]);

        return (<>
            <Component
                step={step}
                drawer={drawer}
                toaster={toaster}
                product={product}
                __drawerToggler={__drawerToggler}
                __toastToggler={__toastToggler}
                __moveToggler={__moveToggler}
                __createHandler={__createCustomizationHandler}
                __updateHandler={__updateCustomizationHandler}
                __cleareHandler={__clearCustomizationHandler}
            />
            <ToasterWidget data={toaster} handler={__toastToggler} />
        </>)
    };

    return CustomerComponent;
};

export default withCustomer;
