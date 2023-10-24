require("dotenv").config();
const { getUserIdByName } = require('../services/slackService');
const { saveMessage } = require('../services/messageService');
const { app } = require('../services/slackService');


async function sendMessageCommand({ command, ack, say }) {
    await ack();

    const [username, ...messageParts] = command.text.split(' ');
    const message = messageParts.join(' ');

    if (!username) {
        say("Asegúrate de escribir el usuario y el mensaje ;)");
        throw new Error("UserId is required");
    }
    
    const userID = await getUserIdByName(username.replace("@", ""));

    if (!userID) {
        return say("Nombre de usuario no válido.");
    }

    if (!message) {
        say("Asegúrate de escribir el mensaje ;)");
        throw new Error("Message text is required");
    }

    if (message.length > 500) {
        return say("Tu mensaje es demasiado largo. Por favor, reduce su tamaño y vuelve a intentarlo.");
    }


    try {
        const result = await app.client.users.info({
            token: process.env.SLACK_BOT_TOKEN,
            user: userID
        });

        if (!result.user) {
            return say("ID del usuario no válido.");
        }

        await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: userID,
            text: message
        });

        await saveMessage('Bot', userID, message);

        return say(`Mensaje enviado a <@${userID}> con éxito!`);
    } catch (error) {
        console.error(error);

        if (error.data && error.data.error === 'ratelimited') {
            return say("Hemos alcanzado el límite de solicitudes. Por favor, inténtalo de nuevo más tarde.");
        }

        return say("Hubo un error al enviar el mensaje.");
    }
}

module.exports = sendMessageCommand;
