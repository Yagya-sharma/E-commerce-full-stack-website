import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import cors from 'cors'

const app=express()
const PORT=process.env.PORT || 3000

//middleware
app.use(express.json())
// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     credentials:true,
//     methods:['GET','POST','PUT','DELETE','OPTIONS'],
//     allowedHeaders:['Content-Type','Authorization']
// }))

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://e-commerce-frontend-9tod.onrender.com" // deployed frontend
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like Postman
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));


app.use('/api/v1/user',userRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/cart',cartRoute)
app.use('/api/v1/orders',orderRoute)

//http://localhost:8000/api/v1/user/register

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running at port ${PORT}`)
})