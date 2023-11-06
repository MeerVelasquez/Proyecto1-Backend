import mongoose from "mongoose";

(async () => {
    try {
        const db = await mongoose.connect("mongodb+srv://velasquezeliana482:kqKIJAAt8Rgqk7ga@cluster0.tlvkgpm.mongodb.net/bdCP?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
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