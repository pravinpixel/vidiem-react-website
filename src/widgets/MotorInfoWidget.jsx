import React, { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function MotorInfoWidget(props) {
    const {
        open,
        handler,
        preview
    } = props

    return (
        <Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}
                onClose={() => handler(false, null)}
                className="preview-popup">
                <DialogContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                        spacing={0}>
                        <Grid item xs={12} className='txt-center'>
                            <img style={{
                                maxWidth: "100%",
                                margin: "0px auto"
                            }} src={preview?.basepath} alt="product" />
                        </Grid>
                        <Grid item xs={12}>
                            <section className='preview-table'>
                                <h1>{preview?.name}</h1>
                                <div dangerouslySetInnerHTML={{ __html: preview?.description }}></div>
                                {/* <ul>
                                    <li>
                                        <span>Type</span>
                                        <span>Master Jar</span>
                                    </li>
                                    <li>
                                        <span>Jar Capacity</span>
                                        <span>1.75 Litre</span>
                                    </li>
                                    <li>
                                        <span>Dome</span>
                                        <span>See Through Polycarbonate</span>
                                    </li>
                                    <li>
                                        <span>Handle</span>
                                        <span>Sturdy Handle</span>
                                    </li>
                                </ul>
                                <h4>Dry Grinding Capacity</h4>
                                <ul>
                                    <li>
                                        <span>Minimum Level</span>
                                        <span>0.3 Litre</span>
                                    </li>
                                    <li>
                                        <span>Maximum Level</span>
                                        <span>0.6 Litre</span>
                                    </li>
                                </ul>
                                <h4>Wet Grinding Capacity</h4>
                                <ul>
                                    <li>
                                        <span>Minimum Level</span>
                                        <span>0.2 Litre</span>
                                    </li>
                                    <li>
                                        <span>Maximum Level</span>
                                        <span>0.4 Litre</span>
                                    </li>
                                    <li>
                                        <span>Application</span>
                                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio doloribus, voluptatibus odit veniam tempora quidem possimus iure impedit quibusdam, saepe temporibus! Veniam ut totam ipsam nobis dolore tenetur sint temporibus.</span>
                                    </li>
                                </ul> */}
                            </section>
                        </Grid>
                    </Grid>
                </DialogContent>
                <span className='close-pop' onClick={() => handler(false, null)}>
                    <CloseIcon sx={{ color: "#fff" }} />
                </span>
            </Dialog>
        </Fragment>
    );
}

export default MotorInfoWidget;
