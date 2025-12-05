import type {Request , Response ,NextFunction} from 'express'

export const isAdmin = (request :Request , response : Response , next : NextFunction)=>{
    if(request.session.isAdmin){
        next();
    }
    else{
        response.redirect('/not-admin')
    }
}