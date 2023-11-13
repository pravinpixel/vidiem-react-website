import React, { Fragment, useState } from 'react';
import Popover from '@mui/material/Popover';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function PopoverWidget(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Fragment>
            <InfoOutlinedIcon
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                //onClick={handleClick}
                sx={{
                    fontSize: "18px",
                    color: "#E31E24"
                }}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                className="v-popover"
                disableRestoreFocus>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque consectetur excepturi blanditiis eveniet</p>
            </Popover>
        </Fragment>
    );
}

export default PopoverWidget;
