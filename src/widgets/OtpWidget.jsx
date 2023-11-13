import { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import OtpRegister from "sections/OtpRegister";
import OtpCollector from "sections/OtpCollector";

function OtpSteps(props) {
    const { otpStep } = props

    switch (otpStep) {
        case "otp_register":
            return (<OtpRegister {...props} />)

        case "otp_sent":
            return (<OtpCollector {...props} />)
    }
}

function OtpWidget(props) {
    const {
        open,
        __otpModalToggler,
        __toastToggler
    } = props;

    const [formType, setFormType] = useState("otp_register");

    const __stepToggler = (s) => {
        setFormType(s)
    }

    const SelectedOtpSteps = useMemo(() => <OtpSteps
        otpStep={formType}
        __toastToggler={__toastToggler}
        __otpModalToggler={__otpModalToggler}
        __stepToggler={__stepToggler}
    />, [formType]);

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => __otpModalToggler(true)}>
                Continue with OTP
            </Button>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}
                onClose={() => __otpModalToggler(false)}>
                {SelectedOtpSteps}
            </Dialog>
        </>
    );
}

export default OtpWidget;
