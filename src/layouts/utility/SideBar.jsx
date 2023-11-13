import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <Grid item xs={2} sm={4} md={4} lg={4} xl={4} className='vi-sidebar'>
            <ul>
                <div>
                    <h1>Dashboard</h1>
                </div>
                <li>
                    <Link to="/my-profile"><i className="icofont-user"></i> <span>My Profile</span></Link>
                </li>
                <li>
                    <Link to="/my-orders"><i className="icofont-gift"></i> <span>My Orders</span></Link>
                </li>
                <li>
                    <Link to="/my-customizations"><i className="icofont-paint"></i> <span>My Customizations</span></Link>
                </li>
            </ul>
        </Grid>
    );
}

export default SideBar;
