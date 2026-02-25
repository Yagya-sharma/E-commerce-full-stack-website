// import { ShoppingCart } from 'lucide-react'
// import React, { useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Button } from './ui/button'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { setUser } from '@/redux/userSlice'
// import { setCart } from '@/redux/productSlice'  



// const Navbar = () => {
//     const {user}=useSelector(store=>store.user)
//     const {cart}=useSelector(store=>store.product)
//     const accessToken=localStorage.getItem('accessToken')
//     const admin=user?.role==="admin"?true:false
//     const dispatch=useDispatch()
//     const navigate=useNavigate()
//     const logoutHandler=async()=>{
//         try {
//             const res=await axios.post(`http://localhost:8000/api/v1/user/logout`,{},{
//                 headers:{
//                     Authorization:`Bearer ${accessToken}`
//                 }
//             })
//             if(res.data.success){
//                 dispatch(setUser(null))
//                 toast.success(res.data.message)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//      }


//     useEffect(() => {
//   const fetchCart = async () => {
//     const res = await axios.get(
//       "http://localhost:8000/api/v1/cart",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       }
//     );

//     dispatch(setCart(res.data.cart));
//   };

//   fetchCart();
// }, []);



//   return (
//     <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
//       <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
//         {/* Logo */}
//        <img src="/Ekart.png" className="w-[100px]"/>
//         {/* nav section */}

//         <nav className='flex gap-10 justify-between items-center'>
//             <ul className='flex gap-7 items-center text-xl font-semibold'>
//                 <Link to={'/'}><li>Home</li></Link>
//                 <Link to={'/products'}><li>Products</li></Link>
//                 {
//                     user && <Link to={`/profile/${user._id}`}><li>Hello,{user.firstName}</li></Link>
//                 }
//                 {
//                     admin && <Link to={`/dashboard/sales`}><li>Dashboard</li></Link>
//                 }
//             </ul>
//             <Link to={'/cart'} className='relative'>
//             <ShoppingCart/>
//             <span className='bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2'>{cart?.items?.length || 0}</span>
//             </Link>
//             {
//                 user?<Button onClick={logoutHandler} className='bg-pink-600 text-white cursor-pointer'>Logout</Button>:<Button onClick={()=>navigate('/login')} className='bg-gradient-to-r from-blue-600 to-purple-600 text-white cursor-pointer'>Login</Button>
//             }
          
//         </nav>
//       </div>
//     </header>
//   )
// }

// export default Navbar


import { ShoppingCart } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/userSlice'
import { setCart } from '@/redux/productSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.user)
    const { cart } = useSelector(store => store.product)
    const accessToken = localStorage.getItem('accessToken')
    const admin = user?.role === "admin"
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/logout`, {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            if (res.data.success) {
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchCart = async () => {
            const res = await axios.get(
                "http://localhost:8000/api/v1/cart",
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            dispatch(setCart(res.data.cart))
        }
        fetchCart()
    }, [accessToken, dispatch])

    return (
        <header className="bg-slate-50 fixed w-full z-20 border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 md:px-0">

                {/* Logo */}
                <Link to="/">
                    <img src="/Ekart.png" className="w-[100px]" alt="Logo" />
                </Link>

                {/* Nav Section */}
                <nav className='flex gap-6 md:gap-10 items-center'>
                    <ul className='hidden md:flex gap-7 items-center text-base md:text-lg font-semibold text-slate-800'>
                        <Link to='/'><li className="hover:text-blue-600 transition">{'Home'}</li></Link>
                        <Link to='/products'><li className="hover:text-blue-600 transition">{'Products'}</li></Link>
                        {user && <Link to={`/profile/${user._id}`}><li className="hover:text-blue-600 transition">{`Hello, ${user.firstName}`}</li></Link>}
                        {admin && <Link to={`/dashboard/sales`}><li className="hover:text-blue-600 transition">{'Dashboard'}</li></Link>}
                    </ul>

                    {/* Cart */}
                    <Link to='/cart' className='relative text-slate-800 hover:text-blue-600 transition'>
                        <ShoppingCart className='w-6 h-6' />
                        <span className='bg-blue-600 rounded-full absolute text-white -top-2 -right-3 px-2 text-xs font-semibold'>
                            {cart?.items?.length || 0}
                        </span>
                    </Link>

                    {/* Login / Logout */}
                    {user
                        ? <Button onClick={logoutHandler} className='bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-200'>
                            Logout
                          </Button>
                        : <Button onClick={() => navigate('/login')} className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition duration-200'>
                            Login
                          </Button>
                    }

                </nav>
            </div>
        </header>
    )
}

export default Navbar


