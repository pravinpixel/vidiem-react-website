import React, { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import PerfectScrollbar from 'react-perfect-scrollbar'
import useMediaQuery from '@mui/material/useMediaQuery';

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function ViewDetails(props) {
    const { product } = props
    const [open, setOpen] = useState(false);
    const matches = useMediaQuery('(max-width:768px)');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            {matches ? <span onClick={handleClickOpen}>View Details</span> : null}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                className="detail-modals">
                <section className='vi-summary-body'>
                    <div className="vi-final-summary">
                        <h4>Order Summary</h4>
                        <div className="product">
                            <div>
                                <img src={product?.customised_image} alt="product" />
                            </div>
                            <div className="desc">
                                <p>Body Style & Color</p>
                                <h5>{product?.body?.basetitle}</h5>
                                <h5>{product?.color?.title} <span><strong>₹</strong> {product?.total_amount_before_discount || ""}</span></h5>
                            </div>
                        </div>
                        <PerfectScrollbar
                            options={scrollbarOptions}
                            className="product-items ps-show-always scroller">
                            <ul>
                                <li>
                                    <h5>Motor</h5>
                                    <h3>
                                        <span>{product?.motor?.motorname}</span>
                                        <span><strong>₹</strong> {product?.motor?.price}</span>
                                    </h3>
                                </li>
                                {product?.personalise_text ? (
                                    product?.personalise_text !== '' ? (
                                        <li>
                                            <h5>Personalize Your Appliance</h5>
                                            <h3>
                                                <span>{product?.personalise_text}</span>
                                                <span><strong>₹</strong> {product?.personalise_amount}</span>
                                            </h3>
                                        </li>
                                    ) : null
                                ) : (
                                    <li>
                                        <h5>No Personalization</h5>
                                    </li>
                                )}
                                {product?.jar && product?.jar?.length ? (
                                    product?.jar.map((j, index) => (
                                        <li key={index}>
                                            <h5>Jars <span>{j.qty} items</span></h5>
                                            <h3>
                                                <span>{j.name}</span>
                                                <span><strong>₹</strong> {j.price}</span>
                                            </h3>
                                        </li>
                                    ))
                                ) : null}
                            </ul>
                        </PerfectScrollbar>
                    </div>
                    <span className='closeer' onClick={handleClose}>
                        <i className="icofont-close"></i>
                    </span>
                </section>
            </Dialog>
        </Fragment>
    );
}

export default ViewDetails;
