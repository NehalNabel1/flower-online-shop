import * as ProductModel from '../models/products.model.js';
export const product_home_get = async (request, response) => {
    try {
        console.log(request.session.userId);
        const category = request.query.category;
        let products;
        const validCategories = ['clothes', 'books', 'bags'];
        if (typeof category === 'string' && validCategories.includes(category)) {
            products = await ProductModel.getProductsByCategory(category);
        }
        else {
            products = await ProductModel.getAllProducts();
        }
        const validationErrorRaw = request.flash('validationError')[0];
        const validationError = validationErrorRaw ? JSON.parse(validationErrorRaw) : [];
        response.render('index', { products, pageTitle: 'Home', validationError });
    }
    catch (error) {
        console.log('Error fetching products:', error);
        return response.status(500).send('Server Error');
    }
};
