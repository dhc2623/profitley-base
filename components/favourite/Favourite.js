import { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import { Input } from 'antd';
const FavouriteItemDesktop = dynamic(() => import('./FavouriteItemDesktop'));
const Favourite = (props) => {
    const { favourite } = props;
    const [SFavourite, setSFavourite] = useState(favourite);

    useEffect(() => {}, [SFavourite]);

    const handleSearch = (e) => {
        const substr = e.target.value;
        const array = favourite;
        const flowFilter = () => {
            return _.filter(
                array,
                (item) => {
                    const partNumber = _.toLower(item.sku_code)
                    const partName = _.toLower(item.name)
                    const cat = _.toLower(item.categories.toString())
                    const brand = _.toLower(item.brand)
                    const models = _.toLower(item.models)

                    return partNumber.includes(_.toLower(substr)) || partName.includes(_.toLower(substr)) || cat.includes(_.toLower(substr)) || brand.includes(_.toLower(substr)) || models.includes(_.toLower(substr))
                }
                // _.flow(_.identity, _.values, _.join, _.toLower, _.partialRight(_.includes, substr))
            );
        };
        if (substr.length >= 0) {
            setSFavourite(flowFilter);
        } else {
            setSFavourite(favourite);
        }
    };

    return (
        <Fragment>
            <Input.Search onChange={handleSearch} size={'large'} className="m-t10"/>
            {SFavourite &&
                SFavourite.length > 0 &&
                SFavourite.map((item) => {
                    return (
                        <Fragment key={item.id}>
                            <FavouriteItemDesktop item={item} />
                        </Fragment>
                    );
                })}
        </Fragment>
    );
};
export default Favourite;
