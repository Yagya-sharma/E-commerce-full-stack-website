// import React from 'react'
// import { Button } from './ui/button'

// const Hero = () => {
//   return (
//     <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16'>
//         <div className='max-w-7xl mx-auto px-4'>
//             <div className='grid md:grid-cols-2 gap-8 item-center'>
//                 <div>
//                     <h1 className='text-4xl md:text-6xl font-bold mb-4'>Latest Electronics at Best prices</h1>
//                     <p className='text-xl mb-6 text-blue-100'>Discover cutting-edge technology with unbeatable deals on smartphones, laptops and more.</p>
//                     <div className='flex flex-col sm:flex-row gap-4'>
//                         <Button className='bg-white text-blue-600 hover:bg-gray-100'>Shop Now</Button>
//                         <Button variant='outline' className='border-white text-white hover:bg-white hover:text-blue-600 bg-transparent'>View deals</Button>
//                     </div>
//                 </div>
//                 <div className='relative'>
//                     <img src="/ekart-hero1.png" alt="" width={500} height={800} className='rounded-lg shadow-2xl'/>
//                 </div>
//             </div>
//         </div>
//     </section>
//   )
// }

// export default Hero


import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>

          {/* Text Section */}
          <div className='space-y-6'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight'>
              Latest Electronics at Best Prices
            </h1>
            <p className='text-lg sm:text-xl text-blue-100 leading-relaxed'>
              Discover cutting-edge technology with unbeatable deals on smartphones, laptops, and more.
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button className='bg-white text-blue-600 hover:bg-gray-100 transition duration-200 font-medium px-6 py-3 rounded-lg'>
                Shop Now
              </Button>
              <Button variant='outline' className='border-white text-white hover:bg-white hover:text-blue-600 bg-transparent'>
                View Deals
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className='relative flex justify-center md:justify-end'>
            <img
              src="/ekart-hero1.png"
              alt="Electronics Hero"
              className='w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl shadow-2xl object-cover'
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero


