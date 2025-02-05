import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'

var checkUserAuth = async (req, res , next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
            console.log("TOKEN",token);
            console.log("Authorization",authorization);
            // verify token 
            const { userID } = jwt.verify(token, process.env.JWT_SK);
            console.log(userID)
            req.user = await UserModel.findById(userID).select('-password')
            console.log(req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
        }
    }
    if (!token) {
        res.status(401).end({ "status": "failed", "message": "Unauthorized User , No Token" })
    }
}
export default checkUserAuth;