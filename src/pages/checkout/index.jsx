import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCurrentCustomization } from "store/hooks/ProductHooks";
import { useAuthLogin, useAuthRegister, useGuestRegister } from "store/hooks/AuthHooks";
import { getLocalStorage, setLocalStorage, makeActiveTabAlt } from "helpers/HelperFunctions";
import { CONSTANTS } from "helpers/AppConstants";
import { useQueryClient } from "react-query";
import StepShippingAndBilling from "components/checkout_steps/StepShippingBilling";
import StepPayment from "components/checkout_steps/StepPayment";
import StepOrderConfirmation from "components/checkout_steps/StepOrderConfirmation";
import SummaryPreview from "sections/SummaryPreview";
import BuildWidget from "widgets/BuildWidget";
import ProfileWidget from "widgets/ProfileWidget";
import ToasterWidget from "widgets/ToasterWidget";
import ViewDetails from "widgets/ViewDetails";

function CheckoutSteps(props) {
    const { slug } = props;

    switch (slug) {
        case "shipping-and-billing":
            return <StepShippingAndBilling {...props} />;

        case "payment":
            return <StepPayment {...props} />;

        case "order-confirmation":
            return <StepOrderConfirmation {...props} />;

        default:
            return <StepShippingAndBilling {...props} />;
    }
}

function Checkout() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const authToken = getLocalStorage(CONSTANTS.CUSTOMER_TOKEN);
    const current_customization_id = getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION);

    const [indicator, setIndicator] = useState(null);
    const [product, setProduct] = useState(null);
    const [drawer, setDrawer] = useState(false);
    const [toaster, setToaster] = useState({
        open: "",
        type: "",
        message: "",
    });

    // Login
    const {
        mutate: loginHandler
    } = useAuthLogin();
    // User Register
    const {
        mutate: registerHandler
    } = useAuthRegister();
    // Guest Register
    const {
        mutate: guestRegisterHandler,
    } = useGuestRegister();
    // Fetch Customization
    const {
        refetch: fetchCurrentCustomization,
        data: customizationData
    } = useCurrentCustomization(current_customization_id);

    const __drawerToggler = (toggle) => {
        setDrawer(toggle);
    };
    const __toastToggler = (obj) => {
        setToaster({
            ...toaster,
            open: obj.open,
            type: obj.type,
            message: obj.message,
        });
    };
    const __moveToggler = (e, move) => {
        e.preventDefault();

        navigate(`${move}`, {
            replace: true,
        });
    };
    const __loginHandler = (formData) => {
        loginHandler(formData, {
            onSuccess: (response) => {
                setLocalStorage(CONSTANTS.CUSTOMER_TOKEN, response?.data);
                __toastToggler({
                    open: true,
                    type: "success",
                    message: "Logged In ... successfully!",
                });

                // Call current customization once logged in!
                queryClient.refetchQueries('CurrentCustomisation');
            },
            onError: (error) => {
                __toastToggler({
                    open: true,
                    type: "error",
                    message: error?.message,
                });
            },
        });
    };
    const __registerHandler = (formData) => {
        registerHandler(formData, {
            onSuccess: (response) => {
                setLocalStorage(CONSTANTS.CUSTOMER_TOKEN, response?.data);
                __toastToggler({
                    open: true,
                    type: "success",
                    message: "Registered ... successfully!",
                });

                // Call current customization once logged in!
                queryClient.refetchQueries('CurrentCustomisation');
            },
            onError: (error) => {
                __toastToggler({
                    open: true,
                    type: "error",
                    message: error?.message,
                });
            },
        });
    }
    const __guestRegisterHandler = (formData) => {
        guestRegisterHandler(formData, {
            onSuccess: (response) => {
                //setLocalStorage(CONSTANTS.CUSTOMER_TOKEN, response?.data);
                __toastToggler({
                    open: true,
                    type: "success",
                    message: "Registered ... successfully!",
                });

                // Call current customization once logged in!
                queryClient.refetchQueries('CurrentCustomisation');
            },
            onError: (error) => {
                __toastToggler({
                    open: true,
                    type: "error",
                    message: error?.message,
                });
            },
        });
    }

    useEffect(() => {
        if (current_customization_id) {
            fetchCurrentCustomization(current_customization_id);
        }
    }, [current_customization_id]);
    useEffect(() => {
        if (customizationData) {
            setProduct(customizationData?.data);
        }
    }, [customizationData]);
    useEffect(() => {
        if (slug) {
            setIndicator(makeActiveTabAlt(slug));
        }
    }, [slug]);

    const CheckoutStepsMemo = useMemo(
        () => (
            <CheckoutSteps
                slug={slug}
                product={product}
                drawer={drawer}
                toaster={toaster}
                __drawerToggler={__drawerToggler}
                __toastToggler={__toastToggler}
                __moveToggler={__moveToggler}
                __loginHandler={__loginHandler}
                __registerHandler={__registerHandler}
                __guestRegisterHandler={__guestRegisterHandler}
            />
        ),
        [slug, product]
    );

    return (
        <>
            <Helmet>
                <title>Vidiem By You - Choose Your Mixer Grinder</title>
            </Helmet>
            <section className="vi-wrapper">
                <section className="vi-preview reduce">
                    <section className="vi-preview-logo">
                        <Link to="/home">
                            <img src="/assets/main_logo.png" alt="logo" />
                        </Link>
                        {authToken ? (
                            <ProfileWidget
                                drawer={drawer}
                                actionToggler={__drawerToggler}
                            />
                        ) : null}
                    </section>
                    <SummaryPreview product={product} />
                </section>
                <section className="vi-player expand">
                    <div className="vi-player-tabs">
                        <div className={indicator && indicator?.tabOne}>
                            <span>Shipping & Billing Information</span>
                        </div>
                        <div className={indicator && indicator?.tabTwo}>
                            <span>Payment</span>
                        </div>
                        <div className={indicator && indicator?.tabThree}>
                            <span>Order Confirmation</span>
                        </div>
                    </div>
                    <div className="vi-player-content">{CheckoutStepsMemo}</div>
                    {/* // memo */}
                    <div className="vi-player-footer">
                        {slug === "order-confirmation" ? null : (
                            <div className="vi-summary">
                                <div>
                                    <h4>Your Cart Summary</h4>
                                    <h5>
                                        {product?.jar ? product?.jar.length : 0}{" "}
                                        Items Selected
                                    </h5>
                                </div>
                                <div>
                                    <ViewDetails product={product} />
                                    <h2>
                                        <strong>₹</strong> {product?.total_amount_before_discount ? product?.total_amount_before_discount : "0.00"}{" "}
                                        <span className="tax">+ taxes</span>
                                    </h2>
                                </div>
                            </div>
                        )}
                    </div>
                    {authToken ? (
                        <ProfileWidget
                            drawer={drawer}
                            actionToggler={__drawerToggler}
                        />
                    ) : null}
                </section>
            </section>
            {authToken && slug !== "order-confirmation" ? (
                <BuildWidget handler={__toastToggler} />
            ) : null}
            <ToasterWidget data={toaster} handler={__toastToggler} />
        </>
    );
}

export default Checkout;
