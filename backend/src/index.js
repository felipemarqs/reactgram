require("dotenv").config();

const express = require('express');
const path = require('path');
const cors = require('cors');

//Porta
const port = process.env.PORT;
const app = express();

 // Configuration JSON and form data
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 //Solve cors

 app.use(cors({ credentials: true , origin: `http://localhost:${port}`}));

 //Upload directory

 app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

 //db connection

 require('./config/db.js')





// Routes
const router = require('./router')
app.use(router)

app.listen(port, () => {
    console.log(`Serving is listening on port ${port}`);
})



