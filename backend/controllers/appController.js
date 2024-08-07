
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

// Middleware to verify user
export async function verifyUser(req, res, next) {
    try {
        // Determine if the username is in the query or body
        const { username } = req.method === "GET" ? req.query : req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "User not found 22" });
        }

        // User exists, continue to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}





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



// Get user
export async function getUser(req, res) {
    const { username } = req.params;
    
    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        // Find the user by username
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const { password, ...rest } = user._doc;

        // Return the user data
        return res.status(200).send({ rest });
        
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


// Update user
export async function updateUser(req, res) {
    try {
        //const id = req.query.id;
        const {userId} = req.user;

        if (!userId) {
            return res.status(400).send({ error: "User ID is required" });
        }

        const body = req.body;

        // Update user
        const result = await UserModel.updateOne({ _id: userId }, body);

        if (result.modifiedCount === 0) {
            return res.status(404).send({ error: "User not found or no changes made" });
        }

        return res.status(200).send({ message: "User updated successfully" });
        
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


// Generate OTP

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

