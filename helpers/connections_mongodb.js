const mongoose = require('mongoose');

const newConnection = (uri) => {

    // #connect
    const conn = mongoose.createConnection(uri);

    // #listener
    conn.on('connected',function(){
        console.log(`MongoDB ___${this.name} connected`)
    })

    conn.on("disconnected", function () {
      console.log(`MongoDB ___${this.name} disconnected`);
    });

    conn.on("error", function (err) {
      console.log(`MongoDB err ___${JSON.stringify(err)}`);
    });

    process.on('SIGINT',async function(err){
        await conn.close();
        process.exit(0);
    })

    return conn;
}

const MOB402_Connection = newConnection(process.env.URI_MONGODB_MOB402);

module.exports = {
    MOB402_Connection
}