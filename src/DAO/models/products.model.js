import { Schema, model } from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 150 },
  price: { type: Number, required: true, max: 100 },
  thumbnail: { type: String, required: false, max: 100 },
  code: { type: String, required: true, max: 10, unique: true },
  stock: { type: Number, required: true, max: 100 },
  category: { type: String, required: true, max: 100 },
  status: { type: Boolean, required: true, max: 5 },
});

schema.plugin(mongoosePagination);
export const ProductModel = model('products', schema);
