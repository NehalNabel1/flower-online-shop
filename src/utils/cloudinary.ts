import { v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import path from 'path'

import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

dotenv.config({ path: path.join(process.cwd(), '.env') });

const {CLOUDINARY_CLOUD_NAME , CLOUDINARY_API_KEY ,CLOUDINARY_API_SECRET } = process.env;
if(!CLOUDINARY_CLOUD_NAME || ! CLOUDINARY_API_KEY  || !CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary environment variables") ;
}
cloudinary.config({
    cloud_name : CLOUDINARY_CLOUD_NAME,    
    api_key: CLOUDINARY_API_KEY ,
    api_secret : CLOUDINARY_API_SECRET
})

//Cloudinary upload image function 
export const cloudinaryUploadImage = async(fileToUpload : string) : Promise< UploadApiResponse | UploadApiErrorResponse > =>{
    try{
        const data = cloudinary.uploader.upload(fileToUpload , {
            resource_type : 'auto'
        });
        return data;

    }
    catch(err){
        return err as UploadApiErrorResponse ;
    }
}

//Cloudinary Remove image function 
export const cloudinaryRemoveImage = async(imagePublicId : string)=>{
    try{
        const result = cloudinary.uploader.destroy(imagePublicId);
        return result;

    }
    catch(err){
        return err;
    }
}