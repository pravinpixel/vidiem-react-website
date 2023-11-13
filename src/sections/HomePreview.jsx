import { Fragment } from "react";
function HomePreview() {

    return (
        <Fragment>
            <section className='vi-preview-content'>
                <div className="img-previewer"
                    style={{
                        backgroundImage: `url("/assets/home_banner.png")`,
                    }}>
                </div>
            </section>
            <section className='vi-preview-footer'>
                <div className='vi-productuu-alt'>
                    <h4>Looks like you haven't<br />chosen anything</h4>
                    <p>Start Customizing your <br />Vidiem Product Now</p>
                </div>
            </section>
        </Fragment>
    );
}

export default HomePreview;
