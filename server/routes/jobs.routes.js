const { getListJobs, getListChannels, getCharts, getJobById } = require("../controllers/jobs.js");
const { body } = require("uzdev/joi");

module.exports = function (app) {
    app.get("/api/jobs", getListJobs);
    app.get("/api/channels", getListChannels);
    app.get("/api/job/:id", getJobById);
};
