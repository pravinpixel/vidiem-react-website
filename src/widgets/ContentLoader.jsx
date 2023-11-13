import CircularProgress from '@mui/material/CircularProgress';

function ContentLoader(props) {
    const { size, color } = props
    return (
        <div className="body-loader">
            <CircularProgress size={size} color={color} />
        </div>
    );
}

export default ContentLoader;
