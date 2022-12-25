const jwt = require('jsonwebtoken')

class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, 'secret-key', {expiresIn:'3h'})
        return(
            accessToken
        )
    }
checkToken(req){
    const token = req.headers.authorization.split(" ")[1]
    try{
        const decoded = jwt.verify(token, 'secret-key')
        const now = new Date()
        const tokenTime = new Date(decoded.exp+"000"-0)
        if(tokenTime<now){
            console.log("token expired")
            return 0
        }else{
            console.log(decoded)
            return decoded
        }
    }catch(err){
        console.log(err)
        return 0
    }
    
}

}

module.exports = new TokenService();