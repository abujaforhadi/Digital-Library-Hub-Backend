import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

// All the API-endpoints 
app.use(routes);

// base route
app.get('/', (req: Request, res:Response) => {
    res.send('Welcome to Library Management server!');
});

 // error-handler for if no route is found 
app.use(globalErrorHandler);


export default app;