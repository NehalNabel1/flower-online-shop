import type {Request , Response} from 'express'
import { validationResult } from 'express-validator';
import * as OrderModel from '../models/orders.model.js'
import * as CartModel from '../models/cart.model.js'
import * as AuthModel from '../models/auth.model.js'

export const order_add_get = async(request :Request  ,response :Response)=>{
    try{
        const OrderError = request.flash('OrderError');
        const orders = await OrderModel.getOrders(request.session.userId as string);
        if(!orders || orders.length === 0  ){
             return response.render('order' , {pageTitle : 'Order', OrderError , orders :[] , UserId :request.session.userId } );
        }
       
        return response.render('order' , { pageTitle : 'Order' , OrderError , orders , UserId :request.session.userId } );

    }

    catch(error){
        console.log('Error in adding orders :',error);
        request.flash('OrderError','Server error , Please try again later.')
        return response.status(500).send('Server Error');   

    }  
}
export const order_add_post = async(request :Request  ,response :Response)=>{
    try{
        const sessionOrder = request.session.orderItem;
        // 1) No session order = nothing to submit
        if(!sessionOrder){
            return response.redirect('/order');
        }
        //get email by user object 
        const user = await AuthModel.getUserByUserId(sessionOrder.userId as string );
        if(! user ){
            return response.redirect('/order');

        }
        // 2) Build the order data
        const orderData ={
            ...request.body,
            userId : sessionOrder.userId,
            items : sessionOrder.items,
            totalPrice :  sessionOrder.totalPrice,
            createdDate :  sessionOrder.createdDate,
            email : user.email
        }
        // 3) Save the order
        const order = await OrderModel.addNewOrder(orderData);
        if(! order){
            return response.redirect('/cart')

        }
         // --- DELETE CART ITEMS BASED ON ORDER TYPE ---
        if( sessionOrder.items.length === 1  && sessionOrder.cartId){
            // USER ORDERED A *SINGLE* ITEM
            const deletedItem = await CartModel.deleteItemFromCart(sessionOrder.cartId as string);

            if(!deletedItem){
                request.flash('OrderError','No item found to delete from cart');
            }
        }
        else{
            // USER ORDERED *ALL* ITEMS
            const deletedCart = await CartModel.ClearCart( sessionOrder.userId as string);
            if(deletedCart.deletedCount === 0){
                request.flash('OrderError','No items deleted ,cart was already empty');

            }

        }
        // 4) Clear order session data
        request.session.orderItem = null ;
        // 5) Redirect to orders page
        return response.redirect(`/order`);
       


    }
    catch(error){
        console.log('Error in adding orders :',error);
        request.flash('OrderError','Server error , Please try again later.')
        return response.status(500).send('Server Error');   

    }  

}

export const order_delete_post = async(request :Request  ,response :Response)=>{
    try{
        const deletedOrder = await OrderModel.deleteOrder(request.body.orderId);        
        if( !deletedOrder){
            request.flash('OrderError','No order found');
            return response.redirect('/order');
        }                
        return response.redirect('/order');

    }
    catch(error){
        console.log('Error in delete order :',error);
        request.flash('OrderError','Server error , Please try again later.')
        return response.status(500).send('Server Error');   

    }  

}
