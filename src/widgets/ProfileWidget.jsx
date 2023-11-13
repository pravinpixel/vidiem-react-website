import { Link } from "react-router-dom";
import { unsetLocalStorage } from 'helpers/HelperFunctions';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import StyleTwoToneIcon from '@mui/icons-material/StyleTwoTone';
import InputTwoToneIcon from '@mui/icons-material/InputTwoTone';

function ProfileWidget(props) {
    const navigate = useNavigate();
    const { open, drawer, actionToggler } = props

    const logoutHandler = (e) => {
        e.preventDefault();
        actionToggler(false)

        unsetLocalStorage()
        navigate(`/home`);
    }
    const redirectHandler = (e, page) => {
        e.preventDefault()
        actionToggler(false)
        navigate(page);
    }
    return (
        <>
            <div className="profile-burger" onClick={() => actionToggler(true)}>
                <MenuIcon sx={{ fontSize: 30, color: "#ffffff" }} />
            </div>
            <Drawer
                anchor={"right"}
                open={drawer}
                classes=""
                onClose={() => actionToggler(false)}>
                <ul className='profile-menu'>
                    <div className="txt-center">
                        <Link to="/home">
                            <img
                                style={{
                                    height: "60px",
                                    marginBottom: "15px"
                                }}
                                src="/assets/main_logo.png" alt="logo" />
                        </Link>
                    </div>
                    <li>
                        <Link onClick={(e) => redirectHandler(e, "/my-profile")}>
                            <AccountCircleTwoToneIcon style={{ color: '#000000' }} /> <span>My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={(e) => redirectHandler(e, "/my-orders")}>
                            <ShoppingCartTwoToneIcon style={{ color: '#000000' }} /> <span>My Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={(e) => redirectHandler(e, "/my-customizations")}>
                            <StyleTwoToneIcon style={{ color: '#000000' }} /> <span>My Customization</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={(e) => logoutHandler(e)}>
                            <InputTwoToneIcon style={{ color: '#000000' }} /> <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </Drawer>
        </>
    );
}

export default ProfileWidget;
