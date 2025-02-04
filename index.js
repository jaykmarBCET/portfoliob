import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import dbConnect from './src/lib/db.config.js';
import SetUpRoutes from './src/setup/route.setup.js';
import Account from './src/setup/account.setup.js'
import Feedback from './src/setup/feedback.setup.js'
import cookieParser from 'cookie-parser';
import GrabRouter from './src/routes/grabData.routes.js'

env.config();
dbConnect();

const app = express();

app.use(express.json({limit:'50mb',extended:true}));
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  methods:["POST","PATCH","DELETE","GET","PUT"],
  credentials:true
}));

app.use("/api", SetUpRoutes);
app.use("/api",Account)
app.use("/api",Feedback)
app.use('/api/grab',GrabRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
