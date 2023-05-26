import axios from 'axios';
import { Fragment } from 'react';
import { API_BASE_URL } from '../../config/Constant';

const CMS = (props) => {
    const { data } = props;
    return (
        <Fragment>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </Fragment>
    );
};

// This gets called on every request
export async function getServerSideProps({ query }) {
    let res = await axios.get(`${API_BASE_URL}/cms/${query.slug}`);
    return { props: { data: res.data.data } };
}

export default CMS;
