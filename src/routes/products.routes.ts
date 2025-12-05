


import Router from 'express'
import * as ProductController from '../controllers/products.controller.js'
export const productRouter =  Router();
productRouter.get('/',  ProductController.product_displayFirst_get);
productRouter.get('/:id',  ProductController.product_display_get);