import React from 'react';
import Link from 'next/link';
import { Carousel } from 'antd';

const CarouselSlider = (props) => {
    const carouselSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        responsive: [
            {
                breakpoint: 800,
                settings: 'unslick'
            }
        ]
    };
    const { slideItems = [] } = props;
    return (
        <Carousel {...carouselSettings}>
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

export default CarouselSlider;
