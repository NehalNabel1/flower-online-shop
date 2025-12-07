import type {Request , Response ,NextFunction} from 'express'

export const setIsUser = (request :Request , response : Response , next : NextFunction)=>{
    response.locals.isUser = request.session.userId ?? false ;
    next();
}