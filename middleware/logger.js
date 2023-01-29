const moment = require('moment');


//logging requested url with date and time-->using 3rd part library called moment for date and time
const logger =(req,res,next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next()
}

module.exports=logger;