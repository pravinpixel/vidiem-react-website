import { removeLocalStorage } from "helpers/HelperFunctions";
import { CONSTANTS } from "helpers/AppConstants";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import PerfectScrollbar from "react-perfect-scrollbar";

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
};

function StepOrderConfirmation(props) {
    const __redirectHandler = (e) => {
        removeLocalStorage(CONSTANTS.V_ORDER);
        removeLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION);
        removeLocalStorage(CONSTANTS.CURRENT_PRODUCT);
        removeLocalStorage(CONSTANTS.CUSTOMER_TOKEN);
        __moveToggler(e, "/customize/select-product")
    }

    const { __moveToggler } = props;
    return (
        <div className="vi-body-wrapper">
            <div className="vi-body-title">{""}</div>
            <div className="vi-body-content alt">
                <PerfectScrollbar options={scrollbarOptions}>
                    <div className="vi-confirm">
                        <div>
                            <img src="/assets/icons/success.png" alt="" />
                        </div>
                        <h4>
                            Thank you
                            <br />
                            Your order has been received.
                        </h4>
                        <p>
                            We are working on your order &<br />
                            we will deliver it shortly.
                        </p>
                        <Button
                            variant="outlined"
                            size="large"
                            className="black-btn"
                            onClick={() => {
                                window.location.replace(
                                    "https://www.vidiem.in/tracking"
                                );
                            }}
                        >
                            <img
                                src="/assets/icons/track_order.png"
                                alt="track order"
                            />{" "}
                            Track Your Order
                        </Button>
                    </div>
                </PerfectScrollbar>
            </div>
            <div className="vi-body-footer">
                <div className="buton-wrapper">
                    <Button
                        className="prev"
                        size="medium"
                        startIcon={<CachedOutlinedIcon />}
                        onClick={(e) => __redirectHandler(e)}>
                        Start Another Build
                    </Button>
                    <Divider orientation="vertical" flexItem />
                    <Button
                        className="next"
                        size="medium"
                        onClick={(e) => __moveToggler(e, "/home")}
                    >
                        Finish Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default StepOrderConfirmation;
