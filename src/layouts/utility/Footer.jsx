import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Icofont from 'react-icofont';
import { Link } from "react-router-dom"

function Footer() {

    return (
        <section className="v-footer">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={12} sm={3} md={3} className='footer-first-content'>
                        <h4>Contact Us</h4>
                        <ul className='contact'>
                            <li>
                                <span><Icofont icon="location-pin" /></span>
                                <p>
                                    <label>No 3/140, Old Mahabalipuram Road,</label>
                                    <label>Oggiyam, Thoraipaakam, Chennai - 600 097.</label>
                                </p>
                            </li>
                            <li>
                                <span><Icofont icon="email" /></span>
                                <p>care@vidiem.in</p>
                            </li>
                            <li>
                                <span><Icofont icon="phone" /></span>
                                <p>
                                    <label>Tel: 044-6635 6635</label>
                                    <label>Mobile: +77110 06635 </label>
                                </p>
                            </li>
                        </ul>
                        <ul className='social'>
                            <li>
                                <Link to="https://www.facebook.com/VidiemTM/" target="_blank">
                                    <Icofont icon="facebook" />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.instagram.com/vidiemtm/" target="_blank">
                                    <Icofont icon="instagram" />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://twitter.com/vidiemmaya" target="_blank">
                                    <Icofont icon="twitter" />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://www.youtube.com/channel/UCLJE5AoP7y7ccfFrMFyAv8g" target="_blank">
                                    <Icofont icon="youtube" />
                                </Link>
                            </li>
                        </ul>
                        <p></p>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <div className='footer-content'>
                            <div>
                                <h4>Quick Links</h4>
                                <ul>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/about-us">About Vidiem</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/">Read Our Blog</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/service-centers">Service Centers</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/">Media</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/">Careers</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/contact-us">Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>Products</h4>
                                <ul>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/">Food Processors</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/mixer-grinder">Mixer Grinder</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/gas-stove">Gas Stoves</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/electric-kettle">Electric Kettles</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/table-top-grinders">Table Top Grinders</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>Support</h4>
                                <ul>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/product-registration">Product Registration</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/complaint-registration">Complaint Registration</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/user-manual">User Manual</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/videos">Demo Videos</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/dealer-locator">Dealer Locator</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/warranty">Warranty T&C</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>Policy & Terms</h4>
                                <ul>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/privacy-policy">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/disclaimer">Disclaimer</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/terms-conditions">Terms Of Use</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>Purchase & Usage</h4>
                                <ul>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/return-refund-policy">Return & Refund Policy</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/shipping-delivery">Shipping & Delivery</Link>
                                    </li>
                                    <li>
                                        <Link target="_blank" to="https://www.vidiem.in/tracking">Order Tracking</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <img src="/assets/footer_logo.png" />
                    </Grid>
                    <Grid item xs={6} className='text-right'>
                        <div className='accept'>We Accept</div>
                        <ul className='payments'>
                            <li><img src="/assets/visa.png" /></li>
                            <li><img src="/assets/visa_master.png" /></li>
                            <li><img src="/assets/visa_maestro.png" /></li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
            <div className='footer-bottom'>
                <p>2023 Vidiem, All Rights Reserved, With Love by Pixel Studios</p>
            </div>
        </section>
    );
}

export default Footer;
