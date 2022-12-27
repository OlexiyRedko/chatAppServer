const BdService = require('./bd-service.js')
const bcrypt = require('bcrypt')

class UserService {
    async registration(email, password){
        const rows = await BdService.findUser({email:email})
        if(rows.length){
            return("user exists")
        }else{
            const user = await BdService.createUser({email:email, password:await bcrypt.hash(password, 3)})
            return(["user created", user])
        }
        
    }
    async login(email, password){
        const rows = await BdService.findUser({email:email})
        console.log("user found")
        console.log(rows)
        if(rows.length){
            if(await bcrypt.compare(password, rows[0].password)){
                return [1, rows[0].id]
            }else{
                return[0, "bad password"]
            }
        }else{
            return[0, "user not found"]
        }
    }
    async getUserInfo(id){
        const userInfo = await BdService.getUserInfo(id)
        return userInfo
    }

}

module.exports = new UserService();