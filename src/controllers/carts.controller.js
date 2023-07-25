import { CartService } from '../services/carts.service.js';

const Carts = new CartService();

class CartController {
  async creatCart(req, res) {
    try {
      const cart = await Carts.createCart();
      res.status(201).json({
        status: 'success',
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'error creating cart',
      });
    }
  }

  async addProductToCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const cart = await Carts.addProductToCart(cid, pid);
      res.status(200).json({
        status: 'success',
        payload: cart,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'FATAL ERROR',
      });
    }
  }

  async getCartById(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await Carts.getCartById(cid);
      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: `cart ${cid} not found`,
        });
      }
      res.status(200).json({
        status: 'success',
        msg: 'Cart found',
        payload: cart,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'error getting cart',
      });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await Carts.getAll();
      return res.status(201).json({
        status: 'success',
        msg: 'Carts list',
        payload: carts,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'cart not found',
        payload: {},
      });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products, quantity } = req.body;
      console.log(products);
      const updatedCart = await Carts.updateCart(cid, products, quantity);
      return res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
      console.log(error);
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const cart = await Carts.removeProductFromCart(cid, pid);
      return res.status(200).json({
        status: 'success',
        msg: 'Product removed from cart',
        payload: cart,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }

  async cleanCart(req, res) {
    try {
      const cid = req.params.cid;
      const cart = await Carts.cleanCart(cid);
      return res.status(200).json({
        status: 'success',
        msg: 'Product removed from cart',
        payload: cart,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'error',
        msg: error.message,
      });
    }
  }
}

export const cartController = new CartController();
