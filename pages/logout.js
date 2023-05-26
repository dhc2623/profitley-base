import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import  withAppContext  from '../config/withAppContext';
import { UserContext } from '../contexts/userContext';
import { logout } from '../helper/AuthActions';


export function Logout(props) {
    useEffect(()=>{
        // storeUser(null);
        logout();
    })
    return <div />;
}

export default withAppContext(Logout);