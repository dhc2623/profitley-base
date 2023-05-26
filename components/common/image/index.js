import React from 'react';

const Image = (props) => {
    const {src, alt, width, height, className} = props
    return (
        <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            className={className}
            {...props}
        />
    );
};

export default Image;
