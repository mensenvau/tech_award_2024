require("dotenv").config();

const tdl = require("tdl");
const path = require("path");

tdl.configure({
    tdjson: process.platform === "darwin" ? "libtdjson.dylib" : "libtdjson.so",
    libdir: path.join(__dirname, "../td/build"),
    verbosityLevel: 1,
    useOldTdjsonInterface: false,
    receiveTimeout: 10,
});

let client = tdl.createClient({
    apiId: process.env.APP_ID,
    apiHash: process.env.APP_HASH,
    databaseDirectory: path.join(__dirname, "../cache/db"),
    filesDirectory: path.join(__dirname, "../cache/fs"),
});

module.exports = { client };
