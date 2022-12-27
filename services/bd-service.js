const mysqlP = require('mysql2/promise')
const mysql = require('mysql')



class BdService {
    async createPromiseConnection(){
        const conn = await mysqlP.createConnection({
            host:"localhost",
            user:"user1",
            database:"info_db",
            password:"1111"
        })
        return conn
    }
    
    createConnection(){
        const conn = mysql.createConnection({
            host:"localhost",
            user:"user1",
            database:"info_db",
            password:"1111"
        })
        return conn
    }

    async findUserById(id){
        const conn = await this.createPromiseConnection()
        const query = "SELECT * FROM user_ids WHERE id =" + mysql.escape(id);
        const [rows, fields] = await conn.execute(query)
        conn.end()
        return rows[0]
    };

    async findUser(user){
        const conn = await this.createPromiseConnection()
        const value = user.email
        const query = "SELECT * FROM user_ids WHERE email =" + mysql.escape(value);
        const [rows, fields] = await conn.execute(query)
        conn.end()
        return rows
    };

    async createUser(user){
        const conn = this.createConnection()
        console.log("creating user")
        const query = "INSERT INTO user_ids (email, password) VALUES ?"
        const values = [[user.email, user.password]]
        conn.query(query, [values])
        conn.commit()
        conn.end()
        return user
    }

    async getUserInfo(id){
        const conn = await this.createPromiseConnection()
        const query = "SELECT * FROM user_info WHERE id =" + mysql.escape(id);
        const [rows, fields] = await conn.execute(query)
        conn.end()
        return rows[0]
    }


}

module.exports = new BdService();