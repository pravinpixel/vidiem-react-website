import React, { useEffect, useState } from 'react';
import { useMyCustomizations } from "store/hooks/WebHooks";
import { useCurrentCustomization } from "store/hooks/ProductHooks";
import { setLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SideBar from 'layouts/utility/SideBar';
import JarListWidget from 'widgets/JarListWidget';
import _ from 'lodash';

function MyCustomizations() {
    const navigate = useNavigate();
    const [myCustomizations, setMyCustomizations] = useState(null)
    const [open, setOpen] = useState(false)
    const [currentJars, setCurrentJars] = useState(null)
    const [custmizationId, setCustomizationId] = useState(null)
    const [cData, setCData] = useState(null)

    const {
        refetch: fetchMyCustomizations,
        data: myCustomizationData
    } = useMyCustomizations()
    const {
        refetch: fetchCurrentCustomization,
        data: customizationData,
        isLoading: customizationLoader
    } = useCurrentCustomization(custmizationId)

    const __setJarLists = (e, jars) => {
        e.preventDefault()
        setCurrentJars(jars)
        setOpen(true)
    }

    const __resumeCustomizations = (e, customization) => {
        e.preventDefault()
        setLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION, customization?.uuid)
        setCustomizationId(customization?.uuid)
    }

    const __togglePopup = (state) => {
        setOpen(state)
    }

    const CustomizationList = ({ customization }) => {
        return (
            <article>
                <div className='lefter'>
                    <img src={customization?.image} alt="none" />
                </div>
                <div className='middler'>
                    <ul>
                        <div>
                            <span>Customization Code</span>
                            <span>{""}</span>
                        </div>
                        <li>
                            <span>Body Design</span>
                            <span>{customization?.body}</span>
                        </li>
                        <li>
                            <span>Color</span>
                            <span>{customization?.color}</span>
                        </li>
                        <li>
                            <span>Selected Jar(s)</span>
                            <span
                                onClick={(e) => __setJarLists(e, customization?.jar_info)}
                                class="popu">
                                {customization?.jar_count} Jar(s)
                            </span>
                        </li>
                        <li>
                            <span>Motor Power</span>
                            <span>{customization?.motor}</span>
                        </li>
                    </ul>
                </div>
                <div className='righter'>
                    <ul>
                        <li><span>Amount :</span> ₹ {customization?.amount}/-</li>
                        <li><span>Date :</span> {customization?.createddate}</li>
                        <li><label onClick={(e) => __resumeCustomizations(e, customization)}>Continue Customization</label></li>
                    </ul>
                </div>
                <span><i className="icofont-check-circled"></i></span>
            </article>
        )
    }
    const EmptyCustomization = ({ msg }) => {
        return (
            <p>{msg}</p>
        )
    }

    useEffect(() => {
        if (myCustomizationData?.data) {
            setMyCustomizations(myCustomizationData?.data)
        }
    }, [myCustomizationData])

    useEffect(() => {
        if (cData) {
            setLocalStorage(CONSTANTS.CURRENT_PRODUCT, cData?.motor?.motor_id)

            if (_.isEmpty(cData?.jar)) {
                navigate(`/customize/jar-styles`, {
                    replace: true,
                });
            }
            else if (_.isEmpty(cData?.motor) || _.isEmpty(cData?.color)) {
                navigate(`/customize/color-and-motor`, {
                    replace: true,
                });
            }
            else {
                navigate(`/customize/select-product`, {
                    replace: true,
                });
            }
        }
    }, [cData])

    useEffect(() => {
        if (customizationData) {
            setCData(customizationData?.data)
        }
    }, [customizationData])

    useEffect(() => {
        if (custmizationId) {
            fetchCurrentCustomization(custmizationId)
        }
    }, [custmizationId])

    useEffect(() => {
        fetchMyCustomizations()
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
                                    <h3>My Customizations</h3>
                                    <p>Conveniently manage all your personalized creations here</p>
                                    <section className='orders-list'>
                                        {
                                            (() => {
                                                if (myCustomizations?.length) {
                                                    return myCustomizations.map((custom, index) => <CustomizationList customization={custom} />)
                                                }
                                                else {
                                                    return <EmptyCustomization msg="There is no Customization Lists!" />
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

export default MyCustomizations;
