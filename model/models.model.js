// model/Comment.js
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Models extends Model {
    static table = 'models'; // table to use
    @field('model_id') brand_id; // required so field will write correctly
    @field('name') name; // required so field will write correctly
    @field('parent') parent; // required so field will write correctly
    @field('products_count') products_count; // required so field will write correctly
    @field('slug') slug; // required so field will write correctly
    @field('status') status; // required so field will write correctly
}
