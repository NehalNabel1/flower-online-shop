import type { Types } from "mongoose";


export interface Product {
    _id : Types.ObjectId ,
    name :  string ,
    price : number ,
    category : string,
    image : {url: string  , publicId :string },
    description : string
}