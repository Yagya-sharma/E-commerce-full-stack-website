// import React from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { setCart } from '@/redux/productSlice'

// const ProductDesc = ({product}) => {
//     const accessToken=localStorage.getItem("accessToken")
//     const dispatch=useDispatch()
//     const addToCart=async(productId)=>{
//         try {
//             const res=await axios.post('http://localhost:8000/api/v1/cart/add',{productId},{
//                 headers:{
//                     Authorization:`Bearer ${accessToken}`
//                 }
//             })
//             if(res.data.success){
//                 toast.success('Product added to cart')
//                 dispatch(setCart(res.data.cart))
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//   return (
//     <div className='flex flex-col gap-4'>
//       <h1 className='font-bold text-4xl text-gray-800'>{product.productName}</h1>
//       <p className='text-gray-800'>{product.category} | {product.brand}</p>
//       <h2 className='text-pink-500 font-bold text-2xl'>₹{product.productPrice}</h2>
//       <p className='line-clamp-12 text-muted-foreground'>{product.productDesc}</p>
//       <div className='flex gap-2 items-center w-[300px]'>
//         <p className='text-gray-800 font-semibold'>Quantity:</p>
//         <Input type='number' className='w-14' defaultValue={1} /> 
//       </div>
//       <Button onClick={()=>addToCart(product._id)} className='bg-pink-600 w-max'>Add to Cart</Button>
//     </div>
//   )
// }

// export default ProductDesc


import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCart } from '@/redux/productSlice'
import { toast } from 'sonner'

const ProductDesc = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()

  const addToCart = async (productId) => {
    if (!accessToken) {
      toast.error("Please login to add items to cart")
      return
    }

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/cart/add',
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res.data.success) {
        toast.success('Product added to cart')
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      
      {/* Product Name */}
      <h1 className='font-bold text-4xl text-gray-800'>
        {product.productName}
      </h1>

      {/* Category & Brand */}
      <p className='text-gray-500 text-sm'>
        {product.category} • {product.brand}
      </p>

      {/* Price */}
      <h2 className='text-purple-600 font-bold text-3xl'>
        ₹{product.productPrice}
      </h2>

      {/* Description */}
      <p className='text-gray-600 leading-relaxed'>
        {product.productDesc}
      </p>

      {/* Quantity */}
      <div className='flex items-center gap-4'>
        <p className='font-semibold text-gray-700'>Quantity:</p>
        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border-gray-300 focus:ring-purple-500"
        />
      </div>

      {/* Button */}
      <Button
        onClick={() => addToCart(product._id)}
        className='bg-purple-600 hover:bg-purple-700 transition-all duration-200 w-max px-6'
      >
        Add to Cart
      </Button>

    </div>
  )
}

export default ProductDesc


