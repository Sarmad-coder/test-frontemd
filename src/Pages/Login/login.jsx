import { useState } from "react"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
export default function Login() {
    const apiUrl = process.env.REACT_APP_API_URL;
    let { handleSubmit, register, formState } = useForm()
    const [type,setType]=useState("password")
    const move=useNavigate()

    const loginUser = async (data) => {
        // console.log(apiUrl)
        try {
            let res = await axios.post(`${apiUrl}user/login`, data)
        if (res.data&&res.data.status==="success") {
            localStorage.setItem("token", res.data.token)
            toast.success("You have successfully logged in")
              move("/dashboard")
            
            

          
        } else {
          toast.error("Invalid Email or Password")
        }
        } catch (error) {
            console.log(error)
        }
        
      }
    return (
        <div className="d-flex justify-content-center align-items-center tw-h-screen">
            <div className=" tw-w-96">
                <h2 className=" text-center tw-font-bold tw-text-2xl tw-mb-4">Sign In</h2>
                <form onSubmit={handleSubmit(loginUser)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                            {...register("email", { validate:(data)=>{
                                const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                if (pattern.test(data)) {
                                   return true
                                }else{
                                    return false
                                }
                            } })}
                        />
                         {formState?.errors?.email?.type == "validate" ?<div className=' tw-text-red-600 tw-text-xs'>Please enter correct email</div>:
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>}
                    </div>
                    <div className="mb-3">
                    <div className="tw-relative">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type={type}
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                            {...register("password", { minLength:8 })}
                        />
                       {type==="password"? <i className="fa-sharp fa-solid fa-eye tw-absolute tw-bottom-3 tw-right-4 tw-cursor-pointer" onClick={()=>{setType("text")}}></i>:
                        <i className="fa-solid fa-eye-slash tw-absolute tw-bottom-3 tw-right-4 tw-cursor-pointer" onClick={()=>{setType("password")}}></i>}
                    </div>
                    {formState?.errors?.password?.type == "minLength" && <div className=' tw-text-red-600 tw-text-xs'>Please enter minimum 8 character long password</div>}
                    </div>
                    <button type="submit" className="btn btn-primary tw-bg-blue-500 tw-w-full">
                        Sign In
                    </button>
                </form>
            </div>  

        </div>
    )
}