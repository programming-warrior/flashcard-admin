import React, { useState,useRef } from "react";
import Form from "./component/Form/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate();
    const errorDiv=useRef<HTMLDivElement>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        try{
            const res = await axios.post(`${BACKEND_URL}/api/login`, {
                username,
                password
              });
                  
            if(res.status===201 || res.status===200){
                localStorage.setItem('token',res.data.token);
                return navigate('/');
            }

        }
        catch(e:any){
            if(errorDiv && errorDiv.current){
                errorDiv.current.textContent=e.response.data.error;
            }
        }

    }   



    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center ">
            <h3>username:Yusuf</h3>
            <h3>password:12345</h3>
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <div ref={errorDiv}></div>
            <Form onSubmit={handleSubmit} onUsernameChange={(e: any) => { setUsername(e.target.value) }} onPasswordChanage={(e: any) => { setPassword(e.target.value) }} />
        </div>
    )
}

export default Login;