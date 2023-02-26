const mongoose = require('mongoose');
const dbUser =  process.env.DB_USER
const dbPassword = process.env.DB_PASS

// db password
//NzaYRfubYKzGO3nN
//connection



const conn = async () => {
    
    try {
        mongoose.set('strictQuery', true);
        dbCoon = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.pebfs79.mongodb.net/?retryWrites=true&w=majority`)
        
         
        console.log("Connected to MongoDB")

    } catch (error) {     
        console.log("Error connecting to MongoDB - Error")
        console.log(error)
    }
}


conn();

module.exports = conn;
