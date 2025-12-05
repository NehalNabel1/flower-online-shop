import { validationResult } from 'express-validator';
import * as CartModel from '../models/cart.model.js';
import { timeStamp } from 'console';
export const cart_add_get = async (request, response) => {
    try {
        const items = await CartModel.getItemByUser(request.session.userId);
        const validationErrorRaw = request.flash('validationError')[0];
        const validationError = validationErrorRaw ? JSON.parse(validationErrorRaw) : [];
        response.render('cart', { items, UserId: request.session.userId, pageTitle: 'Cart', validationError });
    }
    catch (error) {
        console.log('Error in Add item to cart :', error);
        request.flash('CartError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const cart_add_post = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            request.flash('validationError', JSON.stringify(errors.array()));
            return response.redirect(request.body.redirectTo);
        }
        const { name, amount, price, productId } = request.body;
        const item = await CartModel.addNewItem({
            name: name,
            amount: Number(amount),
            price: Number(price),
            productId: productId,
            userId: request.session.userId
            //timeStamp : new Date().toISOString()
        });
        if (!item) {
            console.log('cart error');
            return response.redirect(request.body.redirectTo);
        }
        console.log(item);
        response.redirect('/cart');
    }
    catch (error) {
        console.log('Error in Add item to cart :', error);
        request.flash('CartError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const cart_save_post = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const errorsArray = errors.array().map(err => ({
                ...err,
                cartId: request.body.cartId
            }));
            //console.log(errorsArray[0]); // this is just an object 
            //console.log(errorsArray); // this is array of objects , so i can run filter on it and access cartId properity
            request.flash('validationError', JSON.stringify(errorsArray));
            return response.redirect('/cart');
        }
        const resultObj = await CartModel.editItemAmount(request.body.cartId, {
            amount: request.body.amount,
            timeStamp: Date.now()
        });
        if (resultObj.matchedCount === 0) {
            return response.redirect('/error');
        }
        return response.redirect('/cart');
    }
    catch (error) {
        console.log('Error in save item to cart :', error);
        request.flash('CartError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const cart_delete_post = async (request, response) => {
    try {
        const deleteResult = await CartModel.deleteItemFromCart(request.body.cartId);
        if (!deleteResult) {
            return response.redirect('/error');
        }
        return response.redirect('/cart');
    }
    catch (error) {
        console.log('Error in delete item from cart :', error);
        request.flash('CartError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const cart_order_post = async (request, response) => {
    try {
        const order = await CartModel.getItemByCartId(request.body.cartId);
        if (!order) {
            return response.redirect('/error');
        }
        request.session.orderItem = {
            userId: order.userId,
            items: [order],
            totalPrice: order.amount * order.price,
            createdDate: new Date(),
            cartId: request.body.cartId
        };
        console.log(request.session.orderItem);
        //redirect match the url path not the file.ejs
        return response.redirect('/cart/verify-orders');
    }
    catch (error) {
        console.log('Error in delete item from cart :', error);
        request.flash('CartError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const cart_all_order_post = async (request, response) => {
    try {
        const orders = await CartModel.getAllItemsByUserId(request.body.userId);
        if (!orders || orders.length === 0) {
            return response.status(404).json({ message: 'No order found' });
        }
        const firstOrder = orders[0]; // non-null assertion
        request.session.orderItem = {
            userId: firstOrder.userId,
            items: orders,
            totalPrice: orders.reduce((sum, item) => sum + item.amount * item.price, 0),
            createdDate: new Date()
        };
        console.log(request.session.orderItem);
        //redirect match the url path not the file.ejs
        return response.redirect('/cart/verify-orders');
    }
    catch (error) {
        console.log('Error in delete item from cart :', error);
        request.flash('CartError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const cart_order_get = async (request, response) => {
    try {
        const OrderError = request.flash('OrderError');
        response.render('orders-verification', { pageTitle: 'Cart', OrderError, UserId: request.session.userId });
    }
    catch (error) {
        console.log('Error in delete item from cart :', error);
        request.flash('OrderError', 'Server error , Error submitting order information.');
        return response.status(500).send('Server Error');
    }
};
