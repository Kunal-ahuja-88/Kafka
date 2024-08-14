const {Kafka , Partitioners} = require("kafkajs");

exports.kafka = new Kafka({
    client : 'my-app',
    brokers: ["192.168.1.9:9092"],
});

