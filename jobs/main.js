const mongodb = require("mongodb");
const dotenv = require("dotenv");
const { execute } = require("uzdev/mysql");
const { MongoClient } = mongodb;

dotenv.config();

// MongoDB connection details
console.log("Loading and configuring MongoDB connection");
const mongoUri = process.env.URI;
const mongoClient = new MongoClient(mongoUri);

async function fetchDataFromMongoDB() {
    await mongoClient.connect();
    const db = mongoClient.db("jobs");
    const collection = db.collection("jobs");
    console.log("Collecting data from MongoDB...");
    return await collection.find().toArray();
}

const jobMain = async (idx, result) => {
    const { is_job_vacancy, job_name, company_name, job_type, job_salary, job_descriptions, input_language } = result;
    const ins = await execute("INSERT INTO jobs (is_job_vacancy, message_id, job_name, company_name, job_type, job_salary, job_descriptions, input_language) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [is_job_vacancy, idx + 100, job_name, company_name, job_type, job_salary, job_descriptions, input_language]);
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

async function insertIntoMySQL(data) {
    try {
        for (let idx in data) {
            try {
                const result = data[idx];
                const job_id = await jobMain(idx, result);
                await Promise.all([jobLocations(job_id, result), contactInformations(job_id, result), jobResponsibilities(job_id, result), requirementSkills(job_id, result), occupations(job_id, result), additionalComments(job_id, result), searchKeywords(job_id, result)]);
            } catch (err) {
                console.log(err.message);
            }
        }
        console.log("Data insertion completed.");
    } catch (error) {
        console.error(`Error while connecting to MySQL: ${error.message}`);
    } finally {
        console.log("MySQL connection is closed.");
    }
}

async function main() {
    const mongoData = await fetchDataFromMongoDB();
    await insertIntoMySQL(mongoData);
}

main().catch(console.error);
