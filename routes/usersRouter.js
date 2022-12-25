const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const TokenService = require('../services/token-service');
const UserService = require('../services/user-service')

const bodyParser = require('body-parser');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/getall', authenticate.verifyUser, function(req, res, next) {
  res.json(req.user.id)
});



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
