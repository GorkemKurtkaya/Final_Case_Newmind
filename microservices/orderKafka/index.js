const express = require('express');
const { Kafka } = require('kafkajs')

const app = require('express')();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const kafka = new Kafka({
  clientId: 'my-kafka-producer2',
  brokers:['kafka:9092'],

  // LOCALDE ÇALIŞTIRMAK İÇİN AŞAĞIDAKİ KODU KULLANINIZ
  // brokers:['localhost:9092']
  
})

const consumer = kafka.consumer({ groupId: 'my-kafka-producer2' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'order', fromBeginning: true })
  

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      createInvoice(message)
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

// Siparişi oluştur
function createInvoice(message){
  console.log(message)
  return true;
}

run().catch(console.error)


app.listen(8000, ()=>{
  console.log('orderKafka servisi çalışıyor 8000')
})

