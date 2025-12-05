import mongoose from 'mongoose';
const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true };
const orderSchema = new mongoose.Schema({
    fName: requiredString,
    lName: requiredString,
    email: requiredString,
    city: requiredString,
    address: requiredString,
    phoneNumber: requiredString,
    status: { type: String, required: true, default: "Pending" },
    //userId  : {type : mongoose.Schema.ObjectId , required :true},
    userId: { type: String, required: true },
    items: [{
            name: requiredString,
            price: requiredNumber,
            amount: requiredNumber,
            userId: requiredString,
            productId: requiredString,
            timeStamp: { type: Date, required: false }
        }],
    totalPrice: requiredNumber,
    createdDate: { type: Date, required: false, default: Date.now }
});
const Order = mongoose.model('order', orderSchema);
export const addNewOrder = async (data) => {
    try {
        const order = new Order(data);
        const savedOrder = await order.save();
        return savedOrder;
    }
    catch (error) {
        console.log('Error make order : ', error);
        throw error;
    }
};
export const getOrders = async (userId) => {
    try {
        const orders = await Order.find({ userId }).sort({ createdDate: -1 });
        return orders;
    }
    catch (error) {
        console.log('Error make order : ', error);
        throw error;
    }
};
export const deleteOrder = async (orderId) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ _id: orderId });
        return deletedOrder;
    }
    catch (error) {
        console.log('Error delete order : ', error);
        throw error;
    }
};
export const getAllOrders = async () => {
    try {
        const orders = await Order.find().sort({ createdDate: -1 }).lean();
        return orders;
    }
    catch (error) {
        console.log('Error make order : ', error);
        throw error;
    }
};
export const updateOrderStatus = async (orderId, status) => {
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: status }).lean();
        return order;
    }
    catch (error) {
        console.log('Error make order : ', error);
        throw error;
    }
};
