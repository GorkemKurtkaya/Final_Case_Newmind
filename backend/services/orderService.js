import Order from "../models/ordermodel.js";
import * as kafka from "../utils/kafka.js";
import Product from "../models/productmodel.js";


const createOrderService = async (orderData) => {
    const { products } = orderData;

    let totalAmount = 0;

    for (const item of products) {
        const product = await Product.findById(item.productId);

        if (!product) {
            throw new Error(`Ürün bulunamadı: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
            throw new Error(`Üründe yeterli stok yok: ${product.name}`);
        }

        totalAmount += product.price * item.quantity;
    }

    // Stokları Güncelleme Kısmı burası
    for (const item of products) {
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: -item.quantity },
        });
    }

    orderData.amount = totalAmount;

    const newOrder = new Order(orderData);
    await newOrder.save();

    if (newOrder) {
        kafka.sendMessage("order", `Yeni Sipariş Oluşturuldu: ${newOrder._id}`);
        return true;
    } else {
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