const express = require('express');
const cors = require('cors')
const Logger = require('./models/Logger');
const Messages = require('./models/Messages')

// dotenv environment variables
require('dotenv').config();

const PORT = process.env.BACK_END_PORT;
// start app
const app = express();

// cors
app.use(cors({
    origin: ["http://localhost:1550", "http://localhost:1550",],
    optionsSuccessStatus: 200
}));

// app use middlewares (for public folder, working with json request)
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// waiting error messages!  
app.use("/", (err, req, res, next) => {
    Logger.error(err.message, "error");
    
    res.status(400).json({successs:0, message:Messages.generalError, details:err.message, data:{}});
});

// waiting all routers messages! 
app.use("/", (req, res, next) => {
    res.status(404).json({successs:0, message:Messages.pageNotFound, details:"", data:{}});
});

// start application
app.listen(PORT, ()=>console.log(`Server has started at: http://localhost:${PORT}`));
