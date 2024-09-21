const { client } = require("./functions/client");
const { entityToMarkdown } = require("./functions/main");
const { mongodb } = require("./database/mongodb");
const { Message } = require("./database/message");
const { messageToJobs } = require("./functions/jobs");

let main = async () => {
    await mongodb();
    client.on("update", async (update) => {
        try {
            /* i will be need update: updateMessageEdited */
            if (update._ == "updateNewMessage" && update.message.sender_id._ == "messageSenderChat") {
                let msg = update.message;
                let res = await new Message({ msg_id: msg.id, chat_id: msg.chat_id, super_group_id: msg.sender_id.chat_id, content: entityToMarkdown(msg.content?.text || msg.content?.caption) }).save();
                await messageToJobs(res._id);
            }
        } catch (err) {
            console.log(`Message: ${err.message}, Code: main`);
        }
    });
};

main();
