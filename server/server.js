let express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('strictQuery', false);
require('dotenv').config();

let configs = require('./configs/configs');

let app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json('WELCOME:)')
})

app.listen(configs.PORT, configs.HOST, async () => {
    await mongoose.connect(configs.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`Backend server is running on port ${configs.PORT} !`);
})