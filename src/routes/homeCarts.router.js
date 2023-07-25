import express from 'express';
import { CartModel } from '../DAO/models/carts.models.js';

export const cartsHtml = express.Router();

cartsHtml.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cartFound = await CartModel.findById(cid).populate('products.product');
    if (!cartFound) {
      throw new Error('Cart not found');
    }

    const idCart = cartFound._id;

    let cart = cartFound.products.map((item) => {
      return {
        title: item._id.title,
        price: item._id.price,
        quantity: item.quantity,
      };
    });

    return res.status(200).render('carts', { cart: cart, idCart });
  } catch (error) {
    console.log(error);
  }
});
