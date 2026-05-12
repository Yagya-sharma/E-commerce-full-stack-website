import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";
// export const getCart=async(req,res)=>{
//     try {
//         const userId=req.id;
//         const cart =await Cart.findOne({userId}).populate("items.productId")
//         if(!cart){
//             return res.status(400).json({
//                 success:true,
//                 cart:[]
//             })
//             res.status(200).json({
//                 success:true,
//                 cart
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// export const addToCart=async(req,res)=>{
//     try {
//         const userId=req.id;
//         const {productId}=req.body

//         //check if product exist
//         const product=await product.findById(productId)
//         if(!product){
//             return res.status(404).json({
//                 success:false,
//                 message:"Product not found"
//             })
//         }
//         let cart=await Cart.findOne({userId})

//         //if cart does not exist create a new one
//         if(!cart){
//             cart=new Cart({
//                 userId,
//                 items:[{productId,quantity:1,price:product.productPrice}],
//                 totalPrice:product.productPrice
//             })
//         }else{
//             //find if product is already in the cart
//             const itemIndex=cart.items.findIndex(
//                 (item)=>item.productId.toString()===productId
//             )
//             if(itemIndex > -1){
//                 //if product exist just increase quantity
//                 cart.items[itemIndex].quantity+=1
//             } else{
//                 // if new product -> push to cart
//                 cart.items.push({
//                     productId,
//                     quantity:1,
//                     price:product.productPrice,
//                 })
//             }
//             //recalculate total price
//             cart.totalPrice=cart.items.reduce(
//                 (acc,item)=>acc+item.price*item.quantity
//             )
//         }

//         //save updated cart
//         await cart.save()
//         //populate product deatils before sending response
//         const populatedCart=await Cart.findById(cart._id).populate("items.productId")

//         res.status(200).json({
//             success:true,
//             message:"Product added to cart successfully",
//             cart:populatedCart
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }



// export const getCart = async (req, res) => {
//   try {
//     const userId = req.id;


export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: null
      });
    }

    return res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const userId = req.user._id;

    
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

   
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        totalPrice: 0
      });
    }

  
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
        price: foundProduct.productPrice 
      });
    }

   
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// export const updateQuantity=async(req,res)=>{
//     try {
//         const userId=req.id;
//         const {productId,type}=req.body
//         let cart=await Cart.findOne({userId})
//         if(!cart) return res.status(404).json({success:false,message:"Cart not found"})
//             const item=cart.items.find(item=>item.productId.toString()===productId)
//             if(!item) return res.status(404).json({success:false,message:"Items not found"})
//                 if(type==="increase") item.quantity+=1
//                 if(type==="decrease" && item.quantity>1) item.quantity-=1

//                 cart.totalPrice=cart.items.reduce((acc,item)=>acc+item.price+item.quantity,0)

//                 await cart.save()
//                 cart=await cart.populate("items.productId")
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, type } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }
    if (type === "increase") {
      item.quantity += 1;
    } else if (type === "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    }
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    cart = await Cart.findOne({ userId }).populate("items.productId");
    return res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const removeFromCart=async(req,res)=>{
    try {
        const userId=req.id
        const {productId}=req.body

        let cart=await Cart.findOne({userId});
        if(!cart) return res.status(404).json({
            success:false,
            message:"Cart not found"
        })

        cart.items=cart.items.filter(item=>item.productId.toString()!==productId)
        cart.totalPrice=cart.items.reduce((acc,item)=>acc+item.price*item.quantity,0)

        cart=await cart.populate("items.productId")

        await cart.save()
        res.status(200).json({
            success:true,
            cart
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}