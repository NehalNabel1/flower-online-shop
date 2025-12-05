export const isAdmin = (request, response, next) => {
    if (request.session.isAdmin) {
        next();
    }
    else {
        response.redirect('/not-admin');
    }
};
