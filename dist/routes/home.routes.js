import Router from 'express';
import * as HomeController from '../controllers/home.controller.js';
export const homeRouter = Router();
homeRouter.get('/', HomeController.product_home_get);
