import { Router } from "express";

const router = Router();

// import all controllers
import * as controller from '../controllers/appController.js';

//post method
router.route('/register').post(controller.register);
// router.route('/registerMail').post((req, res) => res.json('registerMail post req'));
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(controller.login);


//get method
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createReset').get(controller.createResetSession); 


//put method
router.route('/resetPassword').put(controller.resetPassword);
router.route('/updateUser').put(controller.updateUser);


export default router;