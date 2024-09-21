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

let messageConvertToJson = tryCatch("messageConvertToJson", async (message) => {
    let content = template.replace("#message_content", message.content);

    // const job = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: [{ type: "text", text: content }] }],
    //     temperature: 1,
    //     max_tokens: 1000,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //     response_format: { type: "json_object" },
    // });

    // { ...JSON.parse(job.choices[0].message.content), message_id: message.id }
    let result = {
        is_job_vacancy: true,
        job_name: "Atir Sovun va shampun ishchi",
        company_name: "EVERMORE CO MCHJ",
        job_location: {
            country_code: "UZ",
            country: "O'zbekiston",
            city: "Toshkent",
            full_address: "Toshkent shahri Sergili 4 tumani sugdiona kochasi 21uy (Moljal TURON UN ZAVODI - PRO KAB ZAVODI)",
            is_remote_work: false,
        },
        job_type: "Full-Time",
        job_salary: "2 500 000 - 3 500 000 som (Erkaklar uchun), 2 200 000 - 2 500 000 som (Ayollar uchun)",
        job_descriptions: "Atir Sovun va shampun ishlab chiqarishda ishchi",
        job_responsibilities: ["Maxsulot qadoqlash (ishchi) ayollarga hos", "Master-Operator Stanok ochirib yoqish qolip nastroyka qilish boyicha mutaxasis erkaklarga hos"],
        requirement_skills: ["Oylik ish tajribasiga ega bo'lish", "Yosh chegarasi 20-35", "Ish vaqti 9:00 - 18:30"],
        occupations: ["Atir Sovun va shampun ishchi", "Master-Operator Stanok"],
        additional_comments: ["Operator telefonda javob beradigan hodim emas!", "Oqishda oqidigan Studentlar ishga qabul qilinmaydi !!!"],
        contact_informations: [
            { type: "phone", value: "+998930644844" },
            { type: "phone", value: "+998977488750" },
        ],
        input_language: "uz",
        search_keywords: ["ish", "Atir Sovun", "shampun", "stanok", "mutaxasis"],
        message_id: 1,
    };

    console.log(result);
    await execute("insert into jobs (is_job_vacancy, ) values (?, ?, ?, ?", []);
    fs.writeFileSync(path.join(__dirname, "../cache/data", `${ins.insertId}.json`), JSON.stringify(job));
});

module.exports = { messageConvertToJson };
