import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080'
//make api req


//authenticating user

export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate',{username})
        
    } catch (error) {
        return {error:"username dosent exist"}
    }
}

//get user details

export async function getUser({username}){
    try {
      const {data} = await axios.get(`/api/user/${username}`)
      return {data};
        
    } catch (error) {
        return {error:"password dosent match"}
    }
}


//register user
export async function registerUser(credentials){
    try {
        const {data : {msg}, status} =await axios.post(`/api/register`,credentials)
        let {username, email}= credentials;

        //send email
        if(status===201){
            await axios.post(`/api/registerMail`,{userEmail:email,username,subject:"Welcome to HR-MIR",text:msg})
        }
        return Promise.resolve(msg)
        
    } catch (error) {
        return Promise.reject({error})
    }
}

//login user
export async function verifyPassword({username, password}){
    try {
        if (username){
          const {data} = await axios.post(`/api/login`,{username,password})
          return Promise.resolve({data})
        }
       
        
    } catch (error) {
        return Promise.reject({error : "password dosent match"})
        
    }
}


//update user profile
export async function updateUser({response}){
    try {

        const token = localStorage.getItem("token");
        const {data} = await axios.put(`/api/updateUser`,{response},
            {headers : {"Authorization" : `Bearer ${token}`}})
        return Promise.resolve({data})
        
        
    } catch (error) {
        return Promise.reject({error: "failed to update user"})
        
    }
}

//generate OTP
export async function generateOTP(username){
    try {
      const {data : {code},status} = await axios.get(`/api/generateOTP`,{params :{username}});
      //send email with otp
      if (status === 200){
        let {data : {email}} = await getUser ({username});
        let text = `Your Password recovery Code is ${code}. verify and reset your password`;
        await axios.post(`/api/registerMail`,{userEmail:email,username,subject:"Password Recovery",text})
        }

        return Promise.resolve(code)
        
    } catch (error) {
        return Promise.reject({error: "failed to generate OTP"})
        
    }
}


//verify OTP
export async function verifyOTP({username,code}){
    try {
        const {data , status} = await axios.get(`/api/verifyOTP`,{params :{username,code}});
        return {data,status}
        
    } catch (error) {
        return Promise.reject({error: "failed to verify OTP"})
        
    }
}


//reset password
export async function resetPassword({username,password}){
    try {
        const {data , status} = await axios.put(`/api/resetPassword`,{username,password})
        return Promise.resolve({data , status})
        
    } catch (error) {
        return Promise.reject({error: "failed to reset password"})
        
    }
}