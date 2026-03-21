// import React from 'react'

// const Verify = () => {
//   return (
//     <div className='relative w-full h-[760px] overflow-hidden'>
//         <div className='min-h-screen flex items-center justify-center bg-pink-100 px-4'>
//             <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
//                 <h2 className='text-2xl font-semibold text-green-500 mb-4'>✅ Check your Email</h2>
//                 <p className='text-gray-400 text-sm'>We've sent you an email to verify your account, Please check your inbox and click the verification link</p>
//             </div>
//         </div>
//       verify
//     </div>
//   )
// }

// export default Verify


import React, { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const Verify = () => {

  const [loading, setLoading] = useState(false)

  const handleResend = async () => {
    try {
      setLoading(true)

      const email = localStorage.getItem("verifyEmail")

      if (!email) {
        toast.error("Email not found. Please signup again.")
        return
      }

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/reVerify`,
        { email }
      )

      if (res.data.success) {
        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">

      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">

        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <span className="text-3xl">📩</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800">
          Check Your Email
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed">
          We've sent you a verification email.  
          Please check your inbox and click the verification link to activate your account.
        </p>

        <button
          onClick={handleResend}
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium transition duration-200 disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            "Resend Email"
          )}
        </button>

      </div>

    </div>
  )
}

export default Verify
