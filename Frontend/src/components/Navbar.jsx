import { ShoppingCart } from 'lucide-react'
import React, { useEffect ,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/userSlice'
import { setCart } from '@/redux/productSlice'  
import { toast } from 'sonner'



const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const {user}=useSelector(store=>store.user)
    const {cart}=useSelector(store=>store.product)
    const accessToken=localStorage.getItem('accessToken')
    const admin=user?.role==="admin"?true:false
    const dispatch=useDispatch()
    const navigate=useNavigate()
   const logoutHandler = async () => {

    try {

        const token = localStorage.getItem("accessToken")

        if (!token) {
            return
        }

        const res = await axios.post(
            `${import.meta.env.VITE_URL}/api/v1/user/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (res.data.success) {

            localStorage.removeItem("accessToken")

            dispatch(setUser(null))
            dispatch(setCart([]))

            toast.success(res.data.message)

            navigate("/login")
        }

    } catch (error) {

        console.log(error.response?.data)

        
        localStorage.removeItem("accessToken")
        dispatch(setUser(null))
        dispatch(setCart([]))

        navigate("/login")
    }
}


//     useEffect(() => {
//   const fetchCart = async () => {
//     const res = await axios.get(
//         `${import.meta.env.VITE_URL}/api/v1/cart`,
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

// return (
//   <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
//     <div className="max-w-7xl mx-auto flex justify-between items-center py-1 px-4">

//       {/* Logo */}
//       <img src="/Ekart.png" className="w-[100px]" />

//       {/* Desktop Nav */}
//       <nav className="hidden md:flex gap-8 items-center">

//         <ul className="flex items-center space-x-6">
//           <Link to="/"><li>Home</li></Link>
//           <Link to="/products"><li>Products</li></Link>

//           {user && (
//             <Link to={`/profile/${user._id}`}>
//               <li>Hello, {user.firstName}</li>
//             </Link>
//           )}

//           {admin && (
//             <Link to="/dashboard/sales">
//               <li>Dashboard</li>
//             </Link>
//           )}
//         </ul>

//         {/* Cart */}
//         <Link to="/cart" className="relative">
//           <ShoppingCart />
//           <span className="bg-pink-500 rounded-full absolute text-white -top-2 -right-3 px-2 text-sm">
//             {cart?.items?.length || 0}
//           </span>
//         </Link>

//         {/* Auth Button */}
//         {user ? (
//           <Button
//             onClick={logoutHandler}
//             className="bg-pink-600 text-white"
//           >
//             Logout
//           </Button>
//         ) : (
//           <Button
//             onClick={() => navigate("/login")}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//           >
//             Login
//           </Button>
//         )}
//       </nav>

//       {/* Mobile Cart + Menu */}
//       <div className="flex items-center gap-4 md:hidden">

//         <Link to="/cart" className="relative">
//           <ShoppingCart />
//           <span className="bg-pink-500 rounded-full absolute text-white -top-2 -right-3 px-2 text-xs">
//             {cart?.items?.length || 0}
//           </span>
//         </Link>

//         {/* Simple Mobile Menu Button */}
//         <button onClick={() => setMobileOpen(!mobileOpen)}>
//           ☰
//         </button>
//       </div>
//     </div>

//     {/* Mobile Menu */}
//     {mobileOpen && (
//       <div className="md:hidden bg-white border-t border-pink-200 px-4 py-4 space-y-4">
//         <Link to="/">Home</Link>
//         <Link to="/products">Products</Link>

//         {user && (
//           <Link to={`/profile/${user._id}`}>
//             Hello, {user.firstName}
//           </Link>
//         )}

//         {admin && (
//           <Link to="/dashboard/sales">
//             Dashboard
//           </Link>
//         )}

//         {user ? (
//           <Button
//             onClick={logoutHandler}
//             className="w-full bg-pink-600 text-white"
//           >
//             Logout
//           </Button>
//         ) : (
//           <Button
//             onClick={() => navigate("/login")}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//           >
//             Login
//           </Button>
//         )}
//       </div>
//     )}
//   </header>
// )


useEffect(() => {

    const fetchCart = async () => {

        try {

            const token = localStorage.getItem("accessToken")

            if (!token || !user) {
                return
            }

            const res = await axios.get(
                `${import.meta.env.VITE_URL}/api/v1/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            dispatch(setCart(res.data.cart))

        } catch (error) {

            console.log(error.response?.data)

            dispatch(setCart([]))
        }
    }

    fetchCart()

}, [user])

return (
  <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
    <div className="max-w-7xl mx-auto flex justify-between items-center h-14 px-6">

      {/* Logo */}
      <img src="/Ekart.png" className="w-24 object-contain" />

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-10">

        <ul className="flex items-center gap-8 text-[15px] font-medium">
          <Link to="/" className="hover:text-pink-600 transition">
            <li>Home</li>
          </Link>

          <Link to="/products" className="hover:text-pink-600 transition">
            <li>Products</li>
          </Link>

          {user && (
            <Link
              to={`/profile/${user._id}`}
              className="hover:text-pink-600 transition"
            >
              <li>Hello, {user.firstName}</li>
            </Link>
          )}

          {admin && (
            <Link
              to="/dashboard/sales"
              className="hover:text-pink-600 transition"
            >
              <li>Dashboard</li>
            </Link>
          )}
        </ul>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <ShoppingCart size={22} />
          <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-1.5 rounded-full">
            {cart?.items?.length || 0}
          </span>
        </Link>

        {/* Auth Button */}
        {user ? (
          <Button
            onClick={logoutHandler}
            className="bg-pink-600 text-white px-4 py-1.5 text-sm rounded-md hover:bg-pink-700"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 text-sm rounded-md"
          >
            Login
          </Button>
        )}
      </nav>

      {/* Mobile Cart + Menu */}
      <div className="flex items-center gap-4 md:hidden">

        <Link to="/cart" className="relative">
          <ShoppingCart size={22} />
          <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-1.5 rounded-full">
            {cart?.items?.length || 0}
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-xl"
        >
          ☰
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {mobileOpen && (
      <div className="md:hidden bg-white border-t border-pink-200 px-6 py-5 space-y-4 shadow-md">
        <Link to="/" className="block hover:text-pink-600">
          Home
        </Link>

        <Link to="/products" className="block hover:text-pink-600">
          Products
        </Link>

        {user && (
          <Link
            to={`/profile/${user._id}`}
            className="block hover:text-pink-600"
          >
            Hello, {user.firstName}
          </Link>
        )}

        {admin && (
          <Link
            to="/dashboard/sales"
            className="block hover:text-pink-600"
          >
            Dashboard
          </Link>
        )}

        {user ? (
          <Button
            onClick={logoutHandler}
            className="w-full bg-pink-600 text-white py-2 rounded-md"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-pink-600 text-white py-2 rounded-md"
          >
            Login
          </Button>
        )}
      </div>
    )}
  </header>
);


}

export default Navbar


