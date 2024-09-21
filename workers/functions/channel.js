const fs = require("fs");
const path = require("path");
const { execute } = require("uzdev/mysql");
const { tryCatch } = require("uzdev/function");

const loadChannelList = async (client) => {
    try {
        let chats = await client.invoke({ _: "getChats", chat_list: { _: "chatListMain" }, limit: 5000 });
        for (let i = 0; i < chats?.total_count; i++) {
            await loadChatInfo(client, chats?.chat_ids[i]);
        }
    } catch (err) {
        console.log(`Message: ${err.message}, Code: loadChannelList`);
    }
};

let loadChatInfo = async (client, chatId) => {
    try {
        let chat = await client.invoke({ _: "getChat", chat_id: chatId });
        console.log(chat);
        if (chat.type._ == "chatTypeSupergroup") {
            loadSupergroupInfo(client, chat);
        }
    } catch (err) {
        console.log(`Message: ${err.message}, Code: loadChatInfo`);
    }
};

let loadSupergroupInfo = tryCatch("loadSupergroupInfo1", async (client, chat) => {
    let [info, group] = await Promise.all([client.invoke({ _: "getSupergroupFullInfo", supergroup_id: chat.type.supergroup_id }), client.invoke({ _: "getSupergroup", supergroup_id: chat.type.supergroup_id })]);
    await letGetFile(client, chat);

    await execute("INSERT INTO channel (chat_id, super_group_id, username, title, description, member_count) VALUES (?, ?, ?, ?, ?, ?, ?)", [
        chat.id,
        chat.type.supergroup_id,
        chat.title,
        group.usernames.editable_username,
        info.description,
        info.member_count,
    ]);
});

letGetFile = async (client, chat) => {
    try {
        let file = await client.invoke({ _: "downloadFile", file_id: chat.photo.small.id, priority: 1 });
        fs.copyFileSync(file.local.path, path.join(__dirname, "../../server/public/profile", `chat${chat.id}.jpg`));
    } catch (err) {
        console.log(`Message: ${err.message}, Code: letGetFile`);
    }
};

module.exports = { loadChannelList };
