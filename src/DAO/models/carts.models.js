import { Schema, model } from 'mongoose';

const cartsSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
});

cartsSchema.pre('find', function () {
  this.populate({ path: 'products', populate: { path: '_id', model: 'products' } });
});

cartsSchema.pre('findOne', function () {
  this.populate({ path: 'products', populate: { path: '_id', model: 'products' } });
});
export const CartModel = model('carts', cartsSchema);
