// import Breadcrums from '@/components/Breadcrums'
// import ProductDesc from '@/components/ProductDesc'
// import ProductImg from '@/components/ProductImg'
// // import store from '@/redux/store'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

// const SingleProduct = () => {
//     const params=useParams()
//     const productId=params.id
//     const {products}=useSelector(store=>store.product)
//     const product=products.find((item)=>item._id===productId)
//   return (
//     <div className='pt-30 py-10 max-w-7xl mx-auto'>
//       <Breadcrums product={product} />
//       <div className='mt-10 grid grid-cols-2 items-start'>
//         <ProductImg images={product.productImg} />
//         <ProductDesc product={product} />
//       </div>
//     </div>
//   )
// }

// export default SingleProduct

import Breadcrums from '@/components/Breadcrums'
import ProductDesc from '@/components/ProductDesc'
import ProductImg from '@/components/ProductImg'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const params = useParams()
  const productId = params.id
  const { products } = useSelector(store => store.product)
  const product = products.find((item) => item._id === productId)

  if (!product) return null

  return (
    <div className='pt-28 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
      
      <div className='max-w-7xl mx-auto px-4'>
        
        {/* Breadcrumb */}
        <Breadcrums product={product} />

        {/* Main Section */}
        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          
          {/* Product Image */}
          <div className='bg-white rounded-2xl shadow-lg p-6'>
            <ProductImg images={product.productImg} />
          </div>

          {/* Product Description */}
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <ProductDesc product={product} />
          </div>

        </div>

      </div>
    </div>
  )
}

export default SingleProduct

