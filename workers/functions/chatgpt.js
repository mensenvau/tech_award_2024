require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { default: OpenAI } = require("openai");
const { template } = require("./temp");
const { tryCatch } = require("uzdev/function");
const { execute } = require("uzdev/mysql");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const jobMain = async (result) => {
    const { is_job_vacancy, message_id, job_name, company_name, job_type, job_salary, job_descriptions, input_language } = result;
    const ins = await execute("INSERT INTO jobs (is_job_vacancy, message_id, job_name, company_name, job_type, job_salary, job_descriptions, input_language) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [is_job_vacancy, message_id, job_name, company_name, job_type, job_salary, job_descriptions, input_language]);
    return ins.insertId;
};

const jobLocations = async (job_id, result) => {
    const { country_code, country, city, full_address, is_remote_work } = result?.job_location;
    await execute("INSERT INTO job_locations (job_id, country_code, country, city, full_address, is_remote_work) VALUES (?, ?, ?, ?, ?, ?) ", [job_id, country_code, country, city, full_address, is_remote_work]);
};

const contactInformations = async (job_id, result) => {
    for (let item of result.contact_informations) {
        await execute("INSERT INTO contact_informations (job_id, type, value) VALUES (?, ?, ?)", [job_id, item.type, item.value]);
    }
};

const jobResponsibilities = async (job_id, result) => {
    for (let item of result.job_responsibilities) {
        execute("INSERT INTO job_responsibilities (job_id, responsibility) VALUES (?, ?)", [job_id, item]);
    }
};

const requirementSkills = async (job_id, result) => {
    for (let item of result.requirement_skills) {
        execute("INSERT INTO requirement_skills (job_id, skill) VALUES (?, ?)", [job_id, item]);
    }
};

const occupations = async (job_id, result) => {
    for (let item of result.occupations) {
        execute("INSERT INTO occupations (job_id, occupation) VALUES (?, ?)", [job_id, item]);
    }
};

const additionalComments = async (job_id, result) => {
    for (let item of result.additional_comments) {
        execute("INSERT INTO additional_comments (job_id, comment) VALUES (?, ?)", [job_id, item]);
    }
};

const searchKeywords = async (job_id, result) => {
    for (let item of result.search_keywords) {
        execute("INSERT INTO search_keywords (job_id, keyword) VALUES (?, ?)", [job_id, item]);
    }
};

const messageConvertToJson = tryCatch("messageConvertToJson", async (message) => {
    const content = template.replace("#message_content", message.content);

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

    const result = { ...JSON.parse(job.choices[0].message.content), message_id: message.id };

    const job_id = await jobMain(result);
    await Promise.all([jobLocations(job_id, result), contactInformations(job_id, result), jobResponsibilities(job_id, result), requirementSkills(job_id, result), occupations(job_id, result), additionalComments(job_id, result), searchKeywords(job_id, result)]);

    fs.writeFileSync(path.join(__dirname, "../cache/data", `${job_id}.json`), JSON.stringify(result));
});

module.exports = { messageConvertToJson };
