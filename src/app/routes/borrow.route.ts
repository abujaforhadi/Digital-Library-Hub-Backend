import { Router } from "express";
import { borrowedController } from "../controllers/borrow.controller";


export const borrowedRoutes = Router();

borrowedRoutes.post('/borrow', borrowedController.borrowBook); // borrow book route
borrowedRoutes.get('/borrow', borrowedController.borrowedSummary); // borrowed book summary route

