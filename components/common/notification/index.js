import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { List, Avatar, Menu, Dropdown, Card, Typography, Badge } from 'antd';
import firebase from '../../../config/Firebase';
import { showNotification } from '../../../helper/Utils';
import { langs } from '../../../localization';
import { BellOutlined, BellFilled } from '@ant-design/icons';
import { FIREBASE_MASTER_PATH, NOTIFICATION_TYPE } from '../../../config/Constant';
import Link from 'next/link';

export class NotificationMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            key: 'tab1',
            noTitleKey: 'app',
            visibleDrawer: false,
            count: 0,
            notificationList: [],
            notificationKeys: []
        };
    }

    componentWillMount = () => {
        this.getNotificationData();
    };

    /**
     * @param {*} getNotificationData
     * @description to fetch the list of top 10 notifications.
     * @returns {NOTIFICATION_LIST}
     */
    getNotificationData = () => {
        const ref = firebase.database().ref(FIREBASE_MASTER_PATH()).limitToLast(10);
        const notificationCount = firebase
            .database()
            .ref(FIREBASE_MASTER_PATH())
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
        ref.on(
            'value',
            (snapshot) => {
                const notifications = snapshot.val();
                const notificationKeys = _.keys(notifications);
                let notificationList = [];
                _.mapKeys(notifications, (key) => {
                    notificationList.push(key);
                });
                /** Reverse the ordering of list */
                this.setState({
                    notificationList: notificationList.reverse(),
                    notificationKeys: notificationKeys.reverse()
                });
            },
            function (errorObject) {}
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
            const FIREBASE_ENDPOINT = `${FIREBASE_MASTER_PATH()}/${notificationId}`;
            const ref = firebase.database().ref(FIREBASE_ENDPOINT);
            ref.set(notification);
        });
    };

    /**
     * @param {*} readNotification
     * @description Mark notification as read andopen drawer when user clicked on notification
     */
    readNotification = (index, notificationDetails) => {
        const notificationId = this.state.notificationKeys[index];
        let notification = this.state.notificationList[index];
        notification.isRead = 1;
        /**Set key isRead as 1 in realtime. */
        const FIREBASE_ENDPOINT = `${FIREBASE_MASTER_PATH()}/${notificationId}`;
        const ref = firebase.database().ref(FIREBASE_ENDPOINT);
        ref.set(notification);

        this.setState(
            {
                moduleId:
                    parseInt(notificationDetails.isDeleted) !== 1
                        ? parseInt(notificationDetails.moduleId)
                        : '',
                resourceId:
                    parseInt(notificationDetails.isDeleted) !== 1
                        ? parseInt(notificationDetails.resourceId)
                        : '',
                visibleViewDrawer:
                    parseInt(notificationDetails.isDeleted ? notificationDetails.isDeleted : 0) !==
                    1
                        ? true
                        : false,
                notificationError: parseInt(notificationDetails.isDeleted) === 1 ? true : false
            },
            () => {
                if (this.state.notificationError) {
                    showNotification(NOTIFICATION_TYPE.WARNING, langs.labels.deletedItem);
                }
            }
        );
    };

    /**
     * @param {*} notificationMenu
     * @description returns list of notifications in menu.
     * @returns {NOTIFICATION_MENU}
     */
    notificationMenu = () => (
        <Menu className={'p-t0 p-b0'}>
            <Card
                title={<span>{langs.labels.notification}</span>}
                extra={
                    <div>
                        {this.state.count > 0 && (
                            <a
                                to={'#'}
                                className={'text-link'}
                                onClick={() => this.markAllAsRead()}
                                style={{ marginRight: '13px' }}>
                                {langs.labels.markAllAsRead}
                            </a>
                        )}
                        {this.state.notificationList.length > 0 && (
                            <Link href={'/notifications'} className={'text-link'}>
                                {langs.labels.viewAll}
                            </Link>
                        )}
                    </div>
                }
                size={'small'}
                bodyStyle={{ padding: 0 }}
                className={'notifications-dropdown '}>
                <div
                    style={{
                        minWidth: '340px',
                        maxWidth: '340px',
                        overflowX: 'auto',
                        maxHeight: 400
                    }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.notificationList}
                        style={{ maxWidth: '340px' }}
                        renderItem={(item, index) => (
                            <List.Item
                                key={'notification-Dropdown'}
                                className={
                                    item.isRead
                                        ? 'notification-Dropdown-read'
                                        : 'notification-Dropdown-unread'
                                }
                                onClick={() => {
                                    this.readNotification(index, item);
                                }}>
                                {}
                                <List.Item.Meta
                                    style={{ cursor: 'pointer' }}
                                    avatar={<Avatar icon={<BellFilled />} />}
                                    title={
                                        <div className={'notificationdrop-title'}>
                                            <span className={'title'}>{item.title}</span>
                                            {item.date && (
                                                <span>{moment(item.date).fromNow()}</span>
                                            )}
                                        </div>
                                    }
                                    description={
                                        <React.Fragment>
                                            <Typography.Paragraph className={'m-b0'}>
                                                {item.body.length > 75
                                                    ? `${item.body.substring(0, 75)}...`
                                                    : item.body}
                                            </Typography.Paragraph>
                                        </React.Fragment>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        </Menu>
    );

    render() {
        return (
            <React.Fragment>
                {/* <Dropdown
          overlay={this.notificationMenu}
          trigger={["click"]}
          placement="bottomRight"
          className="notification-menu"
        >
          <Badge size={'small'} count={this.state.count} showZero>
            <BellFilled />
          </Badge>
        </Dropdown> */}
            </React.Fragment>
        );
    }
}
