import React, { useEffect, useState } from 'react';
import { useMyOrders } from "store/hooks/WebHooks";
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SideBar from 'layouts/utility/SideBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import JarListWidget from 'widgets/JarListWidget';

function MyOrders() {
    const matches = useMediaQuery('(max-width:1024px)');
    const [activeTab, setActiveTab] = useState(0);
    const [currentOrders, setCurrentOrders] = useState(null)
    const [cancelledOrders, setCancelledOrders] = useState(null)
    const [deliveredOrders, setDeliveredOrders] = useState(null)
    const [open, setOpen] = useState(false)
    const [currentJars, setCurrentJars] = useState(null)

    const {
        refetch: fetchMyOrders,
        data: myOrderData
    } = useMyOrders()

    const __setJarLists = (e, jars) => {
        e.preventDefault()
        setCurrentJars(jars)
        setOpen(true)
    }

    const __togglePopup = (state) => {
        setOpen(state)
    }

    const tabChangeHandler = (event, newValue) => {
        event.preventDefault();
        setActiveTab(newValue);
    }

    const OrderList = ({ order }) => {
        return (
            <article>
                <div className='lefter'>
                    <img src={order?.basic_info.basecolorpath} alt="product" />
                </div>
                <div className='middler'>
                    <ul>
                        <div>
                            <span>Customization Code</span>
                            <span>{order?.basic_info.cart_code || ""}</span>
                        </div>
                        <li>
                            <span>Body Design</span>
                            <span>{order?.basic_info.basetitle}</span>
                        </li>
                        <li>
                            <span>Color</span>
                            <span>{order?.basic_info.bc_title}</span>
                        </li>
                        <li>
                            <span>Selected Jar(s)</span>
                            <span
                                onClick={(e) => __setJarLists(e, order?.jar_info)}
                                class="popu">
                                {order?.basic_info.jars} Jar(s)
                            </span>
                        </li>
                        <li>
                            <span>Motor Power</span>
                            <span>{order?.basic_info.motorname}</span>
                        </li>
                    </ul>
                </div>
                <div className='righter'>
                    <ul>
                        <li><span>Amount :</span> ₹ {order?.basic_info.total_amount}/-</li>
                        <li><span>Order Date :</span> {order?.basic_info.order_date}</li>
                        <li><span>Order Status :</span> <label className={order?.basic_info?.status_slug}>{order?.basic_info?.order_status}</label></li>
                    </ul>
                </div>
                <span><i className="icofont-check-circled"></i></span>
            </article>
        )
    }
    const EmptyOrder = ({ msg }) => {
        return (
            <p>{msg}</p>
        )
    }

    useEffect(() => {
        if (myOrderData?.data) {
            setCurrentOrders(myOrderData?.data?.current_order)
            setCancelledOrders(myOrderData?.data?.cancelled_order)
            setDeliveredOrders(myOrderData?.data?.delivered_order)
        }
    }, [myOrderData])

    useEffect(() => {
        fetchMyOrders()
    }, [])

    return (
        <div className="dashbord my_accounts">
            <section className="dasboard-body">
                <Container maxWidth="xl">
                    <div className='dashboard-content'>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch">
                            <SideBar />
                            <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
                                <div className='table-wrapper'>
                                    <h3>My Orders</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsum tempore</p>
                                    <Tabs
                                        value={activeTab}
                                        onChange={tabChangeHandler}>
                                        <Tab label={matches ? "Customize" : "Your Customize Orders"} />
                                        <Tab label={matches ? "Cancelled" : "Cancelled Orders"} />
                                        <Tab label={matches ? "Past" : "Past Orders"} />
                                    </Tabs>
                                    <section className='orders-list'>
                                        {
                                            (() => {
                                                if (activeTab === 0) {
                                                    if (currentOrders?.length) {
                                                        return currentOrders.map((current, index) => <OrderList order={current} />)
                                                    }
                                                    else {
                                                        return <EmptyOrder msg="There is no Current Orders!" />
                                                    }
                                                }
                                                else if (activeTab === 1) {
                                                    if (cancelledOrders?.length) {
                                                        return cancelledOrders.map((current, index) => <OrderList order={current} />)
                                                    }
                                                    else {
                                                        return <EmptyOrder msg="There is no Cancelled Orders!" />
                                                    }
                                                }
                                                else if (activeTab === 2) {
                                                    if (deliveredOrders?.length) {
                                                        return deliveredOrders.map((current, index) => <OrderList order={current} />)
                                                    }
                                                    else {
                                                        return <EmptyOrder msg="There is no Delivered Orders!" />
                                                    }
                                                }
                                            })()
                                        }
                                    </section>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </section>
            <JarListWidget info={currentJars} handler={__togglePopup} open={open} />
        </div>
    );
}

export default MyOrders;
