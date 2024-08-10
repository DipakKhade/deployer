import express from 'express'
import { uploadToS3Router } from './routes/uploadToS3';

const PORT = 3000
const app = express();

app.use(express.json())

app.use('/api/v1/upload',uploadToS3Router)



app.listen(process.env.PORT || PORT , ()=>console.log(`uploader is up on PORT ${PORT}`))