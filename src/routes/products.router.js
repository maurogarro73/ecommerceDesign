import express from 'express';
import { productsController } from '../controllers/products.controller.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getbyId);
productsRouter.post('/', productsController.createOne);
productsRouter.put('/:id', productsController.updateOne);
productsRouter.delete('/:id', productsController.deletOne);
