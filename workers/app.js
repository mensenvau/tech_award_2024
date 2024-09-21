const { client } = require("./functions/client");
const { entityToMarkdown } = require("./functions/main");
const { messageConvertToJson } = require("./functions/chatgpt");
const { execute } = require("uzdev/mysql");
const { tryCatch } = require("uzdev/function");

let main = async () => {
    client.on(
        "update",
        tryCatch("on update", async (update) => {
            if (update._ == "updateNewMessage" && update.message.sender_id._ == "messageSenderChat") {
                let msg = update.message;
                let content = entityToMarkdown(msg.content?.text || msg.content?.caption);
                let ins = await execute("insert into messages (msg_id, chat_id, group_id, content) values (?, ?, ?, ?)", [msg.id, msg.chat_id, msg.sender_id.chat_id, content]);
                messageConvertToJson({ id: ins.insertId, content });
            }
        })
    );
};

main();
