//declaration merging
import 'express-session'
import {ObjectId} from 'mongoose'


interface orderItem {
    userId  : ObjectId| string,
    cartId ? : ObjectId| string,
    items :{  // i can send obj with more properties than this but it must contain these properties first
        name: string,
        price: number,
        amount: number,
        userId: string,
        productId:string,
        timeStamp? : Date |null

    }[],
    totalPrice :number
    createdDate ? : Date


}
 declare module 'express-session'{
    interface SessionData{
        userId ? : ObjectId| string;
        orderItem ? : orderItem |  null;
        isAdmin ? : boolean;

    }
}