import Router from 'express'
import * as authController from '../controllers/auth.controller.js'
import {check} from 'express-validator'
import { error } from 'console';
import * as authGuards from './guards/auth.guard.js' 
export const authRouter = Router();

const validateSignup = [
    check('username').trim().not().isEmpty().withMessage('Username is required')
    .isLength({min : 3}).withMessage('Username must be more than 2 characters'),
    check('email').trim().not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid'),
    check('password').trim().not().isEmpty().withMessage('Password is required')
    .isLength({min : 5}).withMessage('Password must be at least 5 characters'),
    check('confirmPassword').trim().custom((value , {req})=>{
        if(value !== req.body.password) {
            throw new Error('Confirm password does not match')
        } return true
       
    }).withMessage('Confirm password does not match')
] ;
authRouter.get('/login',authGuards.notAuth ,authController.auth_login_get);
authRouter.post('/login',authGuards.notAuth ,authController.auth_login_post);
authRouter.get('/signup',authGuards.notAuth , authController.auth_signup_get);
authRouter.post('/signup',authGuards.notAuth , validateSignup ,authController.auth_signup_post);



authRouter.all('/logout',authGuards.isAuth ,authController.auth_logout_all);