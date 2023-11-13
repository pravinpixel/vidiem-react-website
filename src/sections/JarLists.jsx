import { useEffect, useState, Fragment } from "react";
import { useCustomisedJars } from 'store/hooks/WebHooks';
import { getLocalStorage, makeQueryString } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import _ from "lodash";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import ContentLoader from "widgets/ContentLoader";
import PerfectScrollbar from 'react-perfect-scrollbar'
import ProductInfoWidget from "widgets/ProductInfoWidget";

const scrollbarOptions = {
    wheelSpeed: 0.5,
    wheelPropagation: false,
}

function JarLists(props) {
    const {
        current,
        grindingType,
        updateHandler,
        __toastToggler
    } = props

    const [selectedJars, setSelectedJars] = useState(null)
    const [qs, setQs] = useState(null)
    const [jarCount, setJarCount] = useState(0)

    const {
        refetch: fetchCustomisedJars,
        data: customisedJarList,
        isLoading: customisedLoader
    } = useCustomisedJars(qs)

    const addToggler = (e, pre, qty) => {
        e.preventDefault();
        if (jarCount < CONSTANTS.JAR_LIMITS) {
            let formData = {
                uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
                type: "jar",
                id: pre.id,
                qty: qty
            }
            updateHandler(formData, "none")
        }
        else {
            __toastToggler({
                open: true,
                type: 'error',
                message: `You cannot add more than ${CONSTANTS.JAR_LIMITS} to the same purchase! Sorry`
            })
        }
    }
    const incToggler = (jar, qty) => {
        if (jarCount < CONSTANTS.JAR_LIMITS) {
            let formData = {
                uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
                type: "jar",
                id: jar.id,
                qty: Number(qty) + 1
            }
            updateHandler(formData, "none")
        }
        else {
            __toastToggler({
                open: true,
                type: 'error',
                message: `You cannot add more than ${CONSTANTS.JAR_LIMITS} to the same purchase! Sorry`
            })
        }
    }
    const decToggler = (jar, qty) => {
        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            type: "jar",
            id: jar.id,
            qty: Number(qty) - 1
        }
        updateHandler(formData, "none")
    }

    useEffect(() => {
        if (current?.motor?.motor_id && current?.shape?.type_id && current?.lid?.type_id && current?.handle?.type_id) {
            let qs = makeQueryString({
                motor_id: current?.motor?.motor_id,
                shape_id: current?.shape?.type_id,
                lid_id: current?.lid?.type_id,
                handle_id: current?.handle?.type_id,
                color_id: current?.color?.bm_color_id,
                base_id: current?.body?.base_id,
                type_id: grindingType,
            })
            setQs(qs)
        }
        if (current?.jar) {
            setSelectedJars(current?.jar)
        }

        const count = current?.jar && current?.jar.reduce((next, jars) => next + Number(jars?.qty), 0)
        setJarCount(count ? count : 0)
    }, [current, grindingType])

    useEffect(() => {
        if (qs) {
            fetchCustomisedJars(qs)
        }
    }, [qs])

    return (
        <Fragment>
            <PerfectScrollbar
                options={scrollbarOptions}
                className="vi-content">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    className="property-wrapper jars"
                    spacing={2}>
                    {customisedLoader ? (<ContentLoader size={20} color="error" />) : (
                        <>
                            <Grid item xs={12} sm={12} md={12}>
                                <h5>Showing Jars Based On Your Preference</h5>
                            </Grid>
                            {
                                customisedJarList ? (
                                    customisedJarList?.data.length ? (
                                        customisedJarList?.data.map((pre, index) => {
                                            let already_added = selectedJars && selectedJars.filter((f) => f.jar_id == pre.id);
                                            let exist = _.isEmpty(already_added);
                                            return <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                                                <div className="preference-box">
                                                    <div className={!exist ? "jar-img selected" : "jar-img"}>
                                                        <ProductInfoWidget pre={pre} />
                                                        {!exist ? (
                                                            <span className="right">
                                                                <CheckBoxSharpIcon sx={{ color: "#E31E24" }} />
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                    <h4>{pre.name}</h4>
                                                    {!exist ? (<div className="jar-txt-box">
                                                        <Button variant="outlined" onClick={() => decToggler(pre, !exist ? already_added[0].qty : 1)}>
                                                            <RemoveIcon sx={{ color: "#000" }} />
                                                        </Button>
                                                        <div className="txt-box">
                                                            {!exist ? already_added[0].qty : 1}
                                                        </div>
                                                        <Button variant="outlined" onClick={() => incToggler(pre, !exist ? already_added[0].qty : 1)}>
                                                            <AddIcon sx={{ color: "#000" }} />
                                                        </Button>
                                                    </div>) : (<div className="jar-txt-box">
                                                        <span variant="contained" onClick={(e) => addToggler(e, pre, 1)}>Add</span>
                                                    </div>)}
                                                </div>
                                            </Grid>
                                        })
                                    ) : (<Grid item md={12}>
                                        <p className="txt-center not-found">No Jars in this combinations!</p>
                                    </Grid>)
                                ) : null
                            }
                        </>
                    )}
                </Grid>
            </PerfectScrollbar>
        </Fragment>
    );
}

export default JarLists;
