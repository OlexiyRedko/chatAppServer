const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const TokenService = require('../services/token-service');
const UserService = require('../services/user-service')

const fs = require('fs')
const stream = require('stream')

const bodyParser = require('body-parser');

router.use(bodyParser.json());
const func=(req, res, next)=>{
  console.log(req.path)
}

/* GET users listing. */
router.get('/getall', authenticate.verifyUser, function(req, res, next) {
  res.json(req.user.id)
});

router.get('/getinfo/:id', authenticate.verifyUser, async (req, res, next) => {
  const user = await UserService.getUserInfo(req.params.id)
  console.log(req.params.id)
  console.log(user)
  res.json(user)
  res.end()
});

router.get('/getpicture/:picture', authenticate.verifyUser, async (req, res, next) => {
  console.log("picture"+req.params.picture)
  try{
    
    res.sendFile("C:\\node2\\Serv\\imgs\\" + req.params.picture)
  }catch(e){
    res.sendStatus(404)
    console.log(e)
  }
  
})


router.post('/signup', async (req, res, next) => { 
  res.json(await UserService.registration(req.body.email, req.body.password))
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  user = await UserService.login(req.body.email, req.body.password)
  if(user[0]){
    res.json([1, TokenService.generateTokens({id:user[1]})])
  }else{
    res.json(user)
  }
});

router.post('/logout',(req, res) => {
});

router.post('/refresh',(req, res) => {
});


module.exports = router;
