// import React, {useState} from 'react'
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Eye, EyeOff, Loader2 } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'sonner'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { setUser } from '@/redux/userSlice'



// const Login = () => {

//     const [showPassword,setShowPassword]=useState(false)
//     const [loading,setLoading]=useState(false)
//     const [formData,setFormData]=useState({
//         email:"",
//         password:"",
//     })

//     const navigate=useNavigate()
//     const dispatch=useDispatch()

//     const handleChange=(e)=>{
//         const {name,value}=e.target;
//         setFormData((prev)=>({
//             ...prev,[name]:value
//         }))
//     }

//     const submitHandler=async(e)=>{
//         e.preventDefault()
//         console.log(formData)
//         try {
//             setLoading(true)
//             const res=await axios.post(`http://localhost:8000/api/v1/user/login`,formData,{
//                 headers:{
//                     "Content-type":"application/json"
//                 }
//             })
//             if(res.data.success){
//                 navigate('/')
//                 dispatch(setUser(res.data.user))
//                 localStorage.setItem("accessToken",res.data.accessToken)
//                 toast.success(res.data.message)
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response.data.message)
//         } finally{
//             setLoading(false)
//         }
//     }

//   return (
//             <div className='flex justify-center items-center min-h-screen bg-pink-100'>
//             <Card className="w-full max-w-sm">
//                 <CardHeader>
//                     <CardTitle>Create your account</CardTitle>
//                     <CardDescription>
//                         Enter given deatils below to create your account
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                         <div className="flex flex-col gap-3">
//                             {/* <div className="grid grid-cols-2 gap-4">
//                                 <div className='grid gap-2'>
//                                     <Label htmlFor="firstName">First Name</Label>
//                                     <Input id="firstName" name="firstName" type="text" placeholder="John" required value={formData.firstName} onChange={handleChange} />
//                                 </div>
//                                 <div className='grid gap-2'>
//                                     <Label htmlFor="lastName">Last Name</Label>
//                                     <Input id="lastName" name="lastName" type="text" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
//                                 </div>
//                             </div> */}
//                             <div className='grid gap-2'>
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
               
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     required
//                                     value={formData.email} onChange={handleChange}
//                                 />
//                             </div>

//                             <div className="grid gap-2">
//                                 <div className="flex items-center">
//                                     <Label htmlFor="password">Password</Label>
//                                 </div>
//                                 <div className='relative'>
//                                     <Input id="password" name="password" placeholder="Enter a password" value={formData.password} onChange={handleChange} type={showPassword?'text':'password'} required />
//                                     {
//                                         showPassword?<EyeOff onClick={()=>setShowPassword(false)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2'/>:
//                                         <Eye onClick={()=>setShowPassword(true)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2'/>
//                                     }
//                                 </div>
//                             </div>
//                         </div>
//                 </CardContent>
//                 <CardFooter className="flex-col gap-2">
//                     <Button onClick={submitHandler} type="submit" className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500">
//                       {loading?<><Loader2 className="h-4 w-4 animate-spin mr-2" />Please wait..</>:'Login'}  
//                     </Button>
//                     <p className='text-gray-700 text-sm'>Don't have an account?<Link to={'/signup'} className='hover:underline cursor-pointer text-pink-800'>Signup</Link></p>
//                 </CardFooter>
//             </Card>
//         </div>
//   )
// }

// export default Login



import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/userSlice'

const Login = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [loading,setLoading]=useState(false)
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    })

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const submitHandler=async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const res=await axios.post(`http://localhost:8000/api/v1/user/login`,formData,{
                headers:{"Content-type":"application/json"}
            })
            if(res.data.success){
                navigate('/')
                dispatch(setUser(res.data.user))
                localStorage.setItem("accessToken",res.data.accessToken)
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4'>

            <Card className="w-full max-w-md shadow-xl border border-slate-200 rounded-2xl">

                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold text-slate-800">
                        Login to your account
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        Enter your credentials below
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submitHandler} className="space-y-4">

                        <div className='grid gap-2'>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className='relative'>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type={showPassword?'text':'password'}
                                    required
                                    className="pr-10 focus:ring-2 focus:ring-blue-500"
                                />
                                {showPassword
                                    ? <EyeOff
                                        onClick={()=>setShowPassword(false)}
                                        className='w-5 h-5 text-slate-500 absolute right-3 top-3 cursor-pointer'
                                      />
                                    : <Eye
                                        onClick={()=>setShowPassword(true)}
                                        className='w-5 h-5 text-slate-500 absolute right-3 top-3 cursor-pointer'
                                      />
                                }
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200 disabled:opacity-60"
                        >
                            {loading
                                ? <span className='flex items-center justify-center gap-2'>
                                    <Loader2 className='h-4 w-4 animate-spin'/>
                                    Logging in...
                                  </span>
                                : 'Login'
                            }
                        </Button>

                    </form>
                </CardContent>

                <CardFooter className="flex justify-center text-sm text-slate-600">
                    Don't have an account?
                    <Link
                        to={'/signup'}
                        className='ml-1 text-blue-600 hover:text-blue-700 font-medium'
                    >
                        Signup
                    </Link>
                </CardFooter>

            </Card>

        </div>
    )
}

export default Login

