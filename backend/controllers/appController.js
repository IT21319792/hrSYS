
import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';

export async function register(req, res) {
    try {
        const {username, password , profile, email}=req.body;
        //check the existence of the user
        const existUsername = new Promise ((resolve, reject) => {
       UserModel.findOne({username},function(err, user){
           if(err) reject(new Error(err));
           if(user) reject({error: "Username already exists"});
              resolve();
         });
        });

        //check the existence of the email
        const existEmail = new Promise ((resolve, reject) => {
            UserModel.findOne({email},function(err, email){
                if(err) reject(new Error(err));
                if(email) reject({error: "Email already exists"});
                   resolve();
              });
             });

    Promise.all([existUsername, existEmail]).then(() => {
        if(password){
            bcrypt.hash(password,10)
                .then(hashedPassword => {
                    const user = new UserModel({
                        username,
                        password: hashedPassword,
                        email,
                        profile
                    });
                    user.save()
                    .then(() => {
                        return res.status(201).send({message: "User registered successfully"});
                    })
                    .catch(error => {
                        return res.status(500).send({
                            error: "Enable to save user"
                        })
                    })

                }).catch(error => {
                    return res.status(500).send({
                        error: "Enable to hashed password"
                    })

                }
            )

        }
    }).catch(error => {
        return res.status(500).send({error})

    });

    } catch (error) {
        return res.status(500).send(error);
    }
    }

    
export async function login(req, res) {
    res.json('login post req');
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

