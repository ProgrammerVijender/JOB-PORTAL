import React from 'react'
// import Navbar from '../shared/Navbar'
// import {d } from '../ui/ui/input'
import {Input } from '../ui/input'
import { Button } from '../ui/ui/button'
import { RadioGroup } from '../ui/radio-group'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
// import React from 'react'
// import { toast } from 'react-hot-toast'
import { toast } from 'sonner';
import { USER_API_END_POINTS } from '@/utils/constants'

// import { toast } from 'react-hot-toast'
import axios from 'axios'

const Signup = () => {


  const [input ,setInput] = useState({
    fullname:'',
    email:'',
    password:'',
    phoneNumber:'',
    role:'',
    file:''
  });

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const changeFileHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.files[0]})
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();

    formData.append('fullname',input.fullname);
    formData.append('email',input.email);
    formData.append('password',input.password);
    formData.append('phoneNumber',input.phoneNumber);
    formData.append('role',input.role);
    // formData.append('file',input.file);

    if(input.file){
      formData.append('file',input.file);
    }

    try{
      const res = await axios.post(`${USER_API_END_POINTS}/register`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true,
      }); 
      // const data = await res.json();
      // console.log(data);

      if(res.data.success)
      {
        // console.log('sucessss')
        Navigate('/login');
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
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Signup</h1>
            <div className='my-2'>
                <label >Full Name</label>
                <Input type="text" placeholder='patli' name='fullname' value={input.fullname} onChange={changeEventHandler}/>

            </div>
            <div className='my-2'>
                <label >Email</label>
                <Input type="email" placeholder='patli' name='email' value={input.email} onChange={changeEventHandler}/>

            </div>
            <div className='my-2'>
                <label >Phone Number</label>
                <Input type="phone Number" placeholder='patli' name='phoneNumber' value={input.phoneNumber} onChange={changeEventHandler}/>

            </div>
            <div className='my-2'>
                <label >Password</label>
                <Input type="Password" placeholder='patli' name='password' value={input.password} onChange={changeEventHandler}/>

            </div>
            <div className='flex items-center justify-between' >
              <RadioGroup className="flex items-center gap-4 my-5" >
                <div className='flex items-center space-x-2'>
                  <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role === 'student'} onChange={changeEventHandler}/>
                  <label htmlFor='r1'>Student</label>
                </div>

                <div className='flex items-center space-x-2'>
                  <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role === 'recruiter'} onChange={changeEventHandler}/>
                  <label htmlFor='r2'>Recruiter</label>

                </div>
              </RadioGroup>

              <div className='flex items-center gap-2'> 
                <label> Profile </label>
                <Input accept="image/*" type="file" className="cursor-pointer" onChange={changeFileHandler} name='file'/>

              </div>
            </div>

            <Button type='submit' className="w-full my-4 bg-black text-white hover:bg-gray-800">Signup</Button>
            <span>Already have an account? <Link to="/login" className="text-blue-600"> Login </Link></span>
        </form>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Signup
