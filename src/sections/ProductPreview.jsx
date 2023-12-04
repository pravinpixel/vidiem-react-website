import { Fragment, useState, useEffect } from "react";
import { usePreviewCoordinates } from 'store/hooks/WebHooks';
import { getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import Divider from '@mui/material/Divider';
import PerfectScrollbar from 'react-perfect-scrollbar'
import CloseIcon from '@mui/icons-material/Close';
import ProImage from "components/elements/ProImage";

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function ProductPreview(props) {
    const {
        custom,
        custmizeTxt,
        __updateHandler,
    } = props

    const [coordinates, setCoordinates] = useState(null);

    const {
        refetch: fetchPreviewCoordinates,
        data: previewCoordinates,
    } = usePreviewCoordinates(custom?.body?.base_id)

    const __deleteHandler = (jarId) => {
        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            type: "jar",
            id: jarId,
            qty: 0
        }
        __updateHandler(formData, "none")
    }

    useEffect(() => {
        if (custom?.body) {
            fetchPreviewCoordinates(custom?.body?.base_id)
        }
    }, [custom])

    useEffect(() => {
        if (previewCoordinates?.data) {
            setCoordinates(previewCoordinates?.data?.[0])
        }
    }, [previewCoordinates])

    return (
        <Fragment>
            <section className='vi-preview-content'>
                <div className="img-previewer"
                    style={{
                        backgroundImage: `url(${custom?.customised_image})`,
                    }}>
                    {custmizeTxt !== '' ? (<div
                        className="cutomize-magnifier"
                        style={{
                            top: `${coordinates && coordinates?.desktoptop}%`,
                            left: `${coordinates && coordinates?.desktopleft}%`,
                        }}>
                        <span>{custmizeTxt}</span>
                    </div>) : null}
                </div>
            </section>
            <section className='vi-preview-footer'>
                <div className='vi-promotu'>
                    <div className="box left">
                        <div className='raw-product'>
                            <div>
                                <ProImage image={custom?.customised_image} height="96px" width="100%" variant="rectangular" />
                            </div>
                            <p>Body & Motor</p>
                            <h5>{custom?.body.basetitle}</h5>
                            <h5>{custom?.body.basesubtitle}</h5>
                            {String(custom?.total_amount) === "0.00" ? null : <h3><strong>₹</strong> {custom?.total_amount}</h3>}
                        </div>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className="box right">
                        {custom && custom?.motor ? (
                            <PerfectScrollbar
                                options={scrollbarOptions}
                                className="purchase-item-wrapper ps-show-always">
                                <div className="puchase-items">
                                    {custom && custom?.motor ? (
                                        <div>
                                            <div className="img-wrapper">
                                                <ProImage image={custom?.motor?.basepath} height="96px" width="100%" variant="rectangular" />
                                            </div>
                                            <span>Motor</span>
                                            <p>{custom?.motor.motorname}</p>
                                            <h4><strong>₹</strong> {custom?.motor?.price}</h4>
                                        </div>
                                    ) : null}
                                    {custom && custom?.jar ? (
                                        custom?.jar.map((j, index) => (
                                            <div key={index}>
                                                <div className="img-wrapper">
                                                    <ProImage image={j.image} height="96px" width="100%" variant="rectangular" />
                                                    <label className="delete" onClick={() => __deleteHandler(j.jar_id)}>
                                                        <CloseIcon sx={{ color: "#E31E24" }} />
                                                    </label>
                                                </div>
                                                <span>Jar | Qty - {j.qty}</span>
                                                {/* <p>Qty - {j.qty}</p> */}
                                                <p>{j.name}</p>
                                                <h4><strong>₹</strong> {j.price}</h4>
                                            </div>))
                                    ) : null}
                                </div>
                            </PerfectScrollbar>
                        ) : (<div className='vi-productuu'>
                            <h4>Looks like you haven't <br />chosen anything</h4>
                            <p>Start Customizing your <br />Vidiem product Now</p>
                        </div>)}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default ProductPreview;
