
import * as redis from "../utils/redis.js";
import { createClient } from 'redis';







async function addToCart(params) {
    const { userId, product } = params;
    const cartKey = userId;
    try {
        const client = await createClient()
            .on('error', err => console.log('Redis Client Error', err))
            .connect();

        // Redis'in bağlantısını doğrula
        const isConnected = client.isOpen;
        if (!isConnected) {
            throw new Error("Redis connection failed");
        }

        // Veriyi Redis'e kaydet
        await client.set(cartKey, JSON.stringify(product));

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
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

async function removeFromCart(params, res){
    const { userId } = params;
    
    // Ensure userId is a string
    const cartKey = String(userId);  // Ensure the key is a string
    
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



// async function removeFromCart(params){
//     const {userId,productId} = params
//     const cartKey = getCartKey(userId)
//     try{
//         const result = await client.hdel(cartKey,productId)

//         if(result === 0){
//             return res.status(404).send({message:"Ürün bulunamadı"})
//         }
//         res.status(200).send({message:'Ürün sepetten silindi.'})

//     }catch(e){
//         console.log(e);
//         return false;
//     }
// }

// async function update(params){
//     const {id,name,price,color,stock} = params;
//     try{
//         const product = await mongooseBasket.findById(id);
//         product.name = name;
//         product.price = price;
//         product.color = color;
//         product.stock = stock;
//         const productSave = await product.save();
//         console.log(productSave);
//         return productSave;
//     }catch(e){
//         console.log(e);
//         return false;
//     }
// }
// async function deleleteF(params){
//     const id = params;
//     try{
//         const productDelete = await mongooseBasket.findByIdAndDelete(id);
//         return productDelete;
//     }catch(e){
//         console.log(e);
//         return false;
//     }
// }


export {addToCart,getBasket,removeFromCart}