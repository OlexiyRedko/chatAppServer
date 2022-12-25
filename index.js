
const http = require('http')
const https = require('https');
const fs = require('fs');
const url = require('url')
const express = require('express')
const {parse}= require('querystring')
const PORT = normalizePort(process.env.PORT || '3000');
const app = express()
const server = http.createServer(app).listen(PORT, () =>{console.log("serv running")})
const { Server } = require("socket.io");
const io = new Server({})

const userRouter =  require('./routes/usersRouter')

app.use('/users', userRouter);

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }






io.on("connection", (socket) => {
    console.log('new connection')
    socket.emit("new conn", socket.id)
})

io.listen(server)

 
// app.get("/hello", (req, res) =>{
//     console.log(req.ip)
//     res.send("wellcome!")
// })

// app.listen(PORT, (error) =>{
//     error ? console.log(error) : console.log(`listening ${PORT}`)
// })

// http.createServer((req, res) => {
//     
//     if (req.method == 'GET'){
//         let urlReq = url.parse(req.url, true)
//         console.log(urlReq.path)
//         console.log(urlReq.query)
//         if(urlReq.path=='/create'){
//             let query = `CREATE TABLE IF NOT EXISTS some_text2 (id INT AUTO_INCREMENT PRIMARY KEY, thetext TEXT, thetext2 TEXT)`
//             conn.query(query, (err, result, field) => {
//                 // console.log("err: "+err)
//                 // console.log("result: "+result)
//                 // console.log("field: "+field)
//             })
//             console.log('created')
//             res.end("created")  
//         }else if(urlReq.path=='/add'){
//             const thettext = "thetext"
//             query = `INSERT INTO some_text2 (thetext, thetext2) VALUES("text", "текст")`
//             conn.query(query, (err, result, field) => {
//                 console.log("err: "+err)
//                 console.log("result: "+result)
//                 console.log("field: "+field)
//             })
//             console.log('inserted')
//             res.end("inserted")  
//         }else if(urlReq.path=='/get'){
//             query = `SELECT * FROM some_text2`
//             conn.query(query, (err, result, field) => {
//                 console.log('returned')
//                 console.log("err: "+err)
//                 console.log("result: "+JSON.stringify(result))
//                 console.log("field: "+JSON.stringify(field))
//                 res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
//                 res.end(JSON.stringify(result))
//             }) 
            
            
//         }else{
//         res.end("you got me")
//         console.log('got conn')}
//     }else if (req.method == 'POST'){
//         let body=''
//         req.on('data', chunk => {
//             body += chunk.toString();
//         })
        
//         req.on('end', ()=>{
//             console.log('got info')
//             console.log(body)
//             let params = JSON.parse(body)
//             let urlReq = url.parse(req.url, true)
//             console.log(urlReq.path)
//             if(urlReq.path=='/singin'){
//                 if(params['id']==2){
//                     const users = [
//                         {
//                             id:1,
//                             name:"Oleksii Redko",
//                             img: "",
//                             tags: ['anime', 'art', 'music', 'drawing', 'cars', 'drifting', 'videos', 'photos'],
//                         },
//                         {
//                             id:2,
//                             name:"Егор",
//                             img: "",
//                             tags: ['anime',  'music',  'cars', 'drifting', 'videos', 'photos'],
//                         },
//                         {
//                             id:3,
//                             name:"Oleksii Redko",
//                             img: "",
//                             tags: ['anime', 'art', 'music', 'drawing', 'videos', 'photos', 'mountain climbing'],
//                         },
//                     ]
//                     const resp = JSON.stringify(users)
//                     console.log(resp)
//                     res.end(resp)
//                 }else{
//                     res.end("no, you are 2")
//                 }
                
//             }else{
//                 res.end("no")
//             }
            

//         })
        
        
//     }else{
//         console.log("error with request: only GET and POST requests permitted")
//         res.end("error with request: only GET and POST requests permitted")
//     }
// }).listen(PORT)









// let query = `CREATE TABLE IF NOT EXISTS user_pos (id INT AUTO_INCREMENT PRIMARY KEY, longtitude TEXT, latitude TEXT)`
//                 conn.query(query, (err, result, field) => {
//                     // console.log("err: "+err)
//                     // console.log("result: "+result)
//                     // console.log("field: "+field)
//                 })
//                 console.log(params)
//                 query = `INSERT INTO user_pos (longtitude, latitude) VALUES(${params.long}, ${params.lat})`
//                 conn.query(query, (err, result, field) => {
//                     console.log("err: "+err)
//                     console.log("result: "+result)
//                     console.log("field: "+field)
//                 })