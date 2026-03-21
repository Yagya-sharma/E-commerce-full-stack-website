// import React, { useEffect,useState } from 'react'
// import {useNavigate,useParams } from 'react-router-dom'
// import axios from 'axios'

// const VerifyEmail = () => {
//      const {token}=useParams()
//      const [status,setStatus]=useState("Verifying...")
//      const navigate=useNavigate()

//      const VerifyEmail=async()=>{
//         try {
//             const res=await axios.post(`http://localhost:8000/api/v1/user/verify`,{},{
//                 headers:{
//                     Authorization:`Bearer ${token}`
//                 }
//             })
//             if(res.data.success){
//                 setStatus("✅ Email Verified Successfully")
//                 setTimeout(()=>{
//                     navigate('/login')
//                 },2000)
//             }
//         } catch (error) {
//             console.log(error)
//             setStatus("❌Verification failed. Please try again")
//         }
//      }
//      useEffect(()=>{
//         VerifyEmail()
//      },[token])
//   return (
//     <div className='relative w-full h-[760px] bg-pink-100 overflow-hidden'>
//         <div className='min-h-screen flex items-center justify-center'>
//             <div className='bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md'>
//                 <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default VerifyEmail


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const VerifyEmail = () => {
    const { token } = useParams()
    const [status, setStatus] = useState("Verifying...")
    const navigate = useNavigate()

    const VerifyEmail = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/user/verify`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            if (res.data.success) {
                setStatus("✅ Email Verified Successfully")
                setTimeout(() => navigate('/login'), 2000)
            }
        } catch (error) {
            console.log(error)
            setStatus("❌ Verification failed. Please try again")
        }
    }

    useEffect(() => {
        VerifyEmail()
    }, [token])

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">

            <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center space-y-4">

                <div className="flex justify-center">
                    <div className="bg-blue-100 p-4 rounded-full">
                        <span className="text-3xl">
                            {status.includes("✅") ? "✅" : status.includes("❌") ? "❌" : "⏳"}
                        </span>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-slate-800">
                    {status}
                </h2>

            </div>

        </div>
    )
}

export default VerifyEmail

