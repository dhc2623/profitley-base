import { Carousel } from 'antd';
import React from 'react';

class ProductCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselNav1: null,
            carouselNav2: null
        };
    }
    /**
     * @method componentDidMount
     * @description called after render the component
     */
    componentDidMount() {
        this.setState({
            carouselNav1: this.slider1,
            carouselNav2: this.slider2
        });
    }
    /**
     * @method render
     * @description render component
     */
    render() {
        const { mainImages, thumbImages } = this.props;

        let imgLength =
            mainImages && Array.isArray(mainImages.fileList) ? mainImages.fileList.length : 1;
        const carouselSettings = {
            dots: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const carouselNavSettings = {
            speed: 500,
            slidesToShow:
                imgLength === 3
                    ? mainImages.fileList.length - 1
                    : imgLength === 3
                    ? mainImages.fileList.length + 2
                    : 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            focusOnSelect: true,
            dots: false,
            arrows: true,
            infinite: false
        };

        return (
            <React.Fragment>
                <Carousel
                    {...carouselSettings}
                    asNavFor={this.state.carouselNav2}
                    ref={(slider) => (this.slider1 = slider)}
                    className={'product-gallery'}>
                    {mainImages}
                </Carousel>
                <Carousel
                    {...carouselNavSettings}
                    asNavFor={this.state.carouselNav1}
                    ref={(slider) => (this.slider2 = slider)}
                    className={'product-gallery-nav'}>
                    {thumbImages}
                </Carousel>
            </React.Fragment>
        );
    }
}

export default ProductCarousel;
