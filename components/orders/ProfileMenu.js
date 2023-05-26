import React from 'react';
import Link from 'next/link';
import { getCurrentRole } from '../../helper/AuthActions';
import { USER_ROLES } from '../../config/Constant';

const ProductItem = (props) => {
    const { setBreadCrumb } = props;
    const isRetailer = getCurrentRole() && getCurrentRole().name == USER_ROLES.BUYER.name;
    const isDSP = getCurrentRole() && getCurrentRole().name == USER_ROLES.DSP.name;
    return (
        <div className="profile-menu">
            <div className="profile-menu-content">
                <ul className="profile-menu-list">
                    <li>
                        <Link
                            onClick={() => setBreadCrumb('My Profile')}
                            href="/my-profile/profile-view">
                            <a>
                                <i className="fas fa-user"></i>my profile
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => setBreadCrumb('My Orders')} href="/orders/my-orders">
                            <a className="active">
                                <i className="fas fa-box"></i>my orders
                            </a>
                        </Link>
                    </li>
                    <li>
                        {isRetailer && (
                            <Link
                                onClick={() => setBreadCrumb('Delivery Address')}
                                href="/my-profile/profile-edit/address">
                                <a>
                                    <i className="fas fa-map-marker-alt"></i>Delivery Address
                                </a>
                            </Link>
                        )}
                    </li>
                    <li>
                        {!isRetailer && !isDSP && (
                            <Link onClick={() => setBreadCrumb('Settings')} href="/settings">
                                <a>
                                    <i className="fas fa-cog"></i>Settings
                                </a>
                            </Link>
                        )}
                    </li>
                    <li>
                        {/*<Link
                            onClick={() => setBreadCrumb('Additional Information')}
                            href="/settings">
                            <a>
                                <i className="fas fa-question-circle"></i>Additional Information
                            </a>
                        </Link>*/}
                    </li>
                    {/* <li className="logout"><a onClick= {() => logout()}><i className="fas fa-sign-out-alt"></i>Logout</a></li> */}
                </ul>
            </div>
        </div>
    );
};
export default ProductItem;
