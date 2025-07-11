import { Router } from "express";
import { bookRoutes } from "./book.route";
import { borrowedRoutes } from "./borrow.route";

const routes = Router();

routes.use('/api', bookRoutes); // book API-endpoint
routes.use('/api', borrowedRoutes); // borrow API-endpoint

export default routes;