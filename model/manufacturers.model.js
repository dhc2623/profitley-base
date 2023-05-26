// model/Comment.js
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Manufacturers extends Model {
    static table = 'manufacturers'; // table to use
    @field('manufacturer_id') manufacturer_id; // required so field will write correctly
    @field('name') name; // required so field will write correctly
    @field('slug') slug; // required so field will write correctly
    @field('status') status; // required so field will write correctly
}
