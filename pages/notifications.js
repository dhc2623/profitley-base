import React, { Fragment } from 'react';
import moment from 'moment';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import { Typography, Timeline } from 'antd';
import { langs } from '../localization';
import firebase from '../config/Firebase';
import { FIREBASE_MASTER_PATH, NOTIFICATION_TYPE } from '../config/Constant';
import { showNotification } from '../helper/Utils';
import Panel, { PanelBody } from '../components/common/panel';
import dynamic from 'next/dynamic';
const PageTitle = dynamic(() => import('../components/common/page-title'));
const DocHead = dynamic(() => import('../components/common/head'));
import { getUserDetails, serverCheckIsUserLogin } from '../helper/AuthActions';
import  withAppContext  from '../config/withAppContext';

class AppNotification extends React.Component {
    constructor(props) {
        super(props);
        const { userMe } = props;
        this.state = {
            loading: true,
            hasMore: true,
            notificationList: [],
            masterNotificationList: [],
            masterNotificationKeys: [],
            notificationKeys: [],
            referenceValue: 'value',
            limit: 15,
            count: 0,
            user_id: userMe.profile.id,
            org_id: userMe.profile.organization_id
        };
    }

    componentWillMount = () => {
        /**Retrieving total number of notifications in database */
        getUserDetails();
        const ref = firebase
            .database()
            .ref(FIREBASE_MASTER_PATH(this.state.org_id, this.state.user_id));
        ref.on(this.state.referenceValue, (snapshot) => {
            this.setState(
                {
                    totalRecord: snapshot.numChildren()
                },
                () => {
                    this.getNotificationData();
                }
            );
        });
    };

    /**
     * @param {*} getNotificationData
     * @description to fetch the list of notifications.
     * @returns {NOTIFICATION_LIST}
     */
    getNotificationData = (type) => {
        const notificationCount = firebase
            .database()
            .ref(FIREBASE_MASTER_PATH(this.state.org_id, this.state.user_id))
            .orderByChild('isRead')
            .equalTo(0);
        notificationCount.on('value', (snapshot) => {
            const notifications = snapshot.val();
            const unreadNotificationKeys = _.keys(notifications);
            let unreadNotificationsList = [];
            let count = 0;
            _.mapKeys(notifications, (key) => {
                count++;
                unreadNotificationsList.push(key);
            });
            /** Reverse the ordering of list */
            this.setState({
                count,
                unreadNotificationsList,
                unreadNotificationKeys
            });
        });

        /**condition for getting next data when user scrolls */
        if (type == 'Next') {
            if (this.state.totalRecord != this.state.masterNotificationList.length) {
                const { cursor } = this.state;
                const ref = firebase
                    .database()
                    .ref(FIREBASE_MASTER_PATH(this.state.org_id, this.state.user_id))
                    .orderByKey()
                    .endAt(cursor)
                    .limitToLast(this.state.limit);
                ref.on(this.state.referenceValue, (snapshot) => {
                    const notifications = snapshot.val();
                    const notificationKeys = _.keys(notifications);
                    const { totalRecord, masterNotificationList } = this.state;
                    this.setState({
                        cursor:
                            totalRecord != masterNotificationList.length ? notificationKeys[0] : ''
                    });
                    let notificationList = [];
                    let count = 0;
                    _.mapKeys(notifications, (key) => {
                        if (key.isRead == 0) {
                            count++;
                        }
                        notificationList.push(key);
                    });
                    if (notificationList.length == this.state.limit) {
                        notificationList.shift();
                        notificationKeys.shift();
                    }
                    this.setState({
                        masterNotificationList: [
                            ...this.state.masterNotificationList,
                            ...notificationList.reverse()
                        ],
                        masterNotificationKeys: [
                            ...this.state.masterNotificationKeys,
                            ...notificationKeys.reverse()
                        ],
                        notificationList: [...this.state.notificationList, ...notificationList],
                        notificationKeys: [...this.state.notificationKeys, ...notificationKeys],
                        count,
                        loading: false
                    });
                });
            }
        } else {
            /**condition for initial loading of data without cursor */
            const ref = firebase
                .database()
                .ref(FIREBASE_MASTER_PATH(this.state.org_id, this.state.user_id))
                .orderByKey()
                .limitToLast(this.state.limit);
            ref.on(this.state.referenceValue, (snapshot) => {
                const notifications = snapshot.val();
                const notificationKeys = _.keys(notifications);
                this.setState({
                    cursor: notificationKeys[0]
                });
                let notificationList = [];
                let count = 0;
                _.mapKeys(notifications, (key) => {
                    if (key.isRead == 0) {
                        count++;
                    }
                    notificationList.push(key);
                });
                if (notificationList.length == this.state.limit) {
                    notificationList.shift();
                    notificationKeys.shift();
                }
                this.setState(
                    {
                        masterNotificationList: notificationList.reverse(),
                        masterNotificationKeys: notificationKeys.reverse(),
                        notificationList: notificationList,
                        notificationKeys: notificationKeys,
                        count,
                        loading: false
                    },
                    () => {}
                );
            });
        }
    };

    /**
     * @param {*} readNotification
     * @description Mark notification as read and open drawer when user clicked on notification
     */
    readNotification = (index, notificationDetails) => {
        const notificationId = this.state.notificationKeys[index];
        let notification = this.state.notificationList[index];
        notification.isRead = 1;
        const FIREBASE_ENDPOINT = `${FIREBASE_MASTER_PATH(
            this.state.org_id,
            this.state.user_id
        )}/${notificationId}`;
        const ref = firebase.database().ref(FIREBASE_ENDPOINT);
        ref.set(notification);
        this.setState(
            {
                moduleId:
                    parseInt(notificationDetails.isDeleted) !== 1
                        ? notificationDetails.moduleId
                        : '',
                resourceId:
                    parseInt(notificationDetails.isDeleted) !== 1
                        ? notificationDetails.resourceId
                        : '',
                visibleViewDrawer: parseInt(notificationDetails.isDeleted) !== 1 ? true : false,
                notificationError: parseInt(notificationDetails.isDeleted) === 1 ? true : false
            },
            () => {
                if (this.state.notificationError) {
                    if (notificationDetails.moduleId == MODULES.SUBSCRIPTION_ID) {
                        showNotification(
                            NOTIFICATION_TYPE.INFO,
                            notificationDetails.title,
                            notificationDetails.body
                        );
                    } else {
                        showNotification(NOTIFICATION_TYPE.WARNING, langs.labels.deletedItem);
                    }
                }
            }
        );
    };

    /**
     * @param {*} markAllAsRead
     * @description Mark all notifications as read
     */
    markAllAsRead = () => {
        const { unreadNotificationsList, unreadNotificationKeys } = this.state;
        unreadNotificationsList.map((notification, index) => {
            const notificationId = unreadNotificationKeys[index];
            notification.isRead = 1;
            /**Set key isRead as 1 in realtime. */
            const FIREBASE_ENDPOINT = `${FIREBASE_MASTER_PATH(
                this.state.org_id,
                this.state.user_id
            )}/${notificationId}`;
            const ref = firebase.database().ref(FIREBASE_ENDPOINT);
            ref.set(notification);
        });
    };

    //render method starts
    render() {
        const { notificationList, count } = this.state;
        return (
            <Fragment>
                <DocHead pageTitle={langs.labels.notification} />
                <div className="wrap">
                    <PageTitle title={langs.labels.notification} />
                    <div
                        className={'notification-page-wrapper'}
                        ref={(ref) => (this.scrollParentRef = ref)}>
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={() => this.getNotificationData('Next')}
                            hasMore={true}
                            useWindow={false}
                            getScrollParent={() => this.scrollParentRef}>
                            <Timeline
                                pending={this.state.loading ? 'Loading...' : false}
                                className={'timeline-notification'}>
                                {notificationList.map((item, index) => (
                                    <Timeline.Item
                                        key={item.id}
                                        className={
                                            !item.isRead
                                                ? 'notification-unread'
                                                : 'notification-read'
                                        }
                                        onClick={() => {
                                            this.readNotification(index, item);
                                        }}
                                        dot={''}
                                        style={{ cursor: 'pointer' }}>
                                        {item.date && (
                                            <span className={'notification-date-time'}>
                                                {moment(item.date).fromNow()}
                                            </span>
                                        )}
                                        <span className={'notification-content'}>
                                            <Typography.Text strong>{item.title}</Typography.Text>
                                            <Typography.Text>{item.body}</Typography.Text>
                                        </span>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </InfiniteScroll>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAppContext(AppNotification);
