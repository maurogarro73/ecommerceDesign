import { ProductModel } from '../DAO/models/products.model.js';

export class ProductService {
  validateProduct(title, description, price, thumbnail, code, stock, category, status) {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status) {
      console.log('Validation error: please complete all fields');
      throw new Error('Validation error: please complete all fields');
    }
  }

  async getProducts(limit, page, category, sort) {
    const queryCategory = category ? { category: category } : {};

    let querySort = {};
    if (sort == 'asc') {
      querySort = { price: 1 };
    } else if (sort == 'desc') {
      querySort = { price: -1 };
    } else {
      querySort = {};
    }

    const productsPaginate = await ProductModel.paginate(queryCategory, { limit: limit || 5, page: page || 1, sort: querySort });

    //Creo e Incorporo los link prev y next antes de devolver todo
    productsPaginate.prevLink = productsPaginate.prevPage ? `/api/products?page=${productsPaginate.prevPage}` : null;
    productsPaginate.nextLink = productsPaginate.nextPage ? `/api/products?page=${productsPaginate.nextPage}` : null;

    return productsPaginate;
  }

  async getOneById(id) {
    const product = await ProductModel.findOne({ _id: id });
    return product;
  }

  async createOne(title, description, price, thumbnail, code, stock, category, status) {
    this.validateProduct(title, description, price, thumbnail, code, stock, category, status);
    const productCreated = await ProductModel.create({ title, description, price, thumbnail, code, stock, category, status });
    return productCreated;
  }

  async deleteOne(id) {
    const deleted = await ProductModel.deleteOne({ _id: id });
    return deleted;
  }

  async updateOne(id, title, description, price, thumbnail, code, stock, category, status) {
    if (!id) throw new Error('Invalid _id');
    this.validateProduct(title, description, price, thumbnail, code, stock, category, status);
    const productUptaded = await ProductModel.updateOne({ _id: id }, { title, description, price, thumbnail, code, stock, category, status });
    return productUptaded;
  }
}
