import * as orderService from "../services/orderService.js";
import logger from "../utils/logger.js";


// Sipariş Oluşturma
const createOrder = async (req, res) => {
    logger.info("Sipariş Oluşturma İşlemi");
    if (req.user.role !== "user" && req.user.role !== "admin") {
        return res.status(403).json({ message: "Yetkisiz Kullanıcı / Lütfen Giriş Yapınız!" });
    }
    if (!req.body.products || req.body.products.length === 0) {
        return res.status(400).json({ message: "Sepetiniz boş" });
    }
    if (!req.body.address) {
        return res.status(400).json({ message: "Adres bilgileri eksik" });
    }

    try {
        logger.info("Sipariş Oluşturuluyor");
        const savedOrder = await orderService.createOrderService(req.body);
        res.status(200).json({ 
            message: "Sipariş başarıyla oluşturuldu!",
            order: savedOrder // Order objesini response'a ekledik
        });
        console.log("Sipariş Oluşturuldu:", savedOrder._id);
        logger.info("Sipariş Oluşturuldu");
    } catch (err) {
        res.status(400).json({ message: err.message });
        logger.error("Sipariş Oluşturulurken Hata Oluştu:", err);
    }
};


// Sipariş Güncelleme
const updateOrder = async (req, res) => {
    try {
        logger.info("Sipariş Güncelleme İşlemi");
        const updatedOrder = await orderService.updateOrderService(req.params.id, req.body);
        res.status(200).json(updatedOrder);
        console.log("Sipariş Güncellendi");
        logger.info("Sipariş Güncellendi");
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.log("error", "Sipariş Güncellenirken Hata Oluştu:", err);
    }
};


// Sipariş Silme
const deleteOrder = async (req, res) => {
    try {
        logger.info("Sipariş Silme İşlemi");
        const message = await orderService.deleteOrderService(req.params.id);
        res.status(200).json({ message });
        console.log("Sipariş Silindi");
        logger.info("Sipariş Silindi");
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.error("Sipariş Silinirken Hata Oluştu:", err);
    }
};


// Sipariş Getirme
const getOrder = async (req, res) => {
    try {
        logger.info("Sipariş Getirme İşlemi");
        const order = await orderService.getOrderService(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.error("Sipariş Getirilirken Hata Oluştu:", err);
    }
};


// Kullanıcı Siparişlerini Getirme
const getUserOrders = async (req, res) => {
    try {
        logger.info("Kullanıcı Siparişlerini Getirme İşlemi");
        const orders = await orderService.getUserOrdersService(req.params.userId);
        res.status(200).json(orders);
        logger.info("Kullanıcı Siparişleri Getirildi");
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.error("Kullanıcı Siparişleri Getirilirken Hata Oluştu:", err);
    }
};


// Tüm Siparişleri Getirme
const getAllOrders = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    try {
        logger.info("Tüm Siparişleri Getirme İşlemi");
        const orders = await orderService.getAllOrdersService();
        res.status(200).json(orders);
        logger.info("Tüm Siparişler Getirildi");
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.error("Tüm Siparişler Getirilirken Hata Oluştu:", err);
    }
};


// Sipariş Gelirini Getirme
const getOrderIncome = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    try {
        const income = await orderService.getOrderIncomeService();
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Sipariş Durumu Güncelleme
const updateOrderStatus = async (req, res) => {
    try {
        logger.info("Sipariş Durumu Güncelleme İşlemi");
        const updatedOrder = await orderService.updateOrderStatusService(req.params.id, req.body.status);
        res.status(200).json(updatedOrder);
        console.log("Sipariş Durumu Güncellendi");
        logger.info("Sipariş Durumu Güncellendi");
    } catch (err) {
        res.status(500).json({ message: err.message });
        logger.error("Sipariş Durumu Güncellenirken Hata Oluştu:", err);
    }
}

export {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getUserOrders,
    getAllOrders,
    getOrderIncome,
    updateOrderStatus
};
