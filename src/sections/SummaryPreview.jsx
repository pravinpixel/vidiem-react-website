import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import BlenderIcon from '@mui/icons-material/Blender';
import PaletteIcon from '@mui/icons-material/Palette';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Tooltip from '@mui/material/Tooltip';
import PerfectScrollbar from 'react-perfect-scrollbar'

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function SummaryPreview(props) {
    const navigate = useNavigate();
    const {
        product
    } = props
    const __redirectHandler = (step) => {
        navigate(`${step}`, {
            replace: true,
        });
    }

    return (
        <Fragment>
            <section className='vi-preview-content remove-h'>
                {product ? (<>
                    <section className='vi-summary-body'>
                        <div className="vi-final-summary">
                            <h4>Order Summary</h4>
                            <div className="product">
                                <div>
                                    <img src={product?.customised_image} alt="product" />
                                </div>
                                <div className="desc">
                                    <p>Body Style</p>
                                    <h5>{product?.body?.basetitle} <span><strong>₹</strong> {product?.total_amount_before_discount || ""}</span></h5>
                                </div>
                            </div>
                            <PerfectScrollbar
                                options={scrollbarOptions}
                                className="product-items ps-show-always scroller">
                                <ul>
                                    <li>
                                        <h5>Motor <Tooltip title="Change Motor" onClick={() => __redirectHandler("/customize/color-and-motor")}>
                                            <IconButton>
                                                <SwapHorizIcon />
                                            </IconButton>
                                        </Tooltip></h5>
                                        <h3>
                                            <span>{product?.motor.motorname}</span>
                                            <span><strong>₹</strong> {product?.motor.price}</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h5>Color <Tooltip title="Change Color" onClick={() => __redirectHandler("/customize/color-and-motor")}>
                                            <IconButton>
                                                <PaletteIcon />
                                            </IconButton>
                                        </Tooltip></h5>
                                        <h3>
                                            <span>{product?.color.title}</span>
                                            <span><strong>₹</strong> {product?.color.price}</span>
                                        </h3>
                                    </li>
                                    {product?.personalise_text ? (
                                        product?.personalise_text !== '' ? (
                                            <li>
                                                <h5>Personalize Your Appliance <Tooltip title="Change Personalize Message" onClick={() => __redirectHandler("/customize/personalize-message")}>
                                                    <IconButton>
                                                        <SwapHorizIcon />
                                                    </IconButton>
                                                </Tooltip></h5>
                                                <h3>
                                                    <span>{product?.personalise_text}</span>
                                                    <span><strong>₹</strong> {product?.personalise_amount}</span>
                                                </h3>
                                            </li>
                                        ) : null
                                    ) : (
                                        <li>
                                            <h5>No Personalization <Tooltip title="Add Personalize Message" onClick={() => __redirectHandler("/customize/personalize-message")}>
                                                <IconButton>
                                                    <AddCommentIcon />
                                                </IconButton>
                                            </Tooltip></h5>
                                        </li>
                                    )}
                                    {product?.jar && product?.jar?.length ? (
                                        product?.jar.map((j, index) => (
                                            <li key={index}>
                                                <h5>Jar(s)
                                                    <Tooltip title="Change Jar" onClick={() => __redirectHandler("/customize/jar-styles")}>
                                                        <IconButton>
                                                            <BlenderIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <span>{j.qty} Items</span></h5>
                                                <h3>
                                                    <span>{j.name}</span>
                                                    <span><strong>₹</strong> {j.price}</span>
                                                </h3>
                                            </li>
                                        ))
                                    ) : null}
                                    {/*{product?.packing ? (*/}
                                    {/*    product?.packing?.price !== '' ? (*/}
                                    {/*        <li>*/}
                                    {/*            <h3>Packing <span><strong>₹</strong> {product?.packing?.price}</span></h3>*/}
                                    {/*        </li>*/}
                                    {/*    ) : null*/}
                                    {/*) : (*/}
                                    {/*    <li>*/}
                                    {/*        <h5>No Packings Charges</h5>*/}
                                    {/*    </li>*/}
                                    {/*)}*/}
                                </ul>
                            </PerfectScrollbar>
                        </div>
                    </section>
                </>) : null}
            </section>
        </Fragment>
    );
}

export default SummaryPreview;
