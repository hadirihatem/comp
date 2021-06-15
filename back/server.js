const express=require('express') 
const app=express()
const connectDB=require('./connectDB')
const cors=require('cors')
const bodyParser=require('body-parser')
const path = require('path')


app.use(cors())


const userroutes=require('./routes/userroutes/user.routes')
const postroutes=require('./routes/postroutes/post.routes')
const grouperoutes=require('./routes/grouperoutes/groupe.routes')


//connect to db 
connectDB();

//middlewares
app.use(express.json());
app.use(bodyParser.json())
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({extended:false}))
 //define Routes   

 userroutes(app)
 postroutes(app)
 grouperoutes(app)
 



/* app.use("/api", require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/post',require('./routes/Post')) */


const port =process.env.port || 4000 ;
app.listen(port,()=> console.log(`server is runing on port :${port}`))