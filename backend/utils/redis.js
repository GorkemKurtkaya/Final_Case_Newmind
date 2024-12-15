import { createClient } from 'redis';

async function redisCon(){
    // try{
    //     let client = createClient({
    //         url: 'redis://redis:6379'
    //     });

    // client.on('error', (err) => console.log('Redis Client Error', err));

    // await client.connect();
    // console.log('redise baglandik');
    // }catch(e){
    //     console.log(e,'error')
    // }

    // LOCALDE ÇALIŞTIRMAK İÇİN AŞAĞIDAKİ KODU KULLANINIZ

    try{
        const client = await createClient()
    
        client.on('error', (err) => console.log('Redis Client Error', err));
    
        await client.connect();
        console.log('redise baglandik');
        }catch(e){
            console.log(e,'error')
        }
        
}

export{redisCon}