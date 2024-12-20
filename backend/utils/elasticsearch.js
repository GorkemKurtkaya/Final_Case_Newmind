import { Client } from '@elastic/elasticsearch'
import logger from '../utils/logger.js'


const esClient = new Client({
    cloud: {
        id: process.env.ELASTIC_CLOUD_ID
    },
    auth: {
        username: process.env.ELASTIC_USER,
        password: process.env.ELASTIC_PASSWORD
    }
})

// Ürünü elasticsearch'e ekleme işlemi
const addProduct = async(product) => {
    try{
        const results = await esClient.index({
            index:'products',
            body: product
        })
        await esClient.indices.refresh({index:'products'});
        return results
    }catch(e){
        logger.error(`elasticsearch e bagli add product çalışmıyor`)
    }
}

// Ürünü elasticsearch'den silme işlemi
const elasticdeleteProduct = async(id) => {
    try{
        const results = await esClient.delete({
            index:'products',
            id
        })
        await esClient.indices.refresh({index:'products'});
        return results
    }catch(e){
        logger.error(`elasticsearch e bagli add product çalışmıyor - ${e}`,)
    }
}

// Ürün arama işlemi
const searchProducts = async(text) => {
    try{
        const results = await esClient.search({
            query: {
              match: {
                title: text
              }
            }
          })
        return results.hits.hits.map((hit) => hit._source)
    }catch(e){
        logger.error(`elasticsearch e bagli add product çalışmıyor - ${e}`,)
    }
}

export { searchProducts, addProduct, elasticdeleteProduct }
