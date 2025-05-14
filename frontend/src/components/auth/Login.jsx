import React from 'react'
import Navbar from '../shared/Navbar'
// import {d } from '../ui/ui/input'
import {Input } from '../ui/input'
import { Button } from '../ui/ui/button'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner';
import { USER_API_END_POINTS } from '@/utils/constants'
import { setLoading } from '@/redux/authSlice'

const Login = () => {
  
  const navigate = useNavigate();
  const [input ,setInput] = useState({
     
      email:'',
      password:'',
      role:''
    });

    // const navigate = useNavigate();

    


    const changeEventHandler = (e) =>{
      setInput({...input,[e.target.name]:e.target.value});
    }

    const SubmitHandler = async (e) =>{
      e.preventDefault();


      console.log(input)

      dispatch(setLoading(true));

      try{
        const res = await axios.post(`${USER_API_END_POINTS}/login`,input,{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true,
        }); 
        // const data = await res.json();
        // console.log(data);
  
        if(res.data.success)
        {
          console.log('sucessss')
          navigate('/');
          toast.success(res.data.message);
        }else{
          toast.error(res.data.message);
        }
      }catch(err){
        console.log(err);
        toast.error(err.response.data.message);
      }


    }



  return (
    <div>
      {/* <Navbar /> */}
      <div className='flex items-center justify-center max-w-7xl mx-auto h-screen'>
        <form onSubmit={SubmitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Login</h1>
            
            <div className='my-2'>
                <label >Email</label>
                <Input type="email" placeholder='patli' onChange={changeEventHandler} name='email' value={input.email}/>

            </div>
            
            
            <div className='my-2'>
                <label >Password</label>
                <Input type="Password" placeholder='patli' onChange={changeEventHandler} name='password' value={input.password}/>

            </div>


            <div className='flex items-center justify-between'>
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className='flex items-center space-x-2'>
                  <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role === 'student'} onChange={changeEventHandler}/>
                  <label htmlFor='r1'>Student</label>
                </div>

                <div className='flex items-center space-x-2'>
                  <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role === 'recruiter'} onChange={changeEventHandler}/>
                  <label htmlFor='r2'>Recruiter</label>

                </div>
              </RadioGroup>

             
            </div>

            <Button type='submit' className="w-full my-4 bg-black text-white hover:bg-gray-800">Login</Button>
            <span>Don't have an account? <Link to="/Signup" className="text-blue-600"> Signup </Link></span>
        </form>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Login
