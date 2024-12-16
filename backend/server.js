import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// Import Routes
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import newsletterRouter from './routes/newsletterRoute.js'; // Import Newsletter Route

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Database and Cloudinary Connections
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/newsletter', newsletterRouter); // Connect Newsletter Route

// Health Check
app.get('/', (req, res) => {
    res.send('API Working');
});

// Server Listener
app.listen(port, () => console.log(`Server running on PORT: ${port}`));
