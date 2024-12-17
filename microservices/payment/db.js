import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conn =() => {
    
    mongoose.connect(process.env.DB_URI,{
        dbName: "Newmind_db",
    })
    .then(() => {
        console.log("Newmind_db Veritabanına bağlandı");
    })
    .catch((err) => {
        console.log(`Veritabanına bağlanamadı, ${err}`);
    });
};


export default conn;