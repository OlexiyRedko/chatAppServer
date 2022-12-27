
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const TokenService = require("./services/token-service")
const BdService = require("./services/bd-service")

exports.getToken = function(user) {
    return jwt.sign(user, '1111',{expiresIn: 3600});
};

exports.verifyUser = async (req, res, next) =>{
    const resp = TokenService.checkToken(req)
    if(resp===0){
        err = new Error('You are not authorized!');
        err.status = 403;
        return next(err);
    }
    const user = await BdService.findUserById(resp.id)
    console.log(resp.id)
    console.log(user)
    req.user = user
    return next();
}

