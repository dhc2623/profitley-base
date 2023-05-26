// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'brands', // table name
            columns: [
                {
                    name: 'brand_id',
                    type: 'number'
                },
                {
                    name: 'image',
                    type: 'string'
                },
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'parent',
                    type: 'string'
                },
                {
                    name: 'products_count',
                    type: 'string'
                },
                {
                    name: 'slug',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'string'
                }
            ]
        }),
        tableSchema({
            name: 'categories', // table name
            columns: [
                {
                    name: 'cat_id',
                    type: 'number'
                },
                {
                    name: 'image',
                    type: 'string'
                },
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'parent',
                    type: 'string'
                },
                {
                    name: 'parent_id',
                    type: 'number'
                },
                {
                    name: 'products_count',
                    type: 'string'
                },
                {
                    name: 'slug',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'string'
                },
                {
                    name: 'sub_category_count',
                    type: 'number'
                }
            ]
        }),
        tableSchema({
            name: 'manufacturers', // table name
            columns: [
                {
                    name: 'manufacturer_id',
                    type: 'number'
                },
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'slug',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'string'
                }
            ]
        }),
        tableSchema({
            name: 'models', // table name
            columns: [
                {
                    name: 'model_id',
                    type: 'number'
                },
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'parent',
                    type: 'string'
                },
                {
                    name: 'products_count',
                    type: 'string'
                },
                {
                    name: 'slug',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'string'
                }
            ]
        }),
        tableSchema({
            name: 'segments', // table name
            columns: [
                {
                    name: 'segment_id',
                    type: 'number'
                },
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'products_count',
                    type: 'string'
                },
                {
                    name: 'slug',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'string'
                }
            ]
        }),
        tableSchema({
            name: 'buyers', // table name
            columns: [
                {
                    name: 'buyer_id',
                    type: 'number'
                },
                {
                    name: 'address1',
                    type: 'string'
                },
                {
                    name: 'address2',
                    type: 'string'
                },
                {
                    name: 'buyer_category',
                    type: 'number'
                },
                {
                    name: 'category',
                    type: 'string'
                },
                {
                    name: 'city',
                    type: 'number'
                },
                {
                    name: 'cityName',
                    type: 'string'
                },
                {
                    name: 'created_at',
                    type: 'number'
                },
                {
                    name: 'credit_limit',
                    type: 'string'
                },
                {
                    name: 'district',
                    type: 'number'
                },
                {
                    name: 'districtName',
                    type: 'string'
                },
                {
                    name: 'email',
                    type: 'string'
                },
                {
                    name: 'full_name',
                    type: 'string'
                },
                {
                    name: 'gst',
                    type: 'string'
                },
                {
                    name: 'last_name',
                    type: 'string'
                },
                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'phone_country_code',
                    type: 'string'
                },
                {
                    name: 'phone_number',
                    type: 'string'
                },
                {
                    name: 'picture',
                    type: 'string'
                },
                {
                    name: 'picture_thumb',
                    type: 'string'
                },
                {
                    name: 'pincode',
                    type: 'string'
                },
                {
                    name: 'role',
                    type: 'string'
                },
                {
                    name: 'shop_name',
                    type: 'string'
                },
                {
                    name: 'state',
                    type: 'number'
                },
                {
                    name: 'stateName',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'number'
                },
                {
                    name: 'updated_at',
                    type: 'number'
                }
            ]
        })
    ]
});
