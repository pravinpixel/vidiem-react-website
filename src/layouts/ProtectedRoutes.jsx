import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "helpers/HelperFunctions";
import { CONSTANTS } from 'helpers/AppConstants'

export default function ProtectedRoutes() {
    const authToken = getLocalStorage(CONSTANTS.CUSTOMER_TOKEN)
    let auth = { token: authToken };
    return auth.token ? <Outlet /> : <Navigate to="/" />;
}
