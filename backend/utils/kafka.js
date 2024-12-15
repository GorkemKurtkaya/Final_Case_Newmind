import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'my-kafka-producer2',
    brokers:['kafka:9092']

    // LOCALDE ÇALIŞTIRMAK İÇİN AŞAĞIDAKİ KODU KULLANINIZ
    // brokers:['localhost:9092']
})

const producer = kafka.producer()

async function sendMessage(topic,message){
    await producer.connect()
    await producer.send({
        topic: topic,
        messages:[
            { value : message},
        ],
    })
}

export {
    sendMessage
}