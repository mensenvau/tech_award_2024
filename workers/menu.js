const { client } = require("./functions/client");
const { selectMethod } = require("./functions/main");
const { loginClient, logoutClient } = require("./functions/auth");
const { loadChannelList } = require("./functions/channel");

const methods = {
    logoutClient,
    loginClient,
    loadChannelList,
};

const main = async () => {
    try {
        let name = await selectMethod();
        await methods[name](client);
    } catch (err) {
        console.log(err.message);
    }
};

main();
