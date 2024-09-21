const { promptUser } = require("./main");

const logoutClient = (client) => {
    return client.invoke({ _: "logOut" });
};

const loginClient = async (client) => {
    await client.login(() => ({
        getPhoneNumber: (retry) => (retry ? Promise.reject("Invalid phone number") : "+998954331550"), // Promise.resolve(fnPrompt("Phone number Pls: ")),
        getAuthCode: (retry) => (retry ? Promise.resolve(promptUser("Invalid login code, try again:")) : Promise.resolve(promptUser("Login code: "))),
        getPassword: (passwordHint, retry) => (retry ? Promise.resolve(promptUser("Invalid password, try again: ")) : Promise.resolve(promptUser("Two auth password: "))),
    }));

    console.log("Me:", await client.invoke({ _: "getMe" }));
};

module.exports = {
    logoutClient,
    loginClient,
};
