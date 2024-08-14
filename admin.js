

const {kafka} = require("./client")

async function init() {
    const admin = kafka.admin()
    console.log("ADmin connecting")
    admin.connect()
    console.log("ADmin connected")

    console.log("Rider updates")

    await admin.createTopics({
        topics : [
            {
                topic:"rider-updates",
                numPartitions:2
            }
        ]
    })
    console.log("Topic created successfully")

    console.log("disconnecting admin..")
    await admin.disconnect()
}

init()


