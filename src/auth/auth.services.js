const checkUserCredentials = require('./auth.controller')
const jwt = require('jsonwebtoken')
const  jwtSecret = require('../../config').api.jwtSecret 

const postLogin = (req, res) => {
    const {email, password} = req.body
    if(email && password){
        checkUserCredentials(email,password)
            .then(data => {
                if(data){
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email,
                        role: data.role
                    },jwtSecret)
                    res.status(200).json({message: "Correct Credentials",
                  token})
                }else{
                  res.status(401).json({message: "Incorrect Credentials"})
                }
            })
            .catch(err => res.status(400).json({message: err.message}))
    }else{
      res.status(400).json({message: 'Missing Data', Fields:{email: 'example@example.com',password: 'string'}})
    }
}

module.exports = {postLogin}