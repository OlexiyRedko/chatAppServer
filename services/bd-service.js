const mysqlP = require('mysql2/promise')
const mysql = require('mysql')



class BdService {

    async findUserById(id){
        const conn = await mysqlP.createConnection({
            host:"localhost",
            user:"user1",
            database:"info_db",
            password:"1111"
        })
        console.log("finding user")
        const value = id
        const query = "SELECT * FROM user_ids WHERE id =" + mysql.escape(id);
        const [rows, fields] = await conn.execute(query)
        conn.end()
        return rows[0]
    };

    async findUser(user){
        const conn = await mysqlP.createConnection({
            host:"localhost",
            user:"user1",
            database:"info_db",
            password:"1111"
        })
        console.log("finding user")
        console.log(user)
        const value = user.email
        const query = "SELECT * FROM user_ids WHERE email =" + mysql.escape(value);
        const [rows, fields] = await conn.execute(query)
        conn.end()
        return rows
    };

    async createUser(user){
        const conn = mysql.createConnection({
            host:"localhost",
            user:"user1",
            database:"info_db",
            password:"1111"
        })
        console.log("creating user")
        const query = "INSERT INTO user_ids (email, password) VALUES ?"
        const values = [[user.email, user.password]]
        conn.query(query, [values])
        conn.commit()
        conn.end()
        return user
    }


}

module.exports = new BdService();