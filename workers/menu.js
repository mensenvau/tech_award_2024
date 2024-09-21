const { client } = require("./functions/client");
const { tryCatch } = require("uzdev/function");
const { selectMethod } = require("./functions/main");
const { loginClient, logoutClient } = require("./functions/auth");
const { loadChannelList } = require("./functions/channels");

const methods = { logoutClient, loginClient, loadChannelList };

const main = tryCatch("main", async () => {
    let name = await selectMethod();
    await methods[name](client);
});

main();
