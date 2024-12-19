import{
    createOrderService,
    updateOrderService,
    deleteOrderService,
    getOrderService,
    getUserOrdersService,
    getAllOrdersService,
    getOrderIncomeService
} from "../services/orderService.js";



const createOrder = async (req, res) => {
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
        const savedOrder = await createOrderService(req.body);
        res.status(200).json({ 
            message: "Sipariş başarıyla oluşturuldu!",
            order: savedOrder // Order objesini response'a ekledik
        });
        console.log("Sipariş Oluşturuldu:", savedOrder._id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await updateOrderService(req.params.id, req.body);
        res.status(200).json(updatedOrder);
        console.log("Sipariş Güncellendi");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const message = await deleteOrderService(req.params.id);
        res.status(200).json({ message });
        console.log("Sipariş Silindi");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await getOrderService(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await getUserOrdersService(req.params.userId);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllOrders = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    try {
        const orders = await getAllOrdersService();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderIncome = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    try {
        const income = await getOrderIncomeService();
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getUserOrders,
    getAllOrders,
    getOrderIncome
};
