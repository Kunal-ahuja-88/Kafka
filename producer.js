
/*
const {kafka} = require("./client")
const readline = require('readline')

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

async function init() {
    const producer = kafka.producer()

     console.log("connecting producer")

    await  producer.connect();
    console.log("connected producer")

    rl.setPrompt('> ')
    rl.prompt();

    rl.on("line" , async function (line) {
        const [riderName , location] = line.split(" ");

        await producer.send({
            topic : "rider-updates",
            messages : [
                {   partition : location.toLowerCase() === "north" ? 0 : 1,
                    key : 'location-update' , 
                    value : JSON.stringify({name : riderName ,loc : location})}
            ]
        })
        
    }).on("close" , async () => {
        await producer.disconnect()
    })
}
init()
*/

const { kafka, Partitioners } = require("./client");

async function init() {
    const producer = kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner
    });

    console.log("connecting producer");

    await producer.connect();
    console.log("connected producer");

    rl.setPrompt('> ');
    rl.prompt();

    rl.on("line", async function (line) {
        const [riderName, location] = line.split(" ");
        const partition = location.toLowerCase() === "north" ? 0 : 1;

        console.log(`Location: ${location}, Partition: ${partition}`);

        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition: partition,
                    key: 'location-update',
                    value: JSON.stringify({ name: riderName, loc: location })
                }
            ]
        });
    }).on("close", async () => {
        await producer.disconnect();
    });
}

init();
