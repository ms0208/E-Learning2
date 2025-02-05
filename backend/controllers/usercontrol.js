import UserModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailconfig.js'

class Usercontrol {
    static userRegister = async (req, res) => {
        const { fullName, phoneno, email, password, } = req.body
        const user = await UserModel.findOne({ email: email })
        if (user) {
            res.send({ "status": "failed", "message": "Email already exists" })
        } else {
            if (fullName && phoneno && email && password) {
                try {
                    const salt = await bcrypt.genSalt(12);
                    const hp = await bcrypt.hash(password, salt);
                    const doc = new UserModel({
                        fullName: fullName,
                        phoneno:phoneno,
                        email: email,
                        password: hp,
                    });
                    await doc.save();
                    const saveuser = await UserModel.findOne({ email: email })
                    // Genretate JWT
                    const token = jwt.sign({ userID: saveuser._id }, process.env.JWT_SK, { expiresIn: '5d' })
                    res.status(201).send({ "status": "success", "message": "User registered successfully", "token": token });
                } catch (error) {
                    res.send({ "status": "failed", "message": "Unable to register" });
                }
            }

        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body
            if (email && password) {
                const user = await UserModel.findOne({ email: email })
                if (email && password) {
                    const user = await UserModel.findOne({ email: email })
                    if (user != null) {
                        const isMatch = await bcrypt.compare(password, user.password);
                        if ((user.email === email) && isMatch) {
                            // Genretate JWT
                            const token = jwt.sign({ userID: user._id }, process.env.JWT_SK, { expiresIn: '5d' })
                            res.send({ "status": "succeses", "message": "Login succesful", "token": token })
                        } else {
                            res.send({ "status": "failed", "message": "Invalid ID or password" })
                        }
                    } else {
                        res.send({ "status": "failed", "message": "You are not register" })
                    }
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to Login" })
        }
    }

    static changeUserPassword = async (req, res) => {
        const { password, pc } = req.body
        if (password && pc) {
            if (password !== pc) {
                res.send({ "status": "failed", "message": "New Passwword and confirm New Password are not match" })
            } else {
                const salt = await bcrypt.genSalt(12)
                const hp1 = await bcrypt.hash(password, salt);
                console.log(req.user._id)
                await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: hp1 } });
                res.send({ "status": "success", "message": "Password change succesfully " })
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    }
    static loggedUser = async (req, res) => {
        res.send({ "user": req.user })
    }

    static sendUserPRE = async (req, res) => {
        const { email } = req.body
        if (email) {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                const secret = user._id + process.env.JWT_SK;
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
                console.log(link);
                // SEND EMAIL
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "Geekshop-Password Reset Link",
                    html: `<a href=${link}>CLICK HERE</a> to Rest your password`
                })
                res.send({ "status": "succes", "message": "Password Reset Email Send .. Please check your Email", "info": info });
            } else {
                res.send({ "status": "failed", "message": "Email doesn't exits " })
            }
        } else {
            res.send({ "status": "failed", "message": "Email Filed is Required" });
        }
    }
    static userPR = async (req, res) => {
        const { password, pc } = req.body;
        const { id, token } = req.params;
        const user = await UserModel.findById(id)
        const new_secret = user.id + process.env.JWT_SK;
        try {
            jwt.verify(token, new_secret)
            if (password && pc) {
                if (password !== pc) {
                    res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't Match" });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const nhp = await bcrypt.hash(password, salt)
                    await UserModel.findByIdAndUpdate(user._id, {
                        $set: {
                            password: nhp
                        }
                    })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" });
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Invalid Token" });
        }
    }
}
export default Usercontrol