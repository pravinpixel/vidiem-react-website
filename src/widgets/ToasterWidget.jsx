
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toaster({ data, handler }) {
    return (
        <Snackbar
            open={data?.open}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => handler({
                open: false,
                type: '',
                message: ''
            })}>
            <Alert onClose={() => handler({
                open: false,
                type: '',
                message: ''
            })}
                severity={data?.type} sx={{ width: '100%' }}>
                {data?.message}
            </Alert>
        </Snackbar>
    );
}

export default Toaster;
