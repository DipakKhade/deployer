
import { useState  } from "react"
import axios from 'axios';
import { Button } from "../components/ui/button";
import { BACKEND_URL } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login(){
  const [email , SetEmail] = useState<string>('');
  const [password , SetPassword] = useState<string>('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const naviagte = useNavigate()


    return<>
<div className="bg-gray-100 flex justify-center items-center h-screen">
<div className="w-1/2 h-screen hidden lg:block bg-slate-700">
  <div className="className=bg-slate-800 min-h-screen w-[50vw]">
  <span className="text-slate-50 text-3xl font-bold p-4">
                deployer
              </span>
  </div>
</div>
<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
  <h1 className="text-2xl font-semibold mb-4">Login</h1>
    <div className="mb-4">
      <label className="block text-gray-600">Email</label>
      <input
      onChange={(e)=>SetEmail(e.target.value)}
       type="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-slate-500" />
    </div>
    <div className="mb-4">
      <label  className="block text-gray-600">Password</label>
      <input
      onChange={(e)=>SetPassword(e.target.value)}
       type="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-slate-500"/>
    </div>
    
    <div className="mb-6 text-slate-500">
      <a href="#" className="hover:underline">Forgot Password?</a>
    </div>
    <Button
    onClick={async()=>{
      const res =await axios.post(`${BACKEND_URL}/api/v1/user/login`,{
        email,
        password
      })
      console.log(res)
      if(res.data.success){
        setCookie('Authorization',res.data.token)
        navigate('/')
      }

    }} 
    >Login</Button>
  <div className="mt-6 text-slate-500 text-center">
  <button
    onClick={()=>naviagte('/signup')}
     className="hover:underline cursor-pointer">log in Here
     </button>
  </div>
</div>
</div>
    </>
}