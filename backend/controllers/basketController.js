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
            const response = await basketService.addToCart(req.body)
            res.status(200).send({response:response})
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
            const response = await basketService.removeFromCart({ userId }, res)
            console.log(response,'result');
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
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
        
    }
}


export default basketController;