import { useEffect, useState } from 'react';
import { useJarDetails } from 'store/hooks/WebHooks';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

function ProductInfoWidget(props) {
    const {
        open,
        handler
    } = props

    const [infoData, setInfoData] = useState(null)

    const {
        refetch: fetchJarDetails,
        data: jarInfo,
    } = useJarDetails(open)

    useEffect(() => {
        if (open !== null) {
            fetchJarDetails(open)
        }
    }, [open])

    useEffect(() => {
        if (jarInfo?.data) {
            setInfoData(jarInfo?.data?.[0])
        }
    }, [jarInfo])

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"xl"}
            open={open !== null ? true : false}
            onClose={() => handler(null)}
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
            <span className='close-pop' onClick={() => handler(null)}>
                <CloseIcon sx={{ color: "#fff" }} />
            </span>
        </Dialog>
    );
}

export default ProductInfoWidget;
