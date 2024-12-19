import * as basketService from "../services/basketService.js";
import * as redis from "../utils/redis.js";


const basketController = {
    addToBasket: async(req,res)=>{
        const {userId,product} = req.body;
        if(!userId){
            return res.status(502).send({message:"userId is required"})
        }
        if(!product.productId){
            return res.status(502).send({message:"productId is required"})
        }
        try{
            const response = await basketService.addToCart({
                userId, 
                product: {
                    productId: product.productId,
                    quantity: product.quantity || 1
                }
            });
            res.status(200).send({response: true})
        }catch(e){
            console.log(e,'error')
            res.status(500).send({message: "Error adding to basket"})
        }
    },
    getBasket: async(req,res)=>{
        try{
            const response = await basketService.getBasket(req.params)

            if(response === null){
                return res.status(404).send({message:"Sepet bulunamadı"})
            }else{
                res.status(200).send({response:response})
            }
            
        }catch(e){
            console.log(e,'error')
        }
        
    },
    delete: async(req,res)=>{
        const {userId} = req.params;
        if(!userId){
            return res.status(502).send({message:"userId is required"})
        }
        try{
            const response = await basketService.removeCart({ userId }, res)
            console.log(response,'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
        
    },
    updateCartItem: async (req, res) => {
        const { userId, productId, action } = req.body;

        if (!userId) {
            return res.status(400).send({ message: "userId is required" });
        }
        if (!productId) {
            return res.status(400).send({ message: "productId is required" });
        }
        if (!action || !["increment", "decrement", "remove"].includes(action)) {
            return res.status(400).send({ message: "Valid action is required (increment, decrement, remove)" });
        }

        try {
            const result = await basketService.updateCartItem({ userId, productId, action });
            return res.status(result.status).send({ message: result.message });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    },
}


export default basketController;