// model/Comment.js
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Segments extends Model {
    static table = 'segments'; // table to use
    @field('segment_id') manufacturer_id; // required so field will write correctly
    @field('name') name; // required so field will write correctly
    @field('products_count') products_count; // required so field will write correctly
    @field('slug') slug; // required so field will write correctly
    @field('status') status; // required so field will write correctly
}
