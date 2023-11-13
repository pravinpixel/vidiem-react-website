import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './utility/Header';
import Footer from './utility/Footer';

function MainLayout() {
    const location = useLocation();
    const matches = useMediaQuery('(max-width:1024px)');
    return (
        <section className="m-layout">
            {
                location?.pathname === "/home" ||
                    location?.pathname === "/my-profile" ||
                    location?.pathname === "/my-customizations" ||
                    location?.pathname === "/my-orders" ? <Header /> : null
            }
            <Outlet />
            {
                (() => {
                    if (location?.pathname === "/home") {
                        return <Footer />
                    }
                    else {
                        if (!matches) {
                            return <Footer />
                        }
                        else {
                            return null
                        }
                    }
                })()
            }
        </section>
    );
}

export default MainLayout;
