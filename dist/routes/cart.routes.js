import Router from 'express';
import * as cartController from '../controllers/cart.controller.js';
import * as authGuards from './guards/auth.guard.js';
import { check } from 'express-validator';
export const cartRouter = Router();
cartRouter.get('/', authGuards.isAuth, cartController.cart_add_get);
cartRouter.post('/', authGuards.isAuth, check('amount').not().isEmpty().withMessage('Amount is required').bail()
    .isInt({ min: 1 }).withMessage('Amount must be greater than 0'), cartController.cart_add_post);
cartRouter.post('/save', authGuards.isAuth, check('amount').not().isEmpty().withMessage('Amount is required').bail()
    .isInt({ min: 1 }).withMessage('Amount must be greater than 0'), cartController.cart_save_post);
cartRouter.post('/delete', authGuards.isAuth, cartController.cart_delete_post);
cartRouter.get('/verify-orders', authGuards.isAuth, cartController.cart_order_get);
cartRouter.post('/verify-orders', authGuards.isAuth, cartController.cart_order_post);
cartRouter.post('/verify-all-orders', authGuards.isAuth, cartController.cart_all_order_post);
