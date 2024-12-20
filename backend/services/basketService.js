
import * as redis from "../utils/redis.js";
import { createClient } from 'redis';




// Sepete ürün ekleme
async function addToCart(params) {
    const { userId, product } = params;
    const cartKey = userId;
    try {
        const client = await createClient()
            .on('error', err => console.log('Redis Client Error', err))
            .connect();

        const isConnected = client.isOpen;
        if (!isConnected) {
            throw new Error("Redis connection failed");
        }

        const existingCartString = await client.get(cartKey);
        let existingCart = [];

        if (existingCartString) {
            try {
                existingCart = JSON.parse(existingCartString);
                if (!Array.isArray(existingCart)) {
                    existingCart = [];
                }
            } catch (parseError) {
                existingCart = [];
            }
        }

        const existingProductIndex = existingCart.findIndex(
            item => item.productId === product.productId
        );

        if (existingProductIndex > -1) {
            existingCart[existingProductIndex].quantity += product.quantity;
        } else {

            existingCart.push(product);
        }

        await client.set(cartKey, JSON.stringify(existingCart));

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

// Sepeti getirme
async function getBasket(params){
    const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        
    const cartKey = params.userId;

    try{

        const value = await client.get(cartKey)
        return JSON.parse(value)
    }catch(e){
        console.log(e);
    }
}

// Sepeti silme
async function removeCart(params, res){
    const { userId } = params; 
    const cartKey = String(userId);  
    
    try {
        const client = await createClient()
            .on('error', err => console.log('Redis Client Error', err))
            .connect();
        const result = await client.del(cartKey);
        if(result === 0){
            return res.status(404).send({message: "Ürün bulunamadı"});
        }
        
        return res.status(200).send({message: "Ürün başarıyla silindi"});
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: "Internal Server Error"});
    }
}

// Sepetteki ürünü güncelleme
const updateCartItem = async (params,res) => {
    const { userId, productId, action } = params;

    const cartKey = String(userId);

    try {
        const client = await createClient()
            .on('error', (err) => console.log('Redis Client Error', err))
            .connect();

        let cart = await client.get(cartKey);

        if (!cart) {
            return { status: 404, message: "Sepet bulunamadı" };
        }

        cart = JSON.parse(cart);

        console.log("Sepet içeriği:", cart);

        const productIndex = cart.findIndex(item => item.productId === productId);

        if (productIndex === -1) {
            return { status: 404, message: "Ürün bulunamadı" };
        }

        let productQuantity = cart[productIndex].quantity;

        if (action === "increment") {
            productQuantity += 1;
            cart[productIndex].quantity = productQuantity;
        } else if (action === "decrement") {
            if (productQuantity > 1) {
                productQuantity -= 1;
                cart[productIndex].quantity = productQuantity;
            } else {
                cart.splice(productIndex, 1);
                if (cart.length === 0) {
                    await client.del(cartKey);
                    return { status: 200, message: "Sepet başarıyla boşaltıldı" };
                }
            }
        } else if (action === "remove") {
            cart.splice(productIndex, 1);
            if (cart.length === 0) {
                await client.del(cartKey);
                return { status: 200, message: "Sepet başarıyla boşaltıldı" };
            }
        } else {
            return { status: 400, message: "Geçersiz işlem türü" };
        }
        await client.set(cartKey, JSON.stringify(cart));

        return { status: 200, message: `Ürün başarıyla güncellendi: ${action}` };
    } catch (e) {
        console.log(e);
        return { status: 500, message: "Internal Server Error" };
    }
};





export {addToCart,getBasket,removeCart,updateCartItem}