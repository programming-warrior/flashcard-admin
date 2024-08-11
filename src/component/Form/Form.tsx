import React,{useState} from "react";

const Form=({onSubmit,onPasswordChanage,onUsernameChange}:
    {
        onSubmit:(e:React.FormEvent)=>void,
        onPasswordChanage:(e:any)=>void,
        onUsernameChange:(e:any)=>void
    }
)=>{

    

    return(
        <form className="min-w-72 p-6 " onSubmit={(e:React.FormEvent)=>{onSubmit(e)}}>
            <div className="gap-3 flex items-center justify-between">
                <label>Username</label>
                <input className="py-1 px-2 border border-black outline-none" type="text" onChange={(e)=>{onUsernameChange(e)}}/>
            </div>
            <div className="gap-3  flex items-center justify-between  mt-3">
                <label>Password</label>
                <input className="py-1 px-2 border border-black outline-none" type="password" onChange={(e)=>onPasswordChanage(e)}/>
            </div>
            <div className="flex items-center justify-center mt-3 ">
                <button type="submit" className="bg-blue-500 text-white  py-1 px-2 rounded-sm">Submit</button>
            </div>
        </form>
    )
}

export default Form;