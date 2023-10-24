require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB!');
});
