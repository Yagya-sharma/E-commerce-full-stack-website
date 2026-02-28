// import { LayoutDashboard, PackagePlus, PackageSearch, Users } from 'lucide-react'
// import React from 'react'
// import { FaRegEdit } from 'react-icons/fa'
// import { NavLink } from 'react-router-dom'

// const Sidebar = () => {
//     return (
//         <div className='hidden fixed md:block border-r bg-pink-50 border-pink-200 x-10 w-[300px] p-10 space-y-2 h-screen'>
//             <div className='text-center pt-20 px-3 space-y-2'>
//                 <NavLink to='/dashboard/sales' className={({ isActive }) => `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}><LayoutDashboard /><span>Dashboard</span></NavLink>

//                 <NavLink to='/dashboard/add-product' className={({ isActive }) => `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}><PackagePlus /><span>Add Product</span></NavLink>

//                 <NavLink to='/dashboard/products' className={({isActive})=>`text-xl ${isActive?"bg-pink-600 text-gray-200":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}><PackageSearch/><span>Products</span></NavLink>

//                 <NavLink to='/dashboard/users' className={({isActive})=>`text-xl ${isActive?"bg-pink-600 text-gray-200":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}><Users/><span>Users</span></NavLink>

//                 <NavLink to='/dashboard/orders' className={({isActive})=>`text-xl ${isActive?"bg-pink-600 text-gray-200":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}><FaRegEdit/><span>Orders</span></NavLink>
//             </div>
//         </div>
//     )
// }

// export default Sidebar


import { useState } from "react"
import { NavLink } from "react-router-dom"
import { LayoutDashboard, PackagePlus, PackageSearch, Users } from "lucide-react"
import { FaRegEdit } from "react-icons/fa"

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:block fixed border-r bg-pink-50 border-pink-200 w-[300px] p-10 h-screen">
        <div className="pt-20 space-y-3">

          <NavLink to="/dashboard/sales"
            className={({ isActive }) =>
              `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
              flex items-center gap-2 font-bold p-3 rounded-2xl w-full`
            }>
            <LayoutDashboard /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/add-product"
            className={({ isActive }) =>
              `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
              flex items-center gap-2 font-bold p-3 rounded-2xl w-full`
            }>
            <PackagePlus /> Add Product
          </NavLink>

          <NavLink to="/dashboard/products"
            className={({ isActive }) =>
              `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
              flex items-center gap-2 font-bold p-3 rounded-2xl w-full`
            }>
            <PackageSearch /> Products
          </NavLink>

          <NavLink to="/dashboard/users"
            className={({ isActive }) =>
              `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
              flex items-center gap-2 font-bold p-3 rounded-2xl w-full`
            }>
            <Users /> Users
          </NavLink>

          <NavLink to="/dashboard/orders"
            className={({ isActive }) =>
              `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
              flex items-center gap-2 font-bold p-3 rounded-2xl w-full`
            }>
            <FaRegEdit /> Orders
          </NavLink>

        </div>
      </div>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-pink-50 border-b border-pink-200 flex justify-between items-center p-4 z-50">
        <h2 className="font-bold text-lg">Dashboard</h2>
        <button onClick={() => setMobileOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40">
          <div className="bg-white w-[260px] h-full p-6 space-y-4">
            <button
              className="text-right w-full text-xl"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>

            <NavLink to="/dashboard/sales" onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
                flex items-center gap-2 font-bold p-3 rounded-xl`
              }>
              <LayoutDashboard /> Dashboard
            </NavLink>

            <NavLink to="/dashboard/add-product" onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
                flex items-center gap-2 font-bold p-3 rounded-xl`
              }>
              <PackagePlus /> Add Product
            </NavLink>

            <NavLink to="/dashboard/products" onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
                flex items-center gap-2 font-bold p-3 rounded-xl`
              }>
              <PackageSearch /> Products
            </NavLink>

            <NavLink to="/dashboard/users" onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
                flex items-center gap-2 font-bold p-3 rounded-xl`
              }>
              <Users /> Users
            </NavLink>

            <NavLink to="/dashboard/orders" onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-lg ${isActive ? "bg-pink-600 text-white" : ""}
                flex items-center gap-2 font-bold p-3 rounded-xl`
              }>
              <FaRegEdit /> Orders
            </NavLink>

          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar



