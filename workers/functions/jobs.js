require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { default: OpenAI } = require("openai");
const { template } = require("./temp");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

let messageToJobs = async (id) => {
    try {
        let message = await Message.findById(id);
        let content = template.replace("#message_content", message.content);

        const job = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: [{ type: "text", text: content }] }],
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: { type: "json_object" },
        });

        console.log({ ...JSON.parse(job.choices[0].message.content), message_id: message._id });
        fs.writeFileSync(path.join(__dirname, "../cache/data", `${res._id}.json`), JSON.stringify(job));
    } catch (err) {
        console.log(`Message: ${err.message}, Code: messageToJobs`);
    }
};

module.exports = { messageToJobs };
