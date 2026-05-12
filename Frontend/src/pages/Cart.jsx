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
import { toast } from 'sonner'

const Cart = () => {
  const {cart}=useSelector(store=>store.product)
  console.log(cart)

  const subtotal=cart?.totalPrice
  const shipping=subtotal>299?0:10;
  const tax=subtotal*0.05  //5%
  const total=subtotal+shipping+tax
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const API=`${import.meta.env.VITE_URL}/api/v1/cart`
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
    <div className='pt-30 bg-gray-50 min-h-screen w-full overflow-x-hidden'>
      {
        cart?.items?.length > 0 ?
         <div className='max-w-7xl mx-auto'>
          <h1 className='text-2xl font-bold text-gray-800 mb-7'>Shopping Cart</h1>
          <div className='flex flex-col lg:flex-row gap-7 items-start w-full'>
            <div className='flex flex-col gap-5 flex-1 min-w-0'>
              {cart?.items?.map((product,index)=>{
                return <Card key={index}>
                  <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 items-center w-full'>
                    <div className='flex items-center gap-4 flex-1'>
                      <img src={product?.productId?.productImg?.[0]?.url || userLogo} alt="" className='w-20 h-20 flex-shrink-0 object-cover' />
                      <div className='flex-1 min-w-0'>
                        <h1 className='font-semibold truncate max-w-full'>{product?.productId?.productName}</h1>
                        <p>₹{product?.productId?.productPrice}</p>
                      </div>
                    </div>
                    <div className='flex gap-5 items-center flex-shrink-0'>
                      <Button onClick={()=>handleUpdateQuantity(product.productId._id,'decrease')} variant='outline'>-</Button>
                      <span>{product.quantity}</span>
                      <Button onClick={()=>handleUpdateQuantity(product.productId._id,'increase')} variant='outline'>+</Button>
                    </div>
                    <p>₹{(product?.productId?.productPrice)*(product?.quantity)}</p>
                    <p onClick={()=>handleRemove(product?.productId?._id)} className='flex text-red-500 items-center gap-1 cursor-pointer whitespace-nowrap flex-shrink-0'><Trash2 className='w-4 h-4' />Remove</p>
                  </div>
                </Card>
              })}
            </div>
            {/* <div className='w-full lg:w-[320px] flex-shrink-0'>
              <Card className='w-full'>
              <CardHeader>
                <CardTitle>OrderSummary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-between'>
                  <span>Subtotal ({cart?.items?.length}items)</span>
                  <span>₹{cart?.totalPrice?.toLocaleString('en-IN')}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Tax(5%)</span>
                  <span>₹{tax}</span>
                </div>
                <Separator/>
                <div className='flex justify-between font-bold text-lg'>
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <div className='space-y-3 pt-4'>
                  <div className='flex space-x-2'>
                    <Input placeholder="Promo Code"/>
                    <Button variant='outline'>Apply</Button>
                  </div>
                  <Button onClick={()=>navigate('/address')} className='w-full bg-pink-600'>PLACE ORDER</Button>
                  <Button variant='outline' className='w-full bg-transparent'>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
                <div className='text-sm text-muted-foreground pt-4'>
                  <p>* Free shipping on orders over 299</p>
                  <p>* 30-days return policy</p>
                  <p>* Secure cheeckout with SSL encryption</p>
                </div>
              </CardContent>
              </Card>
            </div> */}
            <div className='w-full lg:w-[320px] flex-shrink-0 lg:sticky lg:top-24'>
  <Card className='w-full'>
    <CardHeader>
      <CardTitle>OrderSummary</CardTitle>
    </CardHeader>

    <CardContent className='space-y-4'>
      <div className='flex justify-between'>
        <span>Subtotal ({cart?.items?.length}items)</span>
        <span>₹{cart?.totalPrice?.toLocaleString('en-IN')}</span>
      </div>

      <div className='flex justify-between'>
        <span>Shipping</span>
        <span>₹{shipping}</span>
      </div>

      <div className='flex justify-between'>
        <span>Tax(5%)</span>
        <span>₹{tax}</span>
      </div>

      <Separator/>

      <div className='flex justify-between font-bold text-lg'>
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <div className='space-y-3 pt-4'>
        <div className='flex space-x-2'>
          <Input placeholder="Promo Code"/>
          <Button variant='outline'>Apply</Button>
        </div>

        <Button onClick={()=>navigate('/address')} className='w-full bg-pink-600'>
          PLACE ORDER
        </Button>

        <Button variant='outline' className='w-full bg-transparent'>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>

      <div className='text-sm text-muted-foreground pt-4'>
        <p>* Free shipping on orders over 299</p>
        <p>* 30-days return policy</p>
        <p>* Secure checkout with SSL encryption</p>
      </div>
    </CardContent>
  </Card>
</div>
          </div>
        </div>:<div className='flex flex-col items-center justify-center min-h-[60vh] p-6 text-center'>
          {/* icon */}
          <div className='bg-pink-100 p-6 rounded-full'>
            <ShoppingCart className='w-16 h-16 text-pink-600' />
          </div>
          {/* title */}
          <h2 className='mt-6 text-2xl font-bold text-gray-800'>Your Cart is Empty</h2>
          <p className='mt-2 text-gray-600'>Looks like you haven't added anything to your cart yet</p>
          <Button onClick={()=>navigate('/products')} className='mt-6 cursor-pointer bg-pink-600 text-white py-3 px-6 hover:bg-pink-700'>Start Shopping</Button>
        </div>
      }
    </div>

  )
}

export default Cart
