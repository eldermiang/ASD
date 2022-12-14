import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

import { useDispatch } from "react-redux";
import { ProfileDetails} from '../pages/ProfileDetails'
import { clearItems } from "../redux/cart";

const AccountProfile = () => {
    const { user, logout, isAuthenticated, loginWithRedirect} = useAuth0();
    //Used to dispatch clearItems method which removes all items from the cart
    const dispatch = useDispatch();

    function logoutUser() {
        logout();
        dispatch(clearItems());
        localStorage.clear();
    }

    if (!isAuthenticated) {
        return (
            <a className="account-icon" href="/" onClick={() => loginWithRedirect()} alt="Sign in or Sign up">
                <IconContext.Provider value={{ color: "gray", size: "32px" }}>
                    <FaUserCircle />
                </IconContext.Provider>
            </a>
        )
    }
    if (isAuthenticated) {

        const navDropdownTitle = (
            <span className="">
                <IconContext.Provider value={{ color: "gray", size: "32px", className: "me-1" }}>
                    <FaUserCircle />
                </IconContext.Provider>
                {user.name}
            </span>
        );

        return (
            <NavDropdown id="account-navbar-dropdown" className="" title={navDropdownTitle}>
                <NavDropdown.Item href="/profile"> Profile</NavDropdown.Item>
                <NavDropdown.Item  href="/orderhistory"> View Order History</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item  onClick={() => {logoutUser()} }>Logout</NavDropdown.Item>
           </NavDropdown>                     
        )
    }    
}

export default AccountProfile;