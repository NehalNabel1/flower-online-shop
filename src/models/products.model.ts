
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import {Types} from 'mongoose'
import type  {InferSchemaType}  from 'mongoose'

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '.env') });
//dotenv.config({path : '.env'});
const DB_URL = process.env.DB_URL;
if(! DB_URL){
    throw new Error('DB_URL is not defined in .env');
}
//create schema
const requiredString =  { type : String , required :true } ;
const requiredNumber = { type : Number , required :true };
const productSchema = new mongoose.Schema({    
    name :   requiredString ,
    price : requiredNumber ,
    category :  requiredString,
    image :  requiredString,
    description :  requiredString

});
//create model
const Product = mongoose.model('product',productSchema , 'Products');

type ProductType = InferSchemaType< typeof productSchema> & {
    readonly _id : Types.ObjectId;
};
type NewProductType  = Omit< ProductType , '_id'>;
//function to get all products
export const getAllProducts =async() : Promise<ProductType[]>=>{
try{
    //await mongoose.connect(DB_URL);
   
    const products = await Product.find();
    //await mongoose.disconnect();
    return products;
}


catch(error){
    console.log('Error connected to db',error);
    throw error;
}
}

export const getProductsByCategory= async(category : string) : Promise<ProductType[]>=>{
    try{
       // await mongoose.connect(DB_URL);
        const products = await Product.find({category : category});
       // mongoose.disconnect();
        return products;
    }
    catch(error){
        console.log('Error connected to db',error);
        throw error;
    }
}

export const getProductsById= async(id : string ) : Promise<ProductType | null> =>{
    try{
        //await mongoose.connect(DB_URL);
        const product = await Product.findById(id)
       // mongoose.disconnect();
        return product;
    }
    catch(error){
        console.log('Error connected to db',error);
        throw error;
    }
}

export const getFirstProduct= async() : Promise< ProductType | null> =>{
    try{
        
        const product = await Product.findOne({});
       
        return product;
    }
    catch(error){
        console.log('Error connected to db',error);
        throw error;
    }
}

export const addProduct = async(data :  NewProductType)=>{
    try{
        const product = new Product(data);
        const savedProduct = product.save();
        return savedProduct;

    }
    catch(error){
        console.log('Error connected to db',error);
        throw error;
    }
}

