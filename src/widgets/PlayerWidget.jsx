import ReactPlayer from 'react-player'

function PlayerWidget({ url, tab, current }) {

    console.log("tab", tab)
    console.log("current", current)
    return (
        <ReactPlayer
            stopOnUnmount={true}
            playing={tab === current ? false : false}
            controls={true}
            width="100%"
            url={url}
        />
    );
}

export default PlayerWidget;
