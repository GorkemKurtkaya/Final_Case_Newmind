import Order from "../models/ordermodel.js";
import * as kafka from "../utils/kafka.js";
import Product from "../models/productmodel.js";


// Sipariş oluşturma
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

    // Stokları Güncelleme
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
        return newOrder; 
    } else {
        return false;
    }
};

// Sipariş güncelleme
const updateOrderService = async (orderId, orderData) => {
    return await Order.findByIdAndUpdate(
        orderId,
        { $set: orderData },
        { new: true }
    );
};

// Sipariş durumunu güncelleme
const updateOrderStatusService = async (orderId, status) => {
    return await Order.findByIdAndUpdate(
        orderId,
        { $set: { status } },
        { new: true }
    );
}


// Sipariş silme
const deleteOrderService = async (orderId) => {
    await Order.findByIdAndDelete(orderId);
    return "Sipariş silindi";
};


// Sipariş getirme
const getOrderService = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Silinmiş veya hatalı sipariş id'si");
    return order;
};


// Kullanıcıya ait siparişleri getirme
const getUserOrdersService = async (userId) => {
    return await Order.find({ userId });
};


// Tüm siparişleri getirme
const getAllOrdersService = async () => {
    return await Order.find();
};


// Sipariş gelirlerini getirme
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
    updateOrderStatusService
};