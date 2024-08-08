import axios from 'axios';
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
export async function registerUser({credentials}){
    try {
        const {data : {msg}, status} =await axios.post(`/api/register`,{credentials})
        let {username, email}=credentials;

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
        return Promise.resolve({code})
        }
        
    } catch (error) {
        return Promise.reject({error: "failed to generate OTP"})
        
    }
}