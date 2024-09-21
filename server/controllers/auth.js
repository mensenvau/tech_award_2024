const { execute } = require("uzdev/mysql");
const { fnCatch, randomCode, enCode, deCode } = require("uzdev/function");
const { smsSender } = require("uzdev/sender");

// smsSender("995441550", "Webdoc tizimidan ro'yxatdan o'tish uchun kod: 12345", (phone, status, message) => {
//     if (status == 1) return console.log("SUCCESS", phone, message);
//     console.log("ERROR", phone, message);
// });

exports.authSignUp = fnCatch(async (req, res, next) => {
    let { phone_num, first_name, last_name, birth_date } = req.body;

    let count = await getRows("SELECT * FROM sms_code WHERE phone = ? and DATEDIFF(now(),savetime) <= 2", [phone]);
    if (count.length > 20) throw new Error("BLOCK 2 DAYS");

    let code = randomCode(5);
    let ins = await execute("insert into sms_code (phone_num, code) values (?, ?)", [phone_num, code]);

    smsSender(phone_num, `Webdoc tizimidan ro'yxatdan o'tish uchun kod: ${code}`);

    return res.json({
        message: "Ok",
        token: enCode({ id: ins.insertId, type: "sms" }),
    });
});

exports.authSignIn = fnCatch(async (req, res, next) => {
    let { phone_num } = req.body;

    let count = await getRows("SELECT * FROM sms_code WHERE phone = ? and DATEDIFF(now(),savetime) <= 2", [phone]);
    if (count.length > 20) throw new Error("BLOCK 2 DAYS");

    let code = randomCode(5);
    let ins = await execute("insert into sms_code (phone_num, code) values (?, ?)", [phone_num, code]);

    smsSender(phone_num, `Webdoc tizimidan ro'yxatdan o'tish uchun kod: ${code}`);

    return res.json({
        message: "Ok",
        token: enCode({ id: ins.insertId, type: "sms" }),
    });
});

exports.authCode = fnCatch(async (req, res, next) => {
    console.log("auth");
});
