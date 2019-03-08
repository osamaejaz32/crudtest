const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser')
const cors = require('cors');
const productControl = require('./controllers/productControl');
const csvControl = require('./controllers/csvControl');
const notificationControl = require('./controllers/notificationControl');
const userControl = require('./controllers/userControl');
const questionControl = require('./controllers/questionControl');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({origin:'http://localhost:4200'}))
// app.use(cors({origin:'http://192.168.0.128:4200'}))
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))
const server = app.listen(3000,()=>{
    console.log('port 3000');
})

app.use('/product',productControl);
app.use('/importcsv',csvControl);
app.use('/notify',notificationControl);
app.use('/user',userControl);
app.use('/question',questionControl);
app.use('/',(req,res,next)=>{
    let response =  `
        <h1>Listening on port 3000</h1>
        <p>Use port 4200 for frontend</p>
    `;
    res.send(response)
})

