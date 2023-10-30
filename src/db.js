import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/bdCP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a la base de datos:"));

// export default db;