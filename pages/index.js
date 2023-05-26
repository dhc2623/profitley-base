// import dynamic from 'next/dynamic';
import { USER_ROLES } from '../config/Constant';
import { serverCheckIsUserLogin } from '../helper/AuthActions';
import Home from './home';
// const Home = dynamic(() => import('./home'));

export function Index(props) {
    return <Home />;
}

export async function getServerSideProps({ req, query }) {
    const props = await serverCheckIsUserLogin(req, query);
    if (props.props) {
        const { userDetail } = props.props;
        if (userDetail.role.name === USER_ROLES.BUYER.name) {
            return props;
        } else {
            const roleName = userDetail.role.name === USER_ROLES.OWNER.name ? USER_ROLES.SELLER.name : userDetail.role.name;
            return {
                redirect: {
                    permanent: false,
                    destination: `/dashboard/${roleName}`
                }
            };
        }
    }
    return props;
}

export default Index;
