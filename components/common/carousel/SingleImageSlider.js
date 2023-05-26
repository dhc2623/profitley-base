import React from 'react';
import Link from 'next/link';
import { Carousel } from 'antd';

const SingleImageSlider = (props) => {
    const bannerSettings = {
        autoplay: true,
        // infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        dots: true
    };
    const { slideItems = [], className } = props;
    return (
        <Carousel {...bannerSettings} className={className}>
            {slideItems.map(
                (item, index) =>
                    item && (
                        <div key={index} className="slider-item">
                            {item}
                        </div>
                    )
            )}
        </Carousel>
    );
};

export default SingleImageSlider;
