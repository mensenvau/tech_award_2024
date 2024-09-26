/* load environment variables */
require("dotenv").config({ path: "../.env" });

/* sitemap generate */
require("./controllers/generate.js")

const express = require("express");
const cors = require("cors");
const app = express();
const { error, missed } = require("./controllers/error.js");

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/main.routes.js"));

/* error handling middleware */
app.use(error);
app.use(missed);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Status: active: \n\n - http://localhost:${PORT}\n`);
});
