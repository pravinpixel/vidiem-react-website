import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { removeLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AliceCarousel from 'react-alice-carousel';
import ReactPlayer from 'react-player'

const LanguagePanel = (props) => (
    <div hidden={props.value !== props.index}>
        {props.children}
    </div>
)

function Home() {
    const matches = useMediaQuery('(max-width:1024px)');
    const navigate = useNavigate();
    const [grinderType] = useState("mg");
    const [languageTab, setLanguageTab] = useState("tamil");
    const [hasPlaying, setHasPlaying] = useState("");

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setLanguageTab(newValue);
    }
    const redirectHandler = (event) => {
        event.preventDefault();

        navigate(`/customize/select-product`, {
            replace: true,
        });
    }
    const onVideoStart = (label) => {
        setHasPlaying(label)
    }
    const GalleryAlt = () => (
        <AliceCarousel
            duration={400}
            buttonsDisabled={false}
            mouseDragEnabled={true}
            fadeOutAnimation={true}
            autoPlay={true}
            dotsDisabled={true}
            autoPlayInterval={3000}
            disableDotsControls={true}
            animationType="fadeout"
            infinite={true}>
            <div className="slider-item-alt">
                <img src="/assets/slider/one.png" className="slide-img" />
            </div>
            <div className="slider-item-alt">
                <img src="/assets/slider/two.png" className="slide-img" />
            </div>
            <div className="slider-item-alt">
                <img src="/assets/slider/three.png" className="slide-img" />
            </div>
            <div className="slider-item-alt">
                <img src="/assets/slider/four.png" className="slide-img" />
            </div>
        </AliceCarousel>
    )
    const Gallery = () => (
        <AliceCarousel
            duration={400}
            buttonsDisabled={true}
            mouseDragEnabled={true}
            fadeOutAnimation={true}
            autoPlay={true}
            autoPlayInterval={3000}
            animationType="fadeout">
            <div className="slider-item">
                <img src="/assets/slider/one.png" className="slide-img" />
                <div></div>
                <Link to="/customize/select-product" className="start-customize">Start Customizing</Link>
                <div className="content">
                    <h4><img src="/assets/icons/personalize.png" alt="personalize" /> Personalize</h4>
                    <p>Make your appliance one-of-a-kind with personalized engraving, adding a touch of uniqueness to your kitchen.</p>
                </div>
            </div>
            <div className="slider-item">
                <img src="/assets/slider/two.png" className="slide-img" />
                <div></div>
                <Link to="/customize/select-product" className="start-customize">Start Customizing</Link>
                <div className="content">
                    <h4><img src="/assets/icons/colors.png" alt="body_colors" /> Body & Colors</h4>
                    <p>Choose from a vibrant palette of colors to match your kitchen decor and style.</p>
                </div>
            </div>
            <div className="slider-item">
                <img src="/assets/slider/three.png" className="slide-img" />
                <div></div>
                <Link to="/customize/select-product" className="start-customize">Start Customizing</Link>
                <div className="content">
                    <h4><img src="/assets/icons/motors.png" alt="motors" /> Motors</h4>
                    <p>Explore our range of powerful motors that ensure efficient performance for all your blending needs.</p>
                </div>
            </div>
            <div className="slider-item">
                <img src="/assets/slider/four.png" className="slide-img" />
                <div></div>
                <Link to="/customize/select-product" className="start-customize">Start Customizing</Link>
                <div className="content">
                    <h4><img src="/assets/icons/jars.png" alt="jars" /> Jars</h4>
                    <p>Explore a range of jar options designed for a versatile and hassle-free cooking.</p>
                </div>
            </div>

        </AliceCarousel>
    )

    useEffect(() => {
        removeLocalStorage(CONSTANTS.CURRENT_PRODUCT);
        removeLocalStorage(CONSTANTS.CURRENT_CUSTOMIZATION);
        removeLocalStorage(CONSTANTS.V_ORDER);
    }, [])

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <section className="v-page v-home">
                <div className="v-section-header" data-aos="fade-up">
                    <Container maxWidth="xl" className="banner-cont">
                        <img src="assets/bg/slider_bg.png" alt="banner" />
                        <div className="main-link">
                            <Link to="/customize/select-product" className="start-customize">Start Customizing <span><img src="/assets/icons/arrow_right.png" alt="arrow" /></span></Link>
                        </div>
                    </Container>
                </div>
                <div className="v-section v-section-our-products" data-aos="fade-up">
                    <Container maxWidth="xl">
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                {matches ? (<Divider sx={{ width: '100%' }} className="v-divider">Your Appliance,<br /> Your Rules</Divider>) : (<Divider sx={{ width: '100%' }} className="v-divider">Your Appliance, Your Rules</Divider>)}
                                <p className="v-para">Your home appliances are more than just functional devices; they're an integral part of your living space, reflecting your unique style and personality. With Vidiem By You, make your appliances uniquely yours with our endless possibilities for personalizing your appliances.</p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="center-tabs">
                                    <Tabs
                                        textColor="#808080"
                                        indicatorColor="#000"
                                        value={grinderType}
                                        onChange={handleChange}
                                        centered>
                                        <Tab label="Mixer Grinders" value="mg" />
                                        <Tab label="Food Processors" value="fp" />
                                        <Tab label="Gas Stoves" value="gs" />
                                    </Tabs>
                                </Box>
                            </Grid>
                            {matches ? (
                                <Grid item xs={12}>
                                    <Gallery />
                                </Grid>
                            ) : (
                                <Grid item xs={12}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={2}>
                                        <Grid item xs={4} className="left-container" data-aos="fade-right">
                                            <Box className="v-box">
                                                <img src="/assets/icons/colors.png" alt="body_colors" />
                                                <h4>Body & Colors</h4>
                                                <p>Choose from a vibrant palette of colors to match your kitchen decor and style.</p>
                                            </Box>
                                            <Box className="v-box">
                                                <img src="/assets/icons/jars.png" alt="jars" />
                                                <h4>Jars</h4>
                                                <p>Explore a range of jar options designed for a versatile and hassle-free cooking.</p>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4} className="txt-center">
                                            <Box className="img-box">
                                                <GalleryAlt />
                                            </Box>
                                            <Link to="/customize/select-product" className="btn-red">Start Customizing</Link>
                                        </Grid>
                                        <Grid item xs={4} className="right-container" data-aos="fade-left">
                                            <Box className="v-box">
                                                <img src="/assets/icons/motors.png" alt="motors" />
                                                <h4>Motors</h4>
                                                <p>Explore our range of powerful motors that ensure efficient performance for all your blending needs.</p>
                                            </Box>
                                            <Box className="v-box">
                                                <img src="/assets/icons/personalize.png" alt="personalize" />
                                                <h4>Personalize</h4>
                                                <p>Make your appliance one-of-a-kind with personalized engraving, adding a touch of uniqueness to your kitchen.</p>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </div>
                <div className="v-section v-section-designed-by fin-grey" data-aos="fade-up">
                    <Container maxWidth="xl">
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                {matches ? <Divider color='red' sx={{ width: '100%' }} className="v-divider">Designed by You,<br /> For You</Divider> : <Divider color='red' sx={{ width: '100%' }} className="v-divider">Designed by You, For You</Divider>}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={6}>
                                    <Grid item xs={12} sm={12} md={6} data-aos="fade-left">
                                        <Box className="v-box">
                                            <p>For the 1st time in the world, the house of Maya Appliances brings you the opportunity to build your very own range of appliances to perfectly suit your everyday cooking needs. With Vidiem By You, you can make cooking the most joyous thing you do every day by making your favourite dishes in a mixer grinder designed by you!</p>
                                            <p>Pick from a wide variety of body styles, colors, and much more to customize your appliances with a personalized message too. There are over 3 Million combinations to choose from!</p>
                                            <p>At Maya Appliances we bring you kitchen solutions and innovations that make life in the kitchen easy, convenient and most of all fun!</p>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} data-aos="fade-right">
                                        <Box className="v-box">
                                            <Box>
                                                <Tabs
                                                    value={languageTab}
                                                    onChange={handleChange}
                                                    indicatorColor="rgba(227, 236, 249, 0.30)"
                                                    variant="fullWidth"
                                                    scrollButtons
                                                    allowScrollButtonsMobile
                                                    centered>
                                                    <Tab label="Tamil" value="tamil" />
                                                    <Tab label="English" value="english" />
                                                    <Tab label="Malayalam" value="malayalam" />
                                                    <Tab label="Hindi" value="hindi" />
                                                </Tabs>
                                            </Box>
                                            <LanguagePanel value={languageTab} index="tamil" className="v-full">
                                                <Box className="txt-center">
                                                    <ReactPlayer
                                                        stopOnUnmount={true}
                                                        playing={hasPlaying === "tamil" ? true : false}
                                                        controls={true}
                                                        width="100%"
                                                        url="https://youtu.be/ai2OPonHtcQ"
                                                        onPlay={() => onVideoStart("tamil")}
                                                    />
                                                </Box>
                                            </LanguagePanel>
                                            <LanguagePanel value={languageTab} index="english" className="v-full">
                                                <Box className="txt-center">
                                                    <ReactPlayer
                                                        stopOnUnmount={true}
                                                        playing={hasPlaying === "english" ? true : false}
                                                        controls={true}
                                                        width="100%"
                                                        url="https://youtu.be/eUcNTFeQvWM"
                                                        onPlay={() => onVideoStart("english")}
                                                    />
                                                </Box>
                                            </LanguagePanel>
                                            <LanguagePanel value={languageTab} index="malayalam" className="v-full">
                                                <Box className="txt-center">
                                                    <ReactPlayer
                                                        stopOnUnmount={true}
                                                        playing={hasPlaying === "malayalam" ? true : false}
                                                        controls={true}
                                                        width="100%"
                                                        url="https://youtu.be/a9AhaAlqyQk"
                                                        onPlay={() => onVideoStart("malayalam")}
                                                    />
                                                </Box>
                                            </LanguagePanel>
                                            <LanguagePanel value={languageTab} index="hindi" className="v-full">
                                                <Box className="txt-center">
                                                    <ReactPlayer
                                                        stopOnUnmount={true}
                                                        playing={hasPlaying === "hindi" ? true : false}
                                                        controls={true}
                                                        width="100%"
                                                        url="https://youtu.be/6DSbGbp03Bw"
                                                        onPlay={() => onVideoStart("hindi")}
                                                    />
                                                </Box>
                                            </LanguagePanel>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <div className="v-section v-section-start-customize" data-aos="fade-up">
                    <Container maxWidth="xl">
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                {matches ? <Divider color='red' sx={{ width: '100%' }} className="v-divider">Start Customizing<br /> Your Kitchen Needs</Divider> : <Divider color='red' sx={{ width: '100%' }} className="v-divider">Start Customizing Your Kitchen Needs</Divider>}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={1}>
                                    <Grid item xs={6} sm={6} md={4} data-aos="flip-up">
                                        <Box className="txt-center" onClick={(e) => redirectHandler(e)}>
                                            <div className="one">
                                                <img src="/assets/category/mixer.png" alt="mixer" />
                                                <div className="overlay">
                                                    <Link to="/customize/select-product" className="btn-red">Start Customizing</Link>
                                                </div>
                                            </div>
                                            <h5>Mixer Grinders</h5>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={4} data-aos="flip-up">
                                        <Box className="txt-center">
                                            <div className="one">
                                                <img src="/assets/category/mixer_alt.png" alt="food processor" />
                                                <div className="overlay">

                                                </div>
                                            </div>
                                            <h5>Food Processors</h5>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} data-aos="flip-up">
                                        <Box className="txt-center">
                                            <div className="one">
                                                <img src="/assets/category/stove.png" alt="Gas Stove" />
                                                <div className="overlay">

                                                </div>
                                            </div>
                                            <h5>Gas Stove</h5>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </section>
        </>
    );
}

export default Home;
