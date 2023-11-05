import mongoose from "mongoose";

(async () => {
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/bdCP", {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`Connection to database ${db.connection.name} successful`)

        db.connection.on('error', err => {
            console.log(`Database connection error: ${err}`);
        });

        db.connection.on('disconnected', () => {
            console.log('Database disconnected');
        });
    } catch(err) {
        console.log('Couldn\'t connect to database', err);
    }
})();
//export default db;