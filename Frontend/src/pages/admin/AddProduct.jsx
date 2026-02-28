import ImageUpload from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { setProducts } from '@/redux/productSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const AddProduct = () => {
    const accessToken=localStorage.getItem("accessToken")
    const dispatch=useDispatch()
    const {products}=useSelector(store=>store.product)
    const [loading,setLoading]=useState(false)
    const [productData,setProductData]=useState({
        productName:"",
        productPrice:0,
        productDesc:"",
        productImg:[],
        brand:"",
        category:""
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setProductData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const submitHandler=async(e)=>{
        e.preventDefault()
        const formData=new FormData();
        formData.append("productName",productData.productName)
        formData.append("productPrice",productData.productPrice)
        formData.append("productDesc",productData.productDesc)
        formData.append("category",productData.category)
        formData.append("brand",productData.brand)

        if(productData.productImg.length===0){
            toast.error("Please select at least one image")
            return
        }
        productData.productImg.forEach((img)=>{
            formData.append("files",img)
        })
        try {
            setLoading(true)
            const res=await axios.post(`http://localhost:8000/api/v1/product/add`,formData,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            if(res.data.success){
                dispatch(setProducts([...products,res.data.product]))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }


return (
  <div className='md:pl-[300px] py-16 px-4 bg-pink-50 min-h-screen'>
    
    <div className='max-w-4xl mx-auto'>
      <Card className='shadow-lg border border-pink-100 rounded-2xl'>
        
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-gray-800'>
            Add Product
          </CardTitle>
          <CardDescription className='text-gray-500'>
            Enter product details below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col gap-6'>

            {/* Product Name */}
            <div className='grid gap-2'>
              <Label>Product Name</Label>
              <Input
                type='text'
                name='productName'
                value={productData.productName}
                onChange={handleChange}
                placeholder="Ex - iPhone"
                className='focus-visible:ring-pink-500'
              />
            </div>

            {/* Price */}
            <div className='grid gap-2'>
              <Label>Price</Label>
              <Input
                type='number'
                name='productPrice'
                value={productData.productPrice}
                onChange={handleChange}
                className='focus-visible:ring-pink-500'
              />
            </div>

            {/* Brand + Category */}
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label>Brand</Label>
                <Input
                  type='text'
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  placeholder="Ex - Apple"
                  className='focus-visible:ring-pink-500'
                />
              </div>

              <div className='grid gap-2'>
                <Label>Category</Label>
                <Input
                  type='text'
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="Ex - Mobile"
                  className='focus-visible:ring-pink-500'
                />
              </div>
            </div>

            {/* Description */}
            <div className='grid gap-2'>
              <Label>Description</Label>
              <Textarea
                name='productDesc'
                value={productData.productDesc}
                onChange={handleChange}
                placeholder='Enter brief description of product'
                className='focus-visible:ring-pink-500'
              />
            </div>

            {/* Image Upload */}
            <ImageUpload 
              productData={productData} 
              setProductData={setProductData} 
            />

          </div>

          <CardFooter className='flex-col gap-3 mt-6 p-0'>
            <Button
              disabled={loading}
              onClick={submitHandler}
              type="submit"
              className='w-full bg-pink-600 hover:bg-pink-700 text-white transition-all duration-200'
            >
              {
                loading
                  ? (
                    <span className='flex gap-2 items-center'>
                      <Loader2 className='animate-spin w-4 h-4' />
                      Please wait...
                    </span>
                  )
                  : 'Add Product'
              }
            </Button>
          </CardFooter>

        </CardContent>
      </Card>
    </div>
  </div>
)

}

export default AddProduct
