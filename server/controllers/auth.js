const { execute, } = require("uzdev/mysql");
const { fnCatch, randomCode, enCode, deCode } = require("uzdev/function");
const { smsSender } = require("uzdev/sender");

// smsSender("995441550", "Jobgram tizimidan ro'yxatdan o'tish uchun kod: 12345", (phone, status, message) => {
//     if (status == 1) return console.log("SUCCESS", phone, message);
//     console.log("ERROR", phone, message);
// });

exports.authSignUp = fnCatch(async (req, res, next) => {
    let { phone_number } = req.body;

    let count = await execute("SELECT * FROM sms_code WHERE phone_num = ? and DATEDIFF(now(),savetime) <= 2", [phone_number]);
    if (count.length > 20) throw new Error("BLOCK 2 DAYS");

    let code = randomCode(5);
    let ins = await execute("insert into sms_code (phone_num, code) values (?, ?)", [phone_number, code]);

    console.log(phone_number, code)
    smsSender(phone_number, `Jobgram tizimidan ro'yxatdan o'tish uchun kod: ${code}`);
    
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

    smsSender(phone_num, `Jobgram tizimidan ro'yxatdan o'tish uchun kod: ${code}`);

    return res.json({
        message: "Ok",
        token: enCode({ id: ins.insertId, type: "sms" }),
    });
});

exports.verifyPhoneCode = fnCatch(async (req, res, next) => {
    let {code} = req.body;
    let token = req.headers['token']
    
        

    if(!code || !token) return res.json({
        message:"Please provide the code sent as sms or try to sign in again."
    })

    return res.json({
        message:"Ok",
        token: enCode({ id: code, type: "auth" })
    })
    
});
