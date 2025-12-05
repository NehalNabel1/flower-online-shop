import type {Request , Response} from 'express'
import * as ProductModel from '../models/products.model.js'
import type {Product} from '../types/products.js'

export const product_display_get =async(request :Request  ,response :Response ) =>{
    try{
        const id = request.params.id;
        if(!id){
            return response.status(400).send('Product ID is required');
        }
        const product = await  ProductModel.getProductsById(id);
        response.render('product',{product , pageTitle : 'Product' , UserId :request.session.userId});
        
            
    }
    catch(error){
        console.log('Error fetching product:',error);
        return response.status(500).send('Server Error');     

    }


};

export const product_displayFirst_get=(request :Request  ,response :Response) =>{
    ProductModel. getFirstProduct().then(product=>{
        response.render('product',{pageTitle : 'Product' , product ,isUser: request.session.userId});
    })

}