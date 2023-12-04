import { useState, useEffect, useMemo } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';
import { useResetJarProperties } from 'store/hooks/WebHooks';
import { useCreateCustomization, useUpdateCustomization, useCurrentCustomization } from "store/hooks/ProductHooks";
import { getLocalStorage, setLocalStorage, makeActiveTab } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { Link } from 'react-router-dom';
import HomePreview from 'sections/HomePreview';
import ProductPreview from 'sections/ProductPreview';
import StepChooseColorAndMotor from 'components/customize_steps/StepChooseColorAndMotor';
import StepChooseJarStyles from 'components/customize_steps/StepChooseJarStyles';
import StepChooseProduct from 'components/customize_steps/StepChooseProduct';
import StepPersonalizeMessage from 'components/customize_steps/StepPersonalizeMessage';
import ToasterWidget from "widgets/ToasterWidget";
import ProfileWidget from 'widgets/ProfileWidget';
import BuildWidget from 'widgets/BuildWidget';

function CustomizationSteps(props) {
    const { step } = props

    switch (step) {
        case "select-product":
            return (<StepChooseProduct {...props} />)
        case "color-and-motor":
            return (<StepChooseColorAndMotor {...props} />)

        case "jar-styles":
            return (<StepChooseJarStyles {...props} />)

        case "personalize-message":
            return (<StepPersonalizeMessage {...props} />)

        default:
            return (<StepChooseProduct {...props} />)
    }
}

function Customize() {
    const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION)
    const current_product = getLocalStorage(CONSTANTS.CURRENT_PRODUCT)
    const authToken = getLocalStorage(CONSTANTS.CUSTOMER_TOKEN)
    const navigate = useNavigate();
    const { step } = useParams()

    const [indicator, setIndicator] = useState(null)
    const [product, setProduct] = useState(null)
    const [drawer, setDrawer] = useState(false)
    const [custmizeTxt, setCustomizeTxt] = useState("")
    const [toaster, setToaster] = useState({
        open: '',
        type: '',
        message: ''
    })

    // Create Customization
    const {
        mutate: createCustomization,
    } = useCreateCustomization();
    // Update Customization
    const {
        mutate: updateCustomization,
    } = useUpdateCustomization();
    // Reset Properties
    const {
        mutate: resetProperties,
    } = useResetJarProperties();
    // Fetch Customization
    const {
        refetch: fetchCurrentCustomization,
        data: customizationData,
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
    const __createCustomizationHandler = (formData) => {
        createCustomization(formData, {
            onSuccess: (response) => {
                setLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION, response?.uuid)
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }
    const __updateCustomizationHandler = (formData, redirectPage) => {
        updateCustomization(formData, {
            onSuccess: (response) => {
                if (redirectPage !== "none") {
                    navigate(`${redirectPage}`, {
                        replace: true,
                    });
                }
            },
            onError: (error) => {
                console.log(error);
            },
        });
    }
    const __clearCustomizationHandler = (fData) => {
    }
    const __resetCustomization = () => {
        let formData = {
            uuid: current_customization_id
        }
        resetProperties(formData);
    }
    const __previewTxtHandler = (txt) => {
        setCustomizeTxt(txt)
    }

    useEffect(() => {
        if (customizationData) {
            setProduct(customizationData?.data)
        }
    }, [customizationData])
    useEffect(() => {
        if (current_customization_id) {
            fetchCurrentCustomization(current_customization_id)
        }
    }, [current_customization_id])
    useEffect(() => {
        if (step) {
            setIndicator(makeActiveTab(step))
        }
    }, [step])

    const SelectedSteps = useMemo(() => <CustomizationSteps
        step={step}
        drawer={drawer}
        toaster={toaster}
        current={product}
        selected_body={current_product}
        __drawerToggler={__drawerToggler}
        __toastToggler={__toastToggler}
        __moveToggler={__moveToggler}
        __createHandler={__createCustomizationHandler}
        __updateHandler={__updateCustomizationHandler}
        __clearHandler={__clearCustomizationHandler}
        __resetCustomization={__resetCustomization}
        __previewTxtHandler={__previewTxtHandler}
    />, [step, product]);

    return (
        <>
            <Helmet>
                <title>Vidiem By You - Choose Your Mixer Grinder</title>
            </Helmet>
            <main className='vi-wrapper'>
                <section className='vi-preview'>
                    <section className='vi-preview-logo'>
                        <Link to="/home">
                            <img src="/assets/main_logo.png" alt="logo" />
                        </Link>
                        {authToken ? <ProfileWidget
                            drawer={drawer}
                            actionToggler={__drawerToggler} /> : null}
                    </section>
                    {product ? <ProductPreview
                        custom={product}
                        custmizeTxt={custmizeTxt}
                        drawer={drawer}
                        __drawerToggler={__drawerToggler}
                        __updateHandler={__updateCustomizationHandler}
                    /> : <HomePreview />}
                </section>
                <section className='vi-player'>
                    <div className='vi-player-tabs'>
                        <div className={indicator && indicator?.tabOne}>
                            <span>Model & Color</span>
                        </div>
                        <div className={indicator && indicator?.tabTwo}>
                            <span>Jars</span>
                        </div>
                        <div className={indicator && indicator?.tabThree}>
                            <span>Personalize</span>
                        </div>
                    </div>
                    <div className='vi-player-content'>
                        {SelectedSteps}
                    </div>
                    <div className='vi-player-footer'>
                        <div className='vi-summary'>
                            <div>
                                <h4>Your Cart Summary</h4>
                                <h5>{product?.jar ? product?.jar.length : 0} Items Selected</h5>
                            </div>
                            <div>
                                <h2><strong>₹</strong> {product?.total_amount_before_discount ? product?.total_amount_before_discount : "0.00"} <span className='tax'>+ taxes</span></h2>
                            </div>
                        </div>
                    </div>
                    {authToken ? <ProfileWidget
                        drawer={drawer}
                        actionToggler={__drawerToggler} /> : null}
                </section>
            </main>
            {authToken ? <BuildWidget handler={__toastToggler} /> : null}
            <ToasterWidget data={toaster} handler={__toastToggler} />
        </>
    );
}

export default Customize
