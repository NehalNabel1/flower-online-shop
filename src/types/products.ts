import type { Types } from "mongoose";


export interface Product {
    _id : Types.ObjectId ,
    name :  string ,
    price : number ,
    category : string,
    image : string,
    description : string
}