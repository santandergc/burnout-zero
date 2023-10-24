require("dotenv").config();
require('./config');
const { app } = require('./services/slackService');
const { createServer } = require('http');
const express = require('express');
const sendMessageCommand = require('./commands/sendMessage');

const server = express();

server.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.command("/enviar-mensaje", sendMessageCommand);

(async () => {
    const port = 3000;
    await app.start(process.env.PORT || port);
    console.log('Bolt app inicio!!');

    createServer(server).listen(port, () => {
        console.log(`Bolt y express en el mismo puerto ${port}!`);
    });
})();
