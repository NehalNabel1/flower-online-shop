import Router from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { check } from 'express-validator';
import { error } from 'console';
import multer from 'multer';
import * as adminGuard from './guards/admin.guard.js';
import path from 'path';
export const adminRouter = Router();
const __dirname = path.resolve();
const validateProductData = [
    check('image').custom((value, { req }) => {
        if (req.file)
            return true;
        else
            throw 'Image is required';
    }),
    check('name').trim().not().isEmpty().withMessage('Product Name is required'),
    check('price').trim().not().isEmpty().withMessage('Price is required'),
    check('description').trim().not().isEmpty().withMessage('Description is required'),
    check('category').trim().not().isEmpty().withMessage('Category is required')
];
adminRouter.get('/add', adminGuard.isAdmin, adminController.admin_addProducts_get);
adminRouter.post('/add', adminGuard.isAdmin, multer({ storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, 'images'));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }) }).single('image'), validateProductData, adminController.admin_addProducts_post);
adminRouter.get('/orders', adminGuard.isAdmin, adminController.admin_manageOrders_get);
adminRouter.post('/orders/update-status/:orderId', adminGuard.isAdmin, adminController.admin_updateOrder_post);
adminRouter.post('/orders/delete', adminGuard.isAdmin, adminController.admin_deleteOrder_post);
