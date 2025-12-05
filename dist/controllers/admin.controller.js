import { json } from 'zod';
import { validationResult } from 'express-validator';
import * as ProductModel from '../models/products.model.js';
import * as OrderModel from '../models/orders.model.js';
export const admin_addProducts_get = async (request, response) => {
    try {
        const adminError = request.flash('adminError');
        const validationErrorRaw = request.flash('validationError')[0];
        const validationError = validationErrorRaw ? JSON.parse(validationErrorRaw) : [];
        const oldInputRaw = request.flash('oldInput')[0];
        const oldInput = oldInputRaw ? JSON.parse(oldInputRaw) : {};
        const successMsg = request.flash('successMsg');
        response.render('add-products', {
            adminError,
            validationError,
            oldInput,
            successMsg,
            pageTitle: 'Add Product',
            isAdmin: true
        });
    }
    catch (error) {
        console.log('Error in login :', error);
        request.flash('adminError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const admin_addProducts_post = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            request.flash('validationError', JSON.stringify(errors.array()));
            request.flash('oldInput', JSON.stringify(request.body));
            return response.redirect('/admin/add');
        }
        if (!request.file) {
            request.flash('validationError', JSON.stringify({ type: 'field',
                value: undefined,
                msg: 'Image is required',
                path: 'image',
                location: 'body' }));
            return response.redirect('/admin/add');
        }
        const productData = {
            name: request.body.name,
            price: request.body.price,
            category: request.body.category,
            description: request.body.description,
            image: request.file.filename
        };
        const product = await ProductModel.addProduct(productData);
        if (!product) {
            request.flash('adminError', 'Error i adding new product');
            return response.redirect('/admin/add');
        }
        request.flash('successMsg', 'Product added successfully');
        return response.redirect('/admin/add');
    }
    catch (error) {
        console.log('Error in login :', error);
        request.flash('adminError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const admin_manageOrders_get = async (request, response) => {
    try {
        const OrderError = request.flash('OrderError');
        const successMsg = request.flash('successMsg');
        const orders = await OrderModel.getAllOrders();
        if (!orders || orders.length === 0) {
            return response.render('manage-orders', { OrderError, orders: [], successMsg });
        }
        return response.render('manage-orders', { pageTitle: 'Manage Orders', OrderError, orders, successMsg });
    }
    catch (error) {
        console.log('Error in adding orders :', error);
        request.flash('OrderError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const admin_updateOrder_post = async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const status = request.body.status;
        const order = await OrderModel.updateOrderStatus(orderId, status);
        if (!order) {
            request.flash('OrderError', 'Error updating order status');
            return response.redirect('/admin/orders');
        }
        request.flash('successMsg', 'Order status updated successfully');
        return response.redirect('/admin/orders');
    }
    catch (error) {
        console.log('Error in adding orders :', error);
        request.flash('OrderError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const admin_deleteOrder_post = async (request, response) => {
    try {
        const deletedOrder = await OrderModel.deleteOrder(request.body.orderId);
        if (!deletedOrder) {
            request.flash('OrderError', 'No order found');
            return response.redirect('/admin/orders');
        }
        return response.redirect('/admin/orders');
    }
    catch (error) {
        console.log('Error in delete order :', error);
        request.flash('OrderError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
