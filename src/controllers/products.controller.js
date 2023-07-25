import { ProductService } from '../services/products.service.js';

const Products = new ProductService();

class ProductsController {
  async getAll(req, res) {
    try {
      const { limit, page, sort } = req.query;
      const category = req.query.category || '';
      const products = await Products.getProducts(limit, page, category, sort);

      return res.status(200).json({
        status: 'success',
        msg: 'listado de productos',
        payload: products,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        products: {},
      });
    }
  }

  async getbyId(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.getOneById(id);
      return res.status(200).json({
        status: 'success',
        msg: 'listado de productos',
        payload: product,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        payload: {},
      });
    }
  }

  async createOne(req, res) {
    try {
      const { title, description, price, thumbnail, code, stock, category, status } = req.body;

      const productCreated = await Products.createOne(title, description, price, thumbnail, code, stock, category, status);
      return res.status(201).json({
        status: 'success',
        msg: 'product created',
        payload: productCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        payload: {},
      });
    }
  }

  async updateOne(req, res) {
    try {
      const { id } = req.params;
      const { title, description, price, thumbnail, code, stock, category, status } = req.body;

      const productUptaded = await Products.updateOne(id, title, description, price, thumbnail, code, stock, category, status);

      return res.status(201).json({
        status: 'success',
        msg: 'product uptaded',
        payload: productUptaded,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        payload: {},
      });
    }
  }

  async deletOne(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Service.deleteOne(id);
      return res.status(200).json({
        status: 'success',
        msg: 'product deleted',
        payload: deleted,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        payload: {},
      });
    }
  }
}

export const productsController = new ProductsController();
