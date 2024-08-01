import toast from "react-hot-toast"


export async function usernameValidate(values){
    const errors=usernameVerify({},values);


    return errors
}



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