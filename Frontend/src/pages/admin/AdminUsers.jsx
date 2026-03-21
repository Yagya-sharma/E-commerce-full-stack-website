import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Edit, Eye, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import UserLogo from "../../assets/user.jpg"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const AdminUsers = () => {
  const [users,setUsers]=useState([])
  const [searchTerm,setSearchTerm]=useState("")
  const navigate=useNavigate()
  const getAllUsers=async()=>{
    const accessToken=localStorage.getItem("accessToken")
    try {
      const res=await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/all-user`,{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        setUsers(res.data.users)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filteredUsers=users.filter(user=>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(()=>{
    getAllUsers()
  },[])
 

  return (
  <div className='pt-32 px-4 md:pl-[350px] md:pr-20 min-h-screen bg-gray-50'>
    {/* Header */}
    <div className='mb-8 text-center md:text-left'>
      <h1 className='text-3xl font-bold text-gray-800'>User Management</h1>
      <p className='text-gray-500 mt-1'>View and manage registered users</p>
    </div>

    {/* Search */}
    <div className='relative w-full max-w-[350px] mb-10'>
      <Search className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='pl-10 bg-white shadow-sm border-gray-300'
        placeholder='Search users by name or email...'
      />
    </div>

    {/* Users Grid */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {filteredUsers.map((user, index) => (
        <div
          key={index}
          className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100'
        >
          {/* User Info */}
          <div className='flex items-center gap-4'>
            <img
              src={user?.profilePic || UserLogo}
              alt=''
              className='w-16 h-16 rounded-full object-cover border border-gray-200'
            />
            <div>
              <h2 className='font-semibold text-lg text-gray-800'>
                {user?.firstName} {user?.lastName}
              </h2>
              <p className='text-sm text-gray-500'>{user?.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-3 mt-6'>
            <Button
              onClick={() => navigate(`/dashboard/users/${user?._id}`)}
              variant='outline'
              className='flex-1'
            >
              <Edit className='w-4 h-4 mr-1' />
              Edit
            </Button>

            <Button
              onClick={() => navigate(`/dashboard/users/orders/${user?._id}`)}
              className='flex-1'
            >
              <Eye className='w-4 h-4 mr-1' />
              Orders
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

}

export default AdminUsers
