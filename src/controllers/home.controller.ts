import type {Request , Response} from 'express'
import * as ProductModel from '../models/products.model.js'
import type { Product} from '../types/products.js'

export const product_home_get =async(request :Request  ,response :Response ) =>{
    try{
        const adminError = request.flash('adminError');
        const successMsg = request.flash('successMsg');
        console.log(request.session.userId);
        const category = request.query.category;
        let products : Product[];
        const validCategories : string[] =['clothes' ,'books','bags'];
        if( typeof category ==='string'  && validCategories.includes(category)){
             products =  await ProductModel.getProductsByCategory(category);                  
        }
        else{
            products =  await ProductModel.getAllProducts();
        } 
        const validationErrorRaw = request.flash('validationError')[0];
        const validationError = validationErrorRaw ? JSON.parse(validationErrorRaw) : [];
        response.render('index',{products , pageTitle : 'Home' , validationError , adminError , successMsg });       
    }
    catch(error){
        console.log('Error fetching products:',error);
        return response.status(500).send('Server Error');     

    }


};