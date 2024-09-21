const fs = require("fs");
const path = require("path");
const { execute } = require("uzdev/mysql");
const { tryCatch } = require("uzdev/function");

const loadChannelList = tryCatch("loadChannelList", async (client) => {
    await execute("truncate table channels", []);
    let chats = await client.invoke({ _: "getChats", chat_list: { _: "chatListMain" }, limit: 5000 });
    for (let i = 0; i < chats?.total_count; i++) {
        await loadChatInfo(client, chats?.chat_ids[i]);
    }
});

let loadChatInfo = tryCatch("loadChatInfo", async (client, chatId) => {
    let chat = await client.invoke({ _: "getChat", chat_id: chatId });
    if (chat.type._ == "chatTypeSupergroup") {
        loadSupergroupInfo(client, chat);
    }
});

let loadSupergroupInfo = tryCatch("loadSupergroupInfo", async (client, chat) => {
    let [info, group] = await Promise.all([client.invoke({ _: "getSupergroupFullInfo", supergroup_id: chat.type.supergroup_id }), client.invoke({ _: "getSupergroup", supergroup_id: chat.type.supergroup_id })]);
    await letGetFile(client, chat);

    await execute("insert into channels (chat_id, group_id, username, title, description, member_count) values (?, ?, ?, ?, ?, ?)", [chat.id, chat.type.supergroup_id, chat.title, group.usernames.editable_username, info.description, info.member_count]);
});

letGetFile = tryCatch("loadSupeletGetFilergroupInfo", async (client, chat) => {
    let file = await client.invoke({ _: "downloadFile", file_id: chat.photo.small.id, priority: 1 });
    fs.copyFileSync(file.local.path, path.join(__dirname, "../../server/public/profile", `chat${chat.id}.jpg`));
});

module.exports = { loadChannelList };
