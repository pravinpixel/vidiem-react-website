import { useSaveBuild } from "store/hooks/ProductHooks";
import { getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, InstapaperIcon, TwitterIcon, WhatsappIcon } from "react-share";

function BuildWidget(props) {
    const { handler } = props
    const {
        mutate: postSaveBuild,
    } = useSaveBuild();

    const __saveBuildHandler = (e) => {
        e.preventDefault();
        let formData = {
            uuid: getLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION),
            save: 1
        }

        postSaveBuild(formData, {
            onSuccess: (response) => {
                handler({
                    open: true,
                    type: 'success',
                    message: "Your customised build has been saved!"
                })
            },
            onError: (error) => {

            },
        });
    }

    return (
        <div className="build-widget">
            <div className='widget-wrapper'>
                <div onClick={(e) => __saveBuildHandler(e)}>
                    <img src="/assets/icons/save.png" alt="save" />
                    <span>Save Build</span>
                </div>
                <div className="divider">&nbsp;</div>
                <div>
                    <img src="/assets/icons/share.png" alt="save" />
                    <span>Share Build</span>
                    <div className="share-items">
                        <ul>
                            <li><FacebookShareButton url={"www.google.com"} ><FacebookIcon size={32} round={true} /></FacebookShareButton></li>
                            <li><InstapaperShareButton><InstapaperIcon size={32} round={true} /></InstapaperShareButton></li>
                            <li><TwitterShareButton><TwitterIcon size={32} round={true} /></TwitterShareButton></li>
                            <li><WhatsappShareButton><WhatsappIcon size={32} round={true} /></WhatsappShareButton></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BuildWidget;
