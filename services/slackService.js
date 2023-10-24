require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.APP_TOKEN
});

async function getUserIdByName(username) {
    try {
        const result = await app.client.users.list({
            token: process.env.SLACK_BOT_TOKEN
        });
        const user = result.members.find(member => member.name === username);
        return user ? user.id : null;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}

module.exports = {
    app,
    getUserIdByName
};
    