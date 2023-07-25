import express from 'express';
import { CartService } from '../services/carts.service.js';
import { cartController } from '../controllers/carts.controller.js';

const cartService = new CartService();

export const cartsRouter = express.Router();

cartsRouter.get('/', cartController.getCarts);
cartsRouter.get('/:cid/products', cartController.getCartById);
cartsRouter.post('/', cartController.creatCart);
cartsRouter.put('/:cid/products/:pid', cartController.addProductToCart);
cartsRouter.put('/:cid', cartController.updateCart);
cartsRouter.delete('/:cid/products/:pid', cartController.removeProductFromCart);
cartsRouter.delete('/:cid', cartController.cleanCart);
