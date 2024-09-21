const { execute } = require("uzdev/mysql");
const { fnCatch } = require("uzdev/function");

exports.getListJobs = fnCatch(async (req, res, next) => {
    let title = req.query.title;
    let location = req.query.location;
    let page = parseInt(req.query.page) || 1;

    let where_str = `is_job_vacancy = true`;
    let where_arr = [];

    if (title) {
        where_str += ` and (title like ? or company_name like ? or job_name like ?)`;
        where_arr = [...where_arr, `%${title}%`, `%${title}%`, `%${title}%`];
    }

    if (location) {
        where_str += ` and (city like ? or country like ?)`;
        where_arr = [...where_arr, `%${location}%`, `%${location}%`];
    }

    let [jobs, cnt] = await Promise.all([execute(`select * from vw_jobs where ${where_str} limit page, 10`, [...where_arr, page * 20]), execute(`select count(*) as count from vw_jobs where ${where_str}`, [...where_arr]), 1]);

    console.log(cnt.count, where_arr, where_str);

    return res.json({ jobs, page, total: Math.ceil(cnt.count / limit) });
});

exports.getListChannels = fnCatch(async (req, res, next) => {
    try {
        let channels = await Channel.find({ is_active: true }).sort({ member_count: -1 });
        return res.json({ channels });
    } catch (err) {
        return next(new Error(JSON.stringify({ message: err.message, code: "router" })));
    }
});

exports.getJobById = fnCatch(async (req, res, next) => {
    try {
        let job = await Jobs.findById(req.params.id);
        return res.json({ job });
    } catch (err) {
        return next(new Error(JSON.stringify({ message: err.message, code: "router" })));
    }
});
