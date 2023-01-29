const express = require('express');
const path = require('path');
const moment = require('moment');

const members = require('./members');

const app= express();

//logging requested url with date and time-->using 3rd part library called moment for date and time
const logger =(req,res,next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next()
}
//Init middleware
app.use(logger)

//get list of members
app.get('/api/members',(req,res)=>res.json(members))

//to show a file on path / -->but every time we can't hardcode the path so we use middleware-->use
// app.get('/',(req,res)=>{
//     // res.send('<h1>Hello world</h1>')
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })

//using middleware called "use"--> to set static folder-->we won't use this in our apps since it is static
app.use(express.static(path.join(__dirname,'public')))



const PORT =process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server listening to port number : ${PORT}`)
})