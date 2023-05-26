import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Image = dynamic(() => import('../common/image'));

const BlockItem = (props) => {
    const { image, name, link } = props;
    return (
        <Link href={link}>
            <a>
                <div className="block-item">
                    <div className="block-item-inner">
                        <span className="block-item-photo">
                            <Image
                                src={image}
                                className="block-image"
                                width={80}
                                height={80}
                                alt={name}
                            />
                        </span>
                        <div className="block-item-details">
                            <div className="block-item-info">
                                <div className="block-item-name">
                                    <span>{name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default BlockItem;
