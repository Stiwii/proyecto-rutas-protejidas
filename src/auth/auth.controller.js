const {findUserByEmail} = require('../users/users.controllers')
const {comparePassword}  = require('../utils/crypto')

const checkUserCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyData = comparePassword(password, user.password)
        if(verifyData){
            return user
        }else{
            return null
        }
    } catch (error) {
        return null 
    }
} 

module.exports = checkUserCredentials