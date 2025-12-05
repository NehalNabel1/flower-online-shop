export const isAuth = (request, response, next) => {
    if (request.session.userId) {
        next();
    }
    else {
        response.redirect('/login');
    }
};
export const notAuth = (request, response, next) => {
    if (!request.session.userId) {
        next();
    }
    else {
        response.redirect('/');
    }
};
