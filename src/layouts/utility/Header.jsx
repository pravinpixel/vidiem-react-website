import { useState } from 'react';
import { getLocalStorage } from 'helpers/HelperFunctions';
import { CONSTANTS } from 'helpers/AppConstants'
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ProfileWidget from 'widgets/ProfileWidget';

function Header() {
    const navigate = useNavigate();
    const authToken = getLocalStorage(CONSTANTS.CUSTOMER_TOKEN)

    const [drawer, setDrawer] = useState(false)
    const __drawerToggler = (toggle) => {
        setDrawer(toggle)
    }
    const __redirectHandler = () => {
        navigate(`/customize/select-product`, {
            replace: true,
        });
    }
    return (
        <section className="v-header">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={12}>
                        <div className='v-head-main'>
                            <img src="/assets/main_logo.png" alt="product default" onClick={__redirectHandler} />
                            {authToken ? <ProfileWidget drawer={drawer} actionToggler={__drawerToggler} /> : null}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

export default Header;
