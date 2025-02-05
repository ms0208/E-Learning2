import express from 'express';
const router = express.Router();
import Usercontrol from '../controllers/usercontrol.js';
import checkUserAuth from '../middleware/authmiddleware.js';


// Route Level 
router.use('/changepw',checkUserAuth);
router.use('/loggeduser',checkUserAuth);
// Public Routes
router.post('/register',Usercontrol.userRegister)
router.post('/login',Usercontrol.userLogin);
router.post('/send-restpe',Usercontrol.sendUserPRE);
router.post('/send-password/:id/:token',Usercontrol.userPR)

// Protected Routes
router.post('/changepw',Usercontrol.changeUserPassword);
router.get('/loggeduser',Usercontrol.loggedUser);
export default router 
