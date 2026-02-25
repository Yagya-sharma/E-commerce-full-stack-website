import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userLogo from "../assets/user.jpg"
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setCart } from '@/redux/productSlice'

const Cart = () => {
  const {cart}=useSelector(store=>store.product)
  console.log(cart)

  const subtotal=cart?.totalPrice
  const shipping=subtotal>299?0:10;
  const tax=subtotal*0.05  //5%
  const total=subtotal+shipping+tax
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const API="http://localhost:8000/api/v1/cart"
  const accessToken=localStorage.getItem("accessToken")

  const loadCart=async()=>{
    try {
      const res=await axios.get(API,{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateQuantity=async(productId,type)=>{
    try {
      const res=await axios.put(`${API}/update`,{productId,type},{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove=async(productId)=>{
    try {
      const res=await axios.delete(`${API}/remove`,{
        headers:{
          Authorization:`Bearer ${accessToken}`
        },
        data:{productId}
      })
      if(res.data.success){
        dispatch(setCart(res.data.cart))
        toast.success('Product removed from cart')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    loadCart()
  },[dispatch])


  return (
    // <div className='pt-30 bg-gray-50 min-h-screen'>
    //   {
    //     cart?.items?.length > 0 ?
    //      <div className='max-w-7xl mx-auto'>
    //       <h1 className='text-2xl font-bold text-gray-800 mb-7'>Shopping Cart</h1>
    //       <div className='max-w-7xl mx-auto flex gap-7'>
    //         <div className='flex flex-col gap-5 flex-1'>
    //           {cart?.items?.map((product,index)=>{
    //             return <Card key={index}>
    //               <div className='flex justify-between items-center pr-7'>
    //                 <div className='flex items-center w-[350px]'>
    //                   <img src={product?.productId?.productImg?.[0]?.url || userLogo} alt="" className='w-25 h-25' />
    //                   <div className='w-[280px]'>
    //                     <h1 className='font-semibold truncate'>{product?.productId?.productName}</h1>
    //                     <p>₹{product?.productId?.productPrice}</p>
    //                   </div>
    //                 </div>
    //                 <div className='flex gap-5 items-center'>
    //                   <Button onClick={()=>handleUpdateQuantity(product.productId._id,'decrease')} variant='outline'>-</Button>
    //                   <span>{product.quantity}</span>
    //                   <Button onClick={()=>handleUpdateQuantity(product.productId._id,'increase')} variant='outline'>+</Button>
    //                 </div>
    //                 <p>₹{(product?.productId?.productPrice)*(product?.quantity)}</p>
    //                 <p onClick={()=>handleRemove(product?.productId?._id)} className='flex text-red-500 items-center gap-1 cursor-pointer'><Trash2 className='w-4 h-4' />Remove</p>
    //               </div>
    //             </Card>
    //           })}
    //         </div>
    //         <div>
    //           <Card className='w-[400px]'>
    //           <CardHeader>
    //             <CardTitle>OrderSummary</CardTitle>
    //           </CardHeader>
    //           <CardContent className='space-y-4'>
    //             <div className='flex justify-between'>
    //               <span>Subtotal ({cart?.items?.length}items)</span>
    //               <span>₹{cart?.totalPrice?.toLocaleString('en-IN')}</span>
    //             </div>
    //             <div className='flex justify-between'>
    //               <span>Shipping</span>
    //               <span>₹{shipping}</span>
    //             </div>
    //             <div className='flex justify-between'>
    //               <span>Tax(5%)</span>
    //               <span>₹{tax}</span>
    //             </div>
    //             <Separator/>
    //             <div className='flex justify-between font-bold text-lg'>
    //               <span>Total</span>
    //               <span>₹{total}</span>
    //             </div>
    //             <div className='space-y-3 pt-4'>
    //               <div className='flex space-x-2'>
    //                 <Input placeholder="Promo Code"/>
    //                 <Button variant='outline'>Apply</Button>
    //               </div>
    //               <Button onClick={()=>navigate('/address')} className='w-full bg-pink-600'>PLACE ORDER</Button>
    //               <Button variant='outline' className='w-full bg-transparent'>
    //                 <Link to="/products">Continue Shopping</Link>
    //               </Button>
    //             </div>
    //             <div className='text-sm text-muted-foreground pt-4'>
    //               <p>* Free shipping on orders over 299</p>
    //               <p>* 30-days return policy</p>
    //               <p>* Secure cheeckout with SSL encryption</p>
    //             </div>
    //           </CardContent>
    //           </Card>
    //         </div>
    //       </div>
    //     </div>:<div className='flex flex-col items-center justify-center min-h-[60vh] p-6 text-center'>
    //       {/* icon */}
    //       <div className='bg-pink-100 p-6 rounded-full'>
    //         <ShoppingCart className='w-16 h-16 text-pink-600' />
    //       </div>
    //       {/* title */}
    //       <h2 className='mt-6 text-2xl font-bold text-gray-800'>Your Cart is Empty</h2>
    //       <p className='mt-2 text-gray-600'>Looks like you haven't added anything to your cart yet</p>
    //       <Button onClick={()=>navigate('/products')} className='mt-6 cursor-pointer bg-pink-600 text-white py-3 px-6 hover:bg-pink-700'>Start Shopping</Button>
    //     </div>
    //   }
    // </div>

    <div className='pt-30 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
  {
    cart?.items?.length > 0 ?
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>
          Shopping Cart
        </h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          
          {/* LEFT SIDE - CART ITEMS */}
          <div className='flex flex-col gap-5 flex-1'>
            {cart?.items?.map((product, index) => (
              <Card key={index} className="shadow-md hover:shadow-xl transition duration-300 rounded-2xl">
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4 p-5'>

                  {/* Product Info */}
                  <div className='flex items-center gap-4 w-full sm:w-[350px]'>
                    <img
                      src={product?.productId?.productImg?.[0]?.url || userLogo}
                      alt=""
                      className='w-24 h-24 rounded-xl object-cover border'
                    />
                    <div className='w-full'>
                      <h1 className='font-semibold text-gray-800 truncate'>
                        {product?.productId?.productName}
                      </h1>
                      <p className='text-purple-600 font-bold'>
                        ₹{product?.productId?.productPrice}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className='flex gap-4 items-center'>
                    <Button
                      onClick={() => handleUpdateQuantity(product.productId._id, 'decrease')}
                      variant='outline'
                      className="rounded-full"
                    >
                      -
                    </Button>

                    <span className='font-semibold'>
                      {product.quantity}
                    </span>

                    <Button
                      onClick={() => handleUpdateQuantity(product.productId._id, 'increase')}
                      variant='outline'
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>

                  {/* Price */}
                  <p className='font-semibold text-gray-800'>
                    ₹{product?.productId?.productPrice * product?.quantity}
                  </p>

                  {/* Remove */}
                  <p
                    onClick={() => handleRemove(product?.productId?._id)}
                    className='flex items-center gap-1 cursor-pointer text-red-500 hover:text-red-600'
                  >
                    <Trash2 className='w-4 h-4' />
                    Remove
                  </p>

                </div>
              </Card>
            ))}
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <Card className='w-full lg:w-[400px] shadow-xl rounded-2xl'>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Order Summary
              </CardTitle>
            </CardHeader>

            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span>Subtotal ({cart?.items?.length} items)</span>
                <span>₹{cart?.totalPrice?.toLocaleString('en-IN')}</span>
              </div>

              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className='flex justify-between'>
                <span>Tax (5%)</span>
                <span>₹{tax?.toFixed(2)}</span>
              </div>

              <Separator />

              <div className='flex justify-between font-bold text-lg text-purple-700'>
                <span>Total</span>
                <span>₹{total?.toFixed(2)}</span>
              </div>

              <div className='space-y-3 pt-4'>
                <div className='flex gap-2'>
                  <Input placeholder="Promo Code" />
                  <Button variant='outline'>
                    Apply
                  </Button>
                </div>

                <Button
                  onClick={() => navigate('/address')}
                  className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white'
                >
                  PLACE ORDER
                </Button>

                <Button variant='outline' className='w-full'>
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              <div className='text-sm text-gray-500 pt-4 space-y-1'>
                <p>* Free shipping on orders over ₹299</p>
                <p>* 30-days return policy</p>
                <p>* Secure checkout with SSL encryption</p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
      :
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
        <div className='bg-purple-100 p-6 rounded-full'>
          <ShoppingCart className='w-16 h-16 text-purple-600' />
        </div>

        <h2 className='mt-6 text-2xl font-bold text-gray-800'>
          Your Cart is Empty
        </h2>

        <p className='mt-2 text-gray-600'>
          Looks like you haven't added anything yet.
        </p>

        <Button
          onClick={() => navigate('/products')}
          className='mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 hover:opacity-90'
        >
          Start Shopping
        </Button>
      </div>
  }
</div>

  )
}

export default Cart
