import * as AuthModel from '../models/auth.model.js';
import { validationResult } from 'express-validator';
export const auth_login_get = (request, response) => {
    const authError = request.flash('authError');
    response.render('login', { authError, pageTitle: 'Login' });
};
export const auth_login_post = async (request, response) => {
    try {
        const { email, password } = request.body;
        //get user id 
        const userObj = await AuthModel.login(email, password);
        if (!userObj) {
            request.flash('authError', 'Email or Password is incorrect ');
            response.redirect('/login');
            return;
        }
        //set session id 
        request.session.userId = userObj.id.toString();
        //set session isAdmin
        request.session.isAdmin = userObj.isAdmin;
        response.redirect('/');
    }
    catch (error) {
        console.log('Error in login :', error);
        request.flash('authError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const auth_signup_post = async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            request.flash('validationError', JSON.stringify(errors.array()));
            request.flash('oldInput', JSON.stringify(request.body));
            return response.redirect('/signup');
        }
        const { username, email, password } = request.body;
        const user = await AuthModel.createNewUser(username, email, password);
        if (user) {
            response.redirect('/login');
        }
        else {
            request.flash('oldInput', JSON.stringify(request.body));
            request.flash('authError', 'Email already exist');
            response.redirect('/signup');
        }
    }
    catch (error) {
        console.log('Error create new user :', error);
        request.flash('authError', 'Server error , Please try again later.');
        return response.status(500).send('Server Error');
    }
};
export const auth_signup_get = (request, response) => {
    const authError = request.flash('authError');
    const validationErrorRaw = request.flash('validationError')[0];
    const validationError = validationErrorRaw ? JSON.parse(validationErrorRaw) : [];
    const oldInputRaw = request.flash('oldInput')[0];
    const oldInput = oldInputRaw ? JSON.parse(oldInputRaw) : {};
    response.render('signup', { authError, validationError, oldInput, pageTitle: 'Signup' });
};
export const auth_logout_all = (request, response) => {
    request.session.destroy(() => {
        response.redirect('/');
    });
};
