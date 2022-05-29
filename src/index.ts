import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import multer from "multer";
import dotenv from 'dotenv';
import {ResponseObject} from "./class/ResponseObject";


// Routes
import loginRouter from "./routes/login/login";
import registerRouter from './routes/register/register';
import scoreRouter from './routes/score/score';
import groupsRouter from "./routes/groups/groups";
import uploadsRouter from "./routes/uploads/uploads";

// Import .env variables
dotenv.config();

// Setup app environment
const PORT = process.env.PORT || 3000;
const app: Express = express();

// Storage solution
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 25 * 1024 * 1024,
    }
});


// Use bodyParser for api
app.disable('x-powered-by');
app.use(multerMid.single('file'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login route
app.use('/login', loginRouter);

// Register route
app.use('/register', registerRouter);

// Score route
app.use('/score', scoreRouter);

// Groups route
app.use('/groups', groupsRouter);

// Uploads route
app.use("/uploads", uploadsRouter);

// Server status endpoint
app.post('/', (req: Request, res: Response) => {
    let response : ResponseObject = {
        data : "Server is active",
        success : true,
        user: null
    }
    res.send(response);
});

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

const server = app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

function shutDown() : void{
    console.log("Shutting down the server");
    process.kill(process.pid, "SIGINT");
    server.close(() => {
        console.log("Server has been shutdown");
        process.exit(0);
    });
}


