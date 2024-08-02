import toast from "react-hot-toast"

/** validate login page username */
export async function usernameValidate(values){
    const errors=usernameVerify({},values);
    return errors
}


/** validate login page password */
export async function passwordValidate(values){
    const errors=passwordVerify({},values);
    return errors
}



/** validate reset password */

export async function resetPasswordVerify(values){
    const errors=passwordVerify({},values);
    if(values.password!==values.confirm_pwd){
       errors.exist = toast.error('Password does not match')
    }

    return errors
}




/**validate register form */
export async function registerValidate(values){
        const errors= usernameVerify({},values);
        const passwordErrors = passwordVerify(errors,values);

}



/** validate password */
function passwordVerify(error={},values){

    const specialChar = /[!@#$%^&*(),.?":{}|<>]/g;
    if(!values.password){
        error.password=toast.error('Password is required')
    }else if(values.password.length<5){
        error.password=toast.error('Password must be atleast 5 characters')
    }else if(values.password.includes(' ')){
        error.password=toast.error('Password must not contain spaces')
    }
    else if(!specialChar.test(values.password)){
        error.password=toast.error('Password must contain special characters')
    }

    return error
}



/** validate username */
function usernameVerify(error={},values){
    if(!values.username){
        error.username=toast.error('Username is required')
    }else if(values.username.length<5){
        error.username=toast.error('Username must be atleast 5 characters')
    }else if(values.username.includes(' ')){
        error.username=toast.error('Username must not contain spaces')
    }
    return error
}

// validate email
function emailVerify(error={},values){
    if(!values.email){
        error.email=toast.error('Email is required')
    }else if(values.email.length<5){
        error.email=toast.error('Email must be atleast 5 characters')
    }else if(values.email.includes(' ')){
        error.email=toast.error('Email must not contain spaces')
    }else if(!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z][2,4]$/i.test(values.email)){
        error.email=toast.error('Invalid email')
    }
    return error
}