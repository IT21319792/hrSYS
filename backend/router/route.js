import { Router } from "express";


const router = Router();

// import all controllers
import * as controller from '../controllers/appController.js';
import { registerMail } from "../controllers/mailer.js";
import Auth , {localVariables} from "../middleware/auth.js";


//post method
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login);


//get method
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get( controller.verifyUser, localVariables,controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createReset').get(controller.createResetSession); 


//put method
router.route('/resetPassword').put( controller.verifyUser,controller.resetPassword);
router.route('/updateUser').put(Auth,controller.updateUser);


export default router;