import { createClient } from 'redis';

async function redisCon(){
    try{
    const client = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
    console.log('redise baglandik');
    }catch(e){
        console.log(e,'error')
    }
}

export{redisCon}