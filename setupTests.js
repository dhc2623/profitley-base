// import Enzyme from 'enzyme';
// import EnzymeAdapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';

// Enzyme.configure({
//     adapter: new EnzymeAdapter(),
//     disableLifecycleMethods: true
// });

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {}
        };
    };

process.env = {
    ...process.env,
    __NEXT_IMAGE_OPTS: {
        deviceSizes: [320, 420, 768, 1024, 1200],
        imageSizes: [],
        domains: [process.env.BACKEND_URL],
        path: '/_next/image',
        loader: 'default'
    }
};
