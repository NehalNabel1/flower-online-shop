import mongoose from 'mongoose';
const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true };
const cartSchema = new mongoose.Schema({
    name: requiredString,
    price: requiredNumber,
    amount: requiredNumber,
    userId: requiredString,
    productId: requiredString,
    timeStamp: { type: Date, default: Date.now(), required: false }
});
const CartItem = mongoose.model('Cart', cartSchema);
export const addNewItem = async (data) => {
    try {
        const findItem = await CartItem.findOneAndUpdate({ userId: data.userId, productId: data.productId }, { timeStamp: Date.now(), $inc: { amount: data.amount } }, { new: true });
        if (!findItem) {
            const item = new CartItem(data);
            await item.save();
            return item;
        }
        return findItem;
    }
    catch (error) {
        console.log('Error Add new item : ', error);
        throw error;
    }
};
export const getItemByUser = async (userId) => {
    try {
        const items = await CartItem.find({ userId }, {}, { sort: { timeStamp: 1 } }).lean();
        return items;
    }
    catch (error) {
        console.log('Error Get Item item : ', error);
        throw error;
    }
};
export const getItemByCartId = async (cartId) => {
    try {
        const item = await CartItem.findById(cartId).lean();
        return item;
    }
    catch (error) {
        console.log('Error Get Item by cartId  : ', error);
        throw error;
    }
};
export const getAllItemsByUserId = async (userId) => {
    try {
        const items = await CartItem.find({ userId: userId }).lean();
        console.log(items);
        return items;
    }
    catch (error) {
        console.log('Error Get Item by cartId  : ', error);
        throw error;
    }
};
export const editItemAmount = async (cartId, updatedData) => {
    try {
        const resultObj = await CartItem.updateOne({ _id: cartId }, updatedData);
        return resultObj;
    }
    catch (error) {
        console.log('Error Get Item item : ', error);
        throw error;
    }
};
export const deleteItemFromCart = async (cartId) => {
    try {
        const result = await CartItem.findByIdAndDelete(cartId).lean();
        return result; //if null no cart matches
    }
    catch (error) {
        console.log('Error Get Item item : ', error);
        throw error;
    }
};
export const ClearCart = async (userId) => {
    try {
        const result = await CartItem.deleteMany({ userId }).lean();
        return result;
    }
    catch (error) {
        console.log('Error Get Item item : ', error);
        throw error;
    }
};
