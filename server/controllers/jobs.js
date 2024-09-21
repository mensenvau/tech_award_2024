const { execute } = require("uzdev/mysql");
const { fnCatch } = require("uzdev/function");

exports.getListJobs = fnCatch(async (req, res, next) => {
    let title = req.query.title;
    let location = req.query.location;
    let page = parseInt(req.query.page || 0);

    let where_str = `is_job_vacancy = 1`;
    let where_arr = [];

    if (title) {
        where_str += ` and (company_name like ? or job_name like ?)`;
        where_arr = [...where_arr, `%${title}%`, `%${title}%`];
    }

    if (location) {
        where_str += ` and (city like ? or country like ?)`;
        where_arr = [...where_arr, `%${location}%`, `%${location}%`];
    }

    let [jobs, cnt] = await Promise.all([execute(`select * from vw_jobs where ${where_str} limit ?, 20`, [...where_arr, page * 20]), execute(`select count(*) as count from vw_jobs where ${where_str}`, [...where_arr], 1)]);
    return res.json({ jobs, page, total: Math.ceil(cnt.count / 20) || 0 });
});

exports.getListChannels = fnCatch(async (req, res, next) => {
    let channels = await execute("select * from channels where is_active = 1 order by member_count desc");
    return res.json({ channels });
});

exports.getJobById = fnCatch(async (req, res, next) => {
    let job_id = req.params.id;
    let [job, locations, contact, responsibilities, requirement_skills, occupations, comments] = await Promise.all([
        execute("select * from jobs where id = ?", [job_id], 1),
        execute("select * from job_locations where job_id = ?", [job_id]),
        execute("select * from contact_informations where job_id = ?", [job_id]),
        execute("select * from job_responsibilities where job_id = ?", [job_id]),
        execute("select * from requirement_skills where job_id = ?", [job_id]),
        execute("select * from occupations where job_id = ?", [job_id]),
        execute("select * from additional_comments where job_id = ?", [job_id]),
    ]);

    res.json({ job, locations, contact, responsibilities, requirement_skills, occupations, comments });
});
