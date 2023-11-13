import React, { Fragment, useEffect, useState } from 'react';
import { useJarDetails } from 'store/hooks/WebHooks';
import ProgressiveImage from "react-progressive-graceful-image";
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

function ProductInfoWidget(props) {
    const { pre } = props

    const [current, setCurrent] = useState(null)
    const [open, setOpen] = useState(false)
    const [infoData, setInfoData] = useState(null)

    const {
        refetch: fetchJarDetails,
        data: jarInfo,
    } = useJarDetails(current)

    const popupToggler = (id, stat) => {
        if (id !== "none") {
            setOpen(stat)
            setCurrent(id)
        }
        else {
            setOpen(stat)
        }
    }

    useEffect(() => {
        if (current !== null) {
            fetchJarDetails(current)
        }
    }, [current])

    useEffect(() => {
        if (jarInfo?.data) {
            setInfoData(jarInfo?.data?.[0])
        }
    }, [jarInfo])

    const placeholder = (<Skeleton variant="rectangular" animation="wave" sx={{
        width: "100%",
        height: "100%",
        bgcolor: '#F5F5F5'
    }} />);

    return (
        <Fragment>
            <ProgressiveImage
                src={pre.image}
                placeholder="">
                {(src, loading) => {
                    return loading ? placeholder : <img src={src} alt={pre.name} onClick={() => popupToggler(pre.id, true)} />;
                }}
            </ProgressiveImage>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={open}
                onClose={() => popupToggler("none", false)}
                className="preview-popup">
                <DialogContent>
                    <Grid container direction="row" justifyContent="start" alignItems="center" spacing={0}>
                        <Grid item xs={6} className='txt-center'>
                            <img style={{ maxWidth: "100%", margin: "0px auto" }} src={infoData?.image} alt="Loading ..." />
                        </Grid>
                        <Grid item xs={6}>
                            <section className='preview-table'>
                                <h1>{infoData?.name}</h1>
                                <div dangerouslySetInnerHTML={{ __html: infoData?.description }}></div>
                            </section>
                        </Grid>
                    </Grid>
                </DialogContent>
                <span className='close-pop' onClick={() => popupToggler("none", false)}>
                    <CloseIcon sx={{ color: "#fff" }} />
                </span>
            </Dialog>
        </Fragment>
    );
}

export default ProductInfoWidget;
