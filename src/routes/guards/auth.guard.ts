import type {Request , Response ,NextFunction} from 'express'

export const isAuth = (request :Request , response : Response , next : NextFunction)=>{
    if(request.session.userId){
        next();
    }
    else{
         response.redirect('/login')
    }
}

export const notAuth = (request :Request , response : Response , next : NextFunction)=>{
    if( !request.session.userId){
        next();

    }
    else{
        response.redirect('/')

    }

}