import * as ProductModel from '../models/products.model.js';
export const product_display_get = async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) {
            return response.status(400).send('Product ID is required');
        }
        const product = await ProductModel.getProductsById(id);
        response.render('product', { product, pageTitle: 'Product' });
    }
    catch (error) {
        console.log('Error fetching product:', error);
        return response.status(500).send('Server Error');
    }
};
export const product_displayFirst_get = (request, response) => {
    ProductModel.getFirstProduct().then(product => {
        response.render('product', { pageTitle: 'Product', product });
    });
};
