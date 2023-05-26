import firebase from './Firebase';
import { showNotification } from '../helper/Utils';
import { NOTIFICATION_TYPE } from './Constant';
import { getUserDetails, isUserLoggedIn, setUserDetails } from '../helper/AuthActions';
import { FCM_TOKEN_INITIATE } from '../store/profile/Action';

export const askForPermissioToReceiveNotifications = (dispatch) => {
    if (isUserLoggedIn()) {
        try {
            // Get Instance ID token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            const messaging = firebase.messaging();
            let userDetails = getUserDetails();
            const oldToken = userDetails.fcm_token;
            messaging
                .getToken()
                .then((currentToken) => {
                    if (currentToken) {
                        oldToken !== currentToken &&
                            setTimeout(() => {
                                userDetails.fcm_token = currentToken;
                                setUserDetails(userDetails);
                                dispatch({ type: FCM_TOKEN_INITIATE, token: currentToken });
                                // updateFCMTokenService(currentToken)
                            }, 3000);
                    }
                })
                .catch((err) => {
                    //showToken('Error retrieving Instance ID token. ', err);
                    // alert('Error retrieving Instance ID token.');
                });

            // Callback fired if Instance ID token is updated.
            messaging.onTokenRefresh(() => {
                messaging
                    .getToken()
                    .then((refreshedToken) => {
                        // Indicate that the new Instance ID token has not yet been sent to the
                        // app server.
                        if (oldToken !== refreshedToken) {
                            userDetails.fcm_token = refreshedToken;
                            setUserDetails(userDetails);
                            dispatch({ type: FCM_TOKEN_INITIATE, token: refreshedToken });
                            // updateFCMTokenService(refreshedToken)
                        }
                    })
                    .catch((err) => {});
            });

            // Handle incoming messages. Called when:
            // - a message is received while the app has focus
            // - the user clicks on an app notification created by a service worker
            //   `messaging.setBackgroundMessageHandler` handler.
            messaging.onMessage((payload) => {
                showNotification(
                    NOTIFICATION_TYPE.SUCCESS,
                    payload.notification.title,
                    payload.notification.body
                );
            });
        } catch (error) {}
    }
};
