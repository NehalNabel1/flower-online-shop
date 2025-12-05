export const setIsAdmin = (request, response, next) => {
    response.locals.isAdmin = request.session.isAdmin ?? false;
    next();
};
