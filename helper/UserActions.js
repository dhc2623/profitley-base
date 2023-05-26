import React from 'react';
import { connect } from 'react-redux';
import { displyBackIconAction, setParentRoute } from '../actions/Common';
import { setShowOrderButton } from '../actions/DistributorActions';
import { setShowMapButton } from '../actions/sfa/schedule';

/**
 * @method AuthMiddleware
 * @description On the basis of authentication redirec user to the component.
 * @param {*} props
 */
const AuthMiddleware = ({
    isChild,
    displyBackIconAction,
    parentRoute,
    setParentRoute,
    isCommonPage,
    setShowOrderButton,
    setShowMapButton,
    createOrder,
    showMap,
    ...props
}) => {
    if (isChild) {
        displyBackIconAction(true);
    } else {
        displyBackIconAction(false);
    }

    if (parentRoute) {
        setParentRoute(parentRoute);
    } else {
        setParentRoute('');
    }

    if (!createOrder) {
        setShowOrderButton('');
    }

    if (!showMap) {
        setShowMapButton([]);
    }

    const authenticated = localStorage.getItem('isLoggedIn');
    if (authenticated && !props.isGuestPage) {
        return <props.ComposedComponent {...props} />;
    } else if (!authenticated && props.isGuestPage) {
        return <props.ComposedComponent {...props} />;
    } else if (authenticated && props.isGuestPage) {
        props.history.push('/home');
        return null;
    } else if (props.pageNotFound) {
        return <props.ComposedComponent {...props} />;
    } else if (isCommonPage) {
        return <props.ComposedComponent {...props} />;
    } else {
        props.history.push('/login');
        return null;
    }
};

export default connect(null, {
    displyBackIconAction,
    setParentRoute,
    setShowOrderButton,
    setShowMapButton
})(AuthMiddleware);
