
import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';


// example json object for register
// {
//     "username": "test",
//     "password": "test",
//     "email": "test@gmail.com",
//     "firstName": "test",
//     "lastName": "test",
//     "mobile": "123123123",
//     "address": "test",
//     "profile": "test"
// }


export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check the existence of the username
        const existUsername = UserModel.findOne({ username }).exec();

        // Check the existence of the email
        const existEmail = UserModel.findOne({ email }).exec();

        const [user, emailRecord] = await Promise.all([existUsername, existEmail]);

        if (user) {
            return res.status(400).send({ error: "Username already exists" });
        }

        if (emailRecord) {
            return res.status(400).send({ error: "Email already exists" });
        }

        if (password) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and save the new user
            const newUser = new UserModel({
                username,
                password: hashedPassword,
                email,
                profile: profile || '',
            });

            await newUser.save();

            return res.status(201).send({ message: "User registered successfully" });
        } else {
            return res.status(400).send({ error: "Password is required" });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}




    
 //login   
 export async function login(req, res) {
    const { username, password } = req.body;
 
    try {
        // Find the user by username
        const user = await UserModel.findOne({ username });
 
        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }
 
        // Check if the password matches
        const passwordCheck = await bcrypt.compare(password, user.password);
 
        if (!passwordCheck) {
            return res.status(400).send({ error: "Password is incorrect" });
        }
 
        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            ENV.JWT_SECRET,
            { expiresIn: '1h' }
        );
 
        // Send success response with token
        return res.status(200).send({ message: "Login successful", token, username: user.username });
 
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
 }

export async function getUser(req, res) {
    res.json('get user post req');
    }


export async function updateUser(req, res) {
    res.json('register post req');
     }

export async function generateOTP(req, res) {
    res.json('generateOTP post req');
    }

export async function verifyOTP(req, res) {
    res.json('verifyOTP post req');
    }

export async function createResetSession(req, res) {
    res.json('createReset post req');
    }

export async function resetPassword(req, res) {
    res.json('resetPassword post req');
    }

