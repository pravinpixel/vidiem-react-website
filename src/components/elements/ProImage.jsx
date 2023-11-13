import * as React from 'react';
import ProgressiveImage from "react-progressive-graceful-image";
import Skeleton from '@mui/material/Skeleton';

function ProImage({ image, height, width, variant }) {
    const placeholder = (<Skeleton variant={variant} animation="wave" sx={{
        width: width,
        height: height,
        bgcolor: '#F5F5F5'
    }} />);
    return (
        <ProgressiveImage
            src={image}
            placeholder="">
            {(src, loading) => {
                return loading ? placeholder : <img src={src} alt="product" />;
            }}
        </ProgressiveImage>
    );
}

export default ProImage;
