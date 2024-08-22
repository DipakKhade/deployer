import express from 'express';
import { uploadToS3Router } from './routes/uploadToS3';
import { userRouter } from './routes/User';
import { FRONTEND_URL, PORT } from './lib/exports';
import cors from 'cors'
import { authMiddleware } from './middlewares/auth';

const app = express();

app.use(cors({
    origin:FRONTEND_URL,
    credentials:true
}))
app.use(express.json())

app.use('/api/v1/user',userRouter)
app.use(authMiddleware)
app.use('/api/v1/upload',uploadToS3Router)



app.listen(process.env.PORT || PORT , ()=>console.log(`uploader is up on PORT ${PORT}`));

