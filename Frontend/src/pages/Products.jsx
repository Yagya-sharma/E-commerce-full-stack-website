// import FilterSideBar from '@/components/FilterSideBar'
// import React, { useEffect,useState } from 'react'

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import ProductCard from '@/components/ProductCard'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { setProducts } from '@/redux/productSlice'

// const Products = () => {

//     const {products}=useSelector(store=>store.product)
//     const [allProducts,setAllProducts]=useState([])
//     const [loading,setLoading]=useState(false)
//     const [search,setSearch]=useState("")
//     const [category,setCategory]=useState("All")
//     const [brand,setBrand]=useState("All")
//     const [priceRange,setPriceRange]=useState([0,999999])
//     const [sortOrder,setSortOrder]=useState('');
//     const dispatch=useDispatch()

//     const getAllProducts=async()=>{
//         try {
//             setLoading(true)
//             const res=await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/getallproducts`)
//             if(res.data.success){
//                 setAllProducts(res.data.products)
//                 dispatch(setProducts(res.data.products))
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error(error.response.data.message)
            
//         }finally{
//             setLoading(false)
//         }
//     }

//     useEffect(()=>{
//         if(allProducts.length==0) return;
//         let filtered=[...allProducts]
//         if(search.trim()!==""){
//             filtered=filtered.filter(p=>p.productName?.toLowerCase().includes(search.toLowerCase()))
//         }
//         if(category!=="All"){
//             filtered=filtered.filter(p=>p.category===category)
//         }
//         if(brand!=="All"){
//             filtered=filtered.filter(p=>p.brand===brand)
//         }
//         filtered=filtered.filter(p=>p.productPrice>=priceRange[0] && p.productPrice<=priceRange[1])

//         if(sortOrder==="lowToHigh"){
//             filtered.sort((a,b)=>a.productPrice-b.productPrice)
//         }else if(sortOrder==="highToLow"){
//             filtered.sort((a,b)=>b.productPrice-a.productPrice)
//         }

//         dispatch(setProducts(filtered))
//     },[search,category,brand,sortOrder,priceRange,allProducts,dispatch])

//     useEffect(()=>{
//         getAllProducts()
//     },[])

//     console.log(allProducts)

//     return (
//   <div className="pt-24 pb-10 px-4">
//     <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-7">

//       {/* Sidebar */}
//       <div className="w-full lg:w-64">
//         <FilterSideBar
//           allProducts={allProducts}
//           priceRange={priceRange}
//           search={search}
//           setSearch={setSearch}
//           brand={brand}
//           setBrand={setBrand}
//           category={category}
//           setCategory={setCategory}
//           setPriceRange={setPriceRange}
//         />
//       </div>

//       {/* Main Product Section */}
//       <div className="flex flex-col flex-1">

//         {/* Sort Dropdown */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold hidden sm:block">
//             Products
//           </h2>

//           <Select onValueChange={(value) => setSortOrder(value)}>
//             <SelectTrigger className="w-full sm:w-[200px]">
//               <SelectValue placeholder="Sort by price" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value="lowToHigh">
//                   Price: Low to High
//                 </SelectItem>
//                 <SelectItem value="highToLow">
//                   Price: High to Low
//                 </SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard
//               key={product.id}
//               product={product}
//               loading={loading}
//             />
//           ))}
//         </div>

//       </div>
//     </div>
//   </div>
// );
// }

// export default Products




import FilterSideBar from '@/components/FilterSideBar'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductCard from '@/components/ProductCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '@/redux/productSlice'
import { toast } from 'sonner'

const Products = () => {
  const { products } = useSelector(store => store.product)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 999999])
  const [sortOrder, setSortOrder] = useState('')
  const [showSidebar, setShowSidebar] = useState(false) // For mobile toggle
  const dispatch = useDispatch()

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/getallproducts`)
      if (res.data.success) {
        setAllProducts(res.data.products)
        dispatch(setProducts(res.data.products))
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (allProducts.length === 0) return
    let filtered = [...allProducts]

    if (search.trim() !== "") {
      filtered = filtered.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category)
    }
    if (brand !== "All") {
      filtered = filtered.filter(p => p.brand === brand)
    }

    filtered = filtered.filter(
      p => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    )

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice)
    }

    dispatch(setProducts(filtered))
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch])

  useEffect(() => {
    getAllProducts()
  }, [])

  

  return (
    <div className="pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-7">

        {/* Mobile Filter Button */}
        <div className="w-full flex justify-end mb-4 lg:hidden">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Sidebar */}
        
          <div className={`${showSidebar ? "block" : "hidden"} lg:block w-full lg:w-72 xl:w-80 flex-shrink-0 mb-4 lg:mb-0`}>
            <FilterSideBar
              allProducts={allProducts}
              priceRange={priceRange}
              search={search}
              setSearch={setSearch}
              brand={brand}
              setBrand={setBrand}
              category={category}
              setCategory={setCategory}
              setPriceRange={setPriceRange}
            />
          </div>
        

        {/* Main Product Section */}
        <div className="flex-1 flex flex-col">
          {/* Sort Dropdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-lg font-semibold">Products</h2>
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} loading={loading} />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Products
