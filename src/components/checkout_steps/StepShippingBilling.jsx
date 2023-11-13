import { useState, useMemo } from "react";
import FormGuestPurchase from "sections/FormGuestPurchase";
import FormAddress from "sections/FormAddress";
import FormSignIn from "sections/FormSignIn";
import _ from "lodash";

function BilingSteps(props) {
    const { productAlt, activeTab } = props

    if (_.isEmpty(productAlt?.guest_data) && _.isEmpty(productAlt?.user_data)) {
        if (activeTab === 0) {
            return <FormGuestPurchase {...props} />
        }
        else if (activeTab === 1) {
            return <FormSignIn {...props} />
        }
    }
    else {
        if (!_.isEmpty(productAlt?.guest_data) || !_.isEmpty(productAlt?.user_data)) {
            return <FormAddress {...props} />
        }
    }
}

function StepShippingAndBilling(props) {
    const { product } = props

    const [activeTab, setActiveTab] = useState(0);

    const __tabChangeHandler = (event, newValue) => {
        event.preventDefault();
        setActiveTab(newValue);
    }

    const BilingStepsExt = useMemo(() => <BilingSteps
        {...props}
        productAlt={product}
        activeTab={activeTab}
        __tabChangeHandler={__tabChangeHandler}
    />, [product, activeTab]);

    return (
        <div className="vi-body-wrapper">
            {product !== null ? BilingStepsExt : null}
        </div>
    );
}

export default StepShippingAndBilling;
