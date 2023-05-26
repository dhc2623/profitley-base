import React from 'react';

const Listing = ({ listingLeft, listingRight, icon, onClick, iconArrow = true }) => {
    return (
        <div className="listing" onClick={onClick}>
            <div className="listing-left">
                {icon && (
                    <span className="icon">
                        <img src={icon} alt="" />
                    </span>
                )}
                <div className="content">{listingLeft}</div>
            </div>
            <div className="listing-right">
                {listingRight}
                {iconArrow ? (
                    <img src={'/assets/images/svg/slider-arrow-right.svg'} alt="" width="6" />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Listing;
