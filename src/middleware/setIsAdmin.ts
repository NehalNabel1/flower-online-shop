import type {Request , Response ,NextFunction} from 'express'

export const setIsAdmin = (request :Request , response : Response , next : NextFunction)=>{
    response.locals.isAdmin = request.session.isAdmin ?? false ;
    next();
}

