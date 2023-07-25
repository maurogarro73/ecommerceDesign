import { CartModel } from '../DAO/models/carts.models.js';
import { ProductModel } from '../DAO/models/products.model.js';

export class CartService {
  async getAll() {
    try {
      const cart = await CartModel.find({});
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async createCart() {
    try {
      const cart = await CartModel.create({});
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const existingProduct = cart.products.find((product) => product._id._id.toString() === productId.toString());
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ _id: productId, quantity: 1 });
      }
      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cid, products) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(cid, { products, quantity }, { new: true });
      console.log(updatedCart);
      return updatedCart;
    } catch (error) {
      throw new Error('Error updating cart in database');
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      const productIndex = cart.products.findIndex((product) => product._id.toString() === productId);
      if (productIndex === -1) {
        throw new Error('Product not found in the cart');
      }

      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1);
      }

      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw error;
    }
  }

  async cleanCart(cid) {
    const cart = await CartModel.findById(cid);
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.products = [];

    return await cart.save();
  }
}
