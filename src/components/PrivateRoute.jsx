import {Outlet, Navigate} from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";
export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus();
    if(checkingStatus){ //checkingStatus is to wait until auth checking is done, because rendering page is faster than auth checking 
        return <h3>Loading...</h3>
    }
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
