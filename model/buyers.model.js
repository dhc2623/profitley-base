// model/Comment.js
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Buyers extends Model {
    static table = 'buyers'; // table to use
    @field('address1') address1; // required so field will write correctly
    @field('address2') address2; // required so field will write correctly
    @field('buyer_category') buyer_category; // required so field will write correctly
    @field('category') category; // required so field will write correctly
    @field('city') city; // required so field will write correctly
    @field('cityName') cityName; // required so field will write correctly
    @field('created_at') created_at; // required so field will write correctly
    @field('credit_limit') credit_limit; // required so field will write correctly
    @field('district') district; // required so field will write correctly
    @field('districtName') districtName; // required so field will write correctly
    @field('email') email; // required so field will write correctly
    @field('full_name') full_name; // required so field will write correctly
    @field('gst') gst; // required so field will write correctly
    @field('last_name') last_name; // required so field will write correctly
    @field('name') name; // required so field will write correctly
    @field('phone_country_code') phone_country_code; // required so field will write correctly
    @field('phone_number') phone_number; // required so field will write correctly
    @field('picture') picture; // required so field will write correctly
    @field('picture_thumb') picture_thumb; // required so field will write correctly
    @field('pincode') pincode; // required so field will write correctly
    @field('role') role; // required so field will write correctly
    @field('shop_name') shop_name; // required so field will write correctly
    @field('state') state; // required so field will write correctly
    @field('stateName') stateName; // required so field will write correctly
    @field('status') status; // required so field will write correctly
    @field('updated_at') updated_at; // required so field will write correctly
}
