import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin(){
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                            <Heading label={"Sign in"} />
                            <Subheading label={"Enter your credentials to login your account"} />
                            <InputBox value={username} placeholder="ronkmaheshwari@gmail.com" label={"Email"} onChange={(e)=>{setUsername(e.target.value)}}/>
                            <InputBox value={password} placeholder="123456" label={"Password"} onChange={(e)=>{setPassword(e.target.value)}}/>
                            <div className="pt-4">
                                <Button label={"Sign in"} onClick={async ()=>{
                                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{username:username,password:password});
                                    if(response.status == 200){
                                        localStorage.setItem("token",response.data.token);
                                        navigate("/dashboard")
                                    }
                                }} />
                            </div>
                        <BottomWarning label={"Dont have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}