import Order from "../models/ordermodel.js";
import * as kafka from "../utils/kafka.js";


const createOrderService = async (orderData) => {
    const newOrder = new Order(orderData);
    newOrder.save();
    if (newOrder){
    kafka.sendMessage("order", `Yeni Sipariş Oluşturuldu: ${newOrder._id}`);
    return true;
    }else{
        return false;
    }
};


const updateOrderService = async (orderId, orderData) => {
    return await Order.findByIdAndUpdate(
        orderId,
        { $set: orderData },
        { new: true }
    );
};

const deleteOrderService = async (orderId) => {
    await Order.findByIdAndDelete(orderId);
    return "Sipariş silindi";
};

const getOrderService = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Silinmiş veya hatalı sipariş id'si");
    return order;
};

const getUserOrdersService = async (userId) => {
    return await Order.find({ userId });
};

const getAllOrdersService = async () => {
    return await Order.find();
};

const getOrderIncomeService = async () => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    return await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);
};

export {
    createOrderService,
    updateOrderService,
    deleteOrderService,
    getOrderService,
    getUserOrdersService,
    getAllOrdersService,
    getOrderIncomeService,
};