import { Fragment } from "react";
import { Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import _ from "lodash";

function JarListWidget(props) {
    const { open, info, handler } = props

    const SingleJar = ({ jar, index }) => {
        return (
            <div className="jar-list">
                <div className="order">{index}</div>
                <div>
                    <img src={jar?.image} alt="jar" />
                </div>
                <div>
                    <h4>{jar?.name}</h4>
                    <Divider />
                    <p>
                        <label><span>Qty </span>{jar?.qty}</label>
                        <label><span>Price </span><strong>₹</strong>{jar?.price}</label>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <Dialog
                maxWidth={"sm"}
                fullWidth={false}
                open={open}
                onClose={() => handler(false)}
                className="jarlist-modal">
                <DialogContent sx={{ position: "relative" }}>
                    <span className="close" onClick={() => handler(false)}>
                        <i className="icofont-close"></i>
                    </span>
                    {_.isEmpty(info) ? (<p>There is no jars selected!</p>) : (<>
                        {info.map((jar, index) => <SingleJar jar={jar} index={index + 1} />)}
                    </>)}
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default JarListWidget;
