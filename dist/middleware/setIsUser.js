export const setIsUser = (request, response, next) => {
    response.locals.isUser = request.session.userId ?? false;
    next();
};
