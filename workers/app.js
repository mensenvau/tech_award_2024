const { client } = require("./functions/client");
const { entityToMarkdown } = require("./functions/main");
const { msgConvertToJson } = require("./functions/chatgpt");

let main = async () => {
    client.on(
        "update",
        tryCatch("on update", async (update) => {
            /* i will be need update: updateMessageEdited */
            if (update._ == "updateNewMessage" && update.message.sender_id._ == "messageSenderChat") {
                let msg = update.message;
                let res = await new Message({ msg_id: msg.id, chat_id: msg.chat_id, super_group_id: msg.sender_id.chat_id, content: entityToMarkdown(msg.content?.text || msg.content?.caption) }).save();
                msgConvertToJson(res._id);
            }
        })
    );
};

main();
