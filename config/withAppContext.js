import { useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { getAuthToken } from '../helper/AuthActions';

function withAppContext(Component) {
    return function WrapperComponent(props) {
        useEffect(() => {
            const token = getAuthToken();
            if(!token){
                window.location.assign('/login');
            }
        }, []);
        return (
            <UserContext.Consumer>
                {(state) => state && <Component {...props} {...state} />}
            </UserContext.Consumer>
        );
    };
}
export default withAppContext;
