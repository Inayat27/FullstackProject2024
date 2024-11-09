import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors'
import {userRoute,ChatServiceRoute} from '../src/Routes'
import { run } from './db';

const app = express();
const port = 3000;

// running the database
run();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))


app.use("/api/v1",userRoute)
app.use("/api/v1",ChatServiceRoute)


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


