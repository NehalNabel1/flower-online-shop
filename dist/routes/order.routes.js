import Router from 'express';
import * as orderController from '../controllers/order.controller.js';
import * as authGuards from './guards/auth.guard.js';
import { check } from 'express-validator';
export const orderRouter = Router();
orderRouter.get('/', authGuards.isAuth, orderController.order_add_get);
orderRouter.post('/', authGuards.isAuth, orderController.order_add_post);
orderRouter.post('/delete', authGuards.isAuth, orderController.order_delete_post);
