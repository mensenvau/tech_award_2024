const { execute, } = require("uzdev/mysql");
const { fnCatch, randomCode, enCode, deCode } = require("uzdev/function");
const { smsSender } = require("uzdev/sender");

// smsSender("995441550", "Jobgram tizimidan ro'yxatdan o'tish uchun kod: 12345", (phone, status, message) => {
//     if (status == 1) return console.log("SUCCESS", phone, message);
//     console.log("ERROR", phone, message);
// });

exports.authSignUp = fnCatch(async (req, res, next) => {
    let { phone_number, first_name, last_name, birth_date } = req.body;

    let count = await execute("SELECT * FROM sms_code WHERE phone_num = ? and DATEDIFF(now(),savetime) <= 2", [phone_number]);
    if (count.length > 20) throw new Error("BLOCK 2 DAYS");

    let code = randomCode(5);
    let ins = await execute("insert into sms_code (phone_num, code) values (?, ?)", [phone_number, code]);

    let data = await execute("select * from users where phone_num = ?", [phone_number]);
    if (!data.length) {
        let res = await execute("insert into users(phone_num, first_name, last_name, birth_date) values (?,?,?,?)", [phone_number, first_name, last_name, birth_date])
        console.log(res);
    }

    smsSender(phone_number, `Jobgram tizimidan ro'yxatdan o'tish uchun kod: ${code}`);

    return res.json({
        message: "Ok",
        token: enCode({ id: ins.insertId, user_id: data[0].id || res.insertId, code, type: "sms" }),
    });
});

exports.authSignIn = fnCatch(async (req, res, next) => {
    let { phone_num } = req.body;

    let count = await getRows("SELECT * FROM sms_code WHERE phone = ? and DATEDIFF(now(),savetime) <= 2", [phone]);
    if (count.length > 20) throw new Error("BLOCK 2 DAYS");

    let code = randomCode(5);
    let ins = await execute("insert into sms_code (phone_num, code) values (?, ?)", [phone_num, code]);

    smsSender(phone_num, `Jobgram tizimidan ro'yxatdan o'tish uchun kod: ${code}`);

    return res.json({
        message: "Ok",
        token: enCode({ id: ins.insertId, code, type: "sms" }),
    });
});

exports.verifyPhoneCode = fnCatch(async (req, res, next) => {
    let { code } = req.body;
    let token = req.headers['token']

    let obj = deCode(token);
    console.log(obj);


    if (obj?.code !== code)
        return res.json({
            message: "Please enter the valid code."
        })


    if (!code || !token) return res.json({
        message: "Please provide the code sent as sms or try to sign in again."
    })

    let userInfo = await execute("select * from users where id = ?", [obj.user_id]);

    return res.json({
        message: "Ok", userInfo: userInfo[0],
        token: enCode({ id: code, type: "auth" })
    })

});
