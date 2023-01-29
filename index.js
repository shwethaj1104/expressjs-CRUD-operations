const express = require('express');
const path = require('path');

const logger = require('./middleware/logger');

const app = express();


//Init middleware
app.use(logger)
//using routes for cleaning up and reusing the routes
app.use('/api/members',require('./routes/api/members'))

//using middleware called "use"--> to set static folder-->we won't use this in our apps since it is static
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server listening to port number : ${PORT}`)
})





//to show a file on path / -->but every time we can't hardcode the path so we use middleware-->use
// app.get('/',(req,res)=>{
//     // res.send('<h1>Hello world</h1>')
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })