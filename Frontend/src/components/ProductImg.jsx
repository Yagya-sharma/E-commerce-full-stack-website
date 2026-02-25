import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images[0].url)

  return (
    <div className='flex gap-8'>
      
      {/* Thumbnails */}
      <div className='flex flex-col gap-4'>
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setMainImg(img.url)}
            className={`p-1 rounded-lg cursor-pointer border transition-all duration-200 
              ${mainImg === img.url 
                ? "border-purple-600 shadow-lg scale-105" 
                : "border-gray-200 hover:border-purple-400"
              }`}
          >
            <img
              src={img.url}
              alt=""
              className='w-20 h-20 object-cover rounded-md'
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className='bg-gray-50 p-4 rounded-xl shadow-md'>
        <Zoom>
          <img
            src={mainImg}
            alt=""
            className='w-[500px] h-[500px] object-contain rounded-lg'
          />
        </Zoom>
      </div>

    </div>
  )
}

export default ProductImg

