// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import userLogo from "../assets/user.jpg"
// import axios from 'axios'
// import { setUser } from '@/redux/userSlice'
// import { toast } from 'sonner'
// import MyOrder from './MyOrder'

// const Profile = () => {
//   const {user}=useSelector(store=>store.user)
//   const params=useParams()
//   const userId=params.userId;
//   const [updateUser,setUpdateUser]=useState({
//     firstName:user?.firstName,
//     lastName:user?.lastName,
//     email:user?.email,
//     phoneNo:user?.phoneNo,
//     address:user?.address,
//     city:user?.city,
//     zipCode:user?.zipCode,
//     profilePic:user?.profilePic,
//     role:user?.role
//   })
//   const [file,setFile]=useState(null)
//   const dispatch=useDispatch()
  
//   const handleChange=(e)=>{
//     setUpdateUser({...updateUser,[e.target.name]:e.target.value})
//   }

//   const handleFileChange=(e)=>{
//     const selectedFile=e.target.files[0]
//     setFile(selectedFile)
//     setUpdateUser({...updateUser,profilePic:URL.createObjectURL(selectedFile)}) //prview only
//   }

//   const handleSubmit=async(e)=>{
//     e.preventDefault()
//     const accessToken=localStorage.getItem("accessToken")
//     try {
//       //use formdata for text+file
//       const formData=new FormData()
//       formData.append("firstName",updateUser.firstName)
//       formData.append("lastName",updateUser.lastName)
//       formData.append("email",updateUser.email)
//       formData.append("phoneNo",updateUser.phoneNo)
//       formData.append("address",updateUser.address)
//       formData.append("city",updateUser.city)
//       formData.append("zipCode",updateUser.zipCode)
//       formData.append("role",updateUser.role)
//       if(file){
//         formData.append("file",file)   //image file for backend multer
//       }
//       const res=await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`,formData,{
//         headers:{
//           Authorization:`Bearer ${accessToken}`,
//           "Content-Type":"multipart/form-data"
//         }
//       })
//       if(res.data.success){
//         toast.success(res.data.message)
//         dispatch(setUser(res.data.user))
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error("Failed to update profile")
//     }
//   }
//   return (
//     <div className="pt-20 min-h-screen bg-gray-100">
//       <Tabs defaultValue="profile" className="maxw-7xl mx-auto items-center">
//         <TabsList>
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//           <TabsTrigger value="orders">Orders</TabsTrigger>
//         </TabsList>

//         <TabsContent value="profile">
//          <div>
//             <div className='flex flex-cols justify-center items-center bg-gray-100'>
//                 <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>
//                 <div className='w-full flex gap-10 justify-between items-start px-7 max-w-2xl'>
//                     {/* profile picture */}
//                     <div className='flex flex-col items-center'>
//                         <img src={updateUser?.profilePic || userLogo} className='w-32 h-32 ronded-full object-cover border-4 border-pink-800' />
//                         <Label className='mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-1 hover:bg-pink-700'>Change Picture
//                             <input type="file" accept="image/" className='hidden' onChange={handleFileChange} />
//                         </Label>
//                     </div>
//                     {/* Profile form */}
//                     <form onSubmit={handleSubmit} className='space-y-4 shadow-lg p-5 rounded-lg bg-white'>
//                         <div className='grid grid-cols-2 gap-4'>
//                             <div>
//                                 <Label className='block text-sm font-medium'>First Name</Label>
//                                 <Input type='text' placeholder="John" name="firstName" value={updateUser.firstName} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1'/>
//                             </div>
//                             <div>
//                                 <Label className='block text-sm font-medium'>last Name</Label>
//                                 <Input type='text' name="lastName" placeholder="Doe" value={updateUser.lastName} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1'/>
//                             </div>
//                         </div>
//                         <div>
//                                 <Label className='block text-sm font-medium'>Email</Label>
//                                 <Input type='email' name="email" value={updateUser.email} onChange={handleChange} disabled className='w-full border rounded-lg px-3 py-2 mt-1 bg-gray cursor-not-allowed'/>
//                         </div>
//                         <div>
//                             <Label className='block text-sm font-medium'>Phone Number</Label>
//                                 <Input type='text' name="phoneNo" value={updateUser.phoneNo} onChange={handleChange} placeholder="Enter Your Contact No" className='w-full border rounded-lg px-3 py-2 mt-1 '/>
//                         </div>
//                         <div>
//                             <Label className='block text-sm font-medium'>Address</Label>
//                             <Input type='text' name="address" placeholder="Enter Your address" value={updateUser.address} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1 '/>
//                         </div>

//                         <div className='grid grid-cols-2 gap-4'>
//                           <div>
//                             <Label className='block text-sm font-medium'>City</Label>
//                             <Input type='text' name="city" placeholder="Enter Your city" value={updateUser.city} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1 '/>
//                         </div>
//                         <div>
//                             <Label className='block text-sm font-medium'>Zip Code</Label>
//                             <Input type='text' name="zipCode" placeholder="Enter Your ZipCode" value={updateUser.zipCode} onChange={handleChange} className='w-full border rounded-lg px-3 py-2 mt-1 '/>
//                         </div>
//                         </div>

//                         <Button type="submit" className='w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg'>Update Profile</Button>
//                     </form>
//                 </div>
//             </div>
//          </div>
//         </TabsContent>
//         <TabsContent value="orders">
//           <MyOrder/>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


// export default Profile




import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from "../assets/user.jpg"
import axios from 'axios'
import { setUser } from '@/redux/userSlice'
import { toast } from 'sonner'
import MyOrder from './MyOrder'

const Profile = () => {
  const { user } = useSelector(store => store.user)
  const params = useParams()
  const userId = params.userId
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role
  })
  const [file, setFile] = useState(null)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const accessToken = localStorage.getItem("accessToken")
    try {
      const formData = new FormData()
      Object.keys(updateUser).forEach(key => {
        if(key !== "profilePic") formData.append(key, updateUser[key])
      })
      if(file) formData.append("file", file)

      const res = await axios.put(`http://localhost:8000/api/v1/user/update/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "multipart/form-data"
        }
      })
      if(res.data.success){
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update profile")
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-white rounded-lg shadow-md p-1 mb-8 flex space-x-2">
            <TabsTrigger value="profile" className="w-1/2 text-center py-2 font-medium rounded-lg">Profile</TabsTrigger>
            <TabsTrigger value="orders" className="w-1/2 text-center py-2 font-medium rounded-lg">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className='flex flex-col md:flex-row gap-10 justify-center items-start'>
              
              {/* Profile Picture */}
              <div className='flex flex-col items-center'>
                <img 
                  src={updateUser?.profilePic || userLogo} 
                  alt="Profile" 
                  className='w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-md'
                />
                <Label className='mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition'>
                  Change Picture
                  <input type="file" accept="image/*" className='hidden' onChange={handleFileChange} />
                </Label>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleSubmit} className='space-y-4 w-full md:w-2/3 bg-white p-6 rounded-xl shadow-lg'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <Label className='block text-sm font-medium'>First Name</Label>
                    <Input type='text' name="firstName" value={updateUser.firstName} onChange={handleChange} placeholder="John" className='w-full mt-1' />
                  </div>
                  <div>
                    <Label className='block text-sm font-medium'>Last Name</Label>
                    <Input type='text' name="lastName" value={updateUser.lastName} onChange={handleChange} placeholder="Doe" className='w-full mt-1' />
                  </div>
                </div>

                <div>
                  <Label className='block text-sm font-medium'>Email</Label>
                  <Input type='email' name="email" value={updateUser.email} disabled className='w-full mt-1 bg-gray-200 cursor-not-allowed'/>
                </div>

                <div>
                  <Label className='block text-sm font-medium'>Phone Number</Label>
                  <Input type='text' name="phoneNo" value={updateUser.phoneNo} onChange={handleChange} placeholder="Enter your contact no" className='w-full mt-1'/>
                </div>

                <div>
                  <Label className='block text-sm font-medium'>Address</Label>
                  <Input type='text' name="address" value={updateUser.address} onChange={handleChange} placeholder="Enter your address" className='w-full mt-1'/>
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <Label className='block text-sm font-medium'>City</Label>
                    <Input type='text' name="city" value={updateUser.city} onChange={handleChange} placeholder="Enter your city" className='w-full mt-1'/>
                  </div>
                  <div>
                    <Label className='block text-sm font-medium'>Zip Code</Label>
                    <Input type='text' name="zipCode" value={updateUser.zipCode} onChange={handleChange} placeholder="Enter your zip code" className='w-full mt-1'/>
                  </div>
                </div>

                <Button type="submit" className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium mt-4 transition'>
                  Update Profile
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <MyOrder/>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}

export default Profile

