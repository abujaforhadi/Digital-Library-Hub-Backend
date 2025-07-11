import { Router } from "express";
import { bookController } from "../controllers/book.controller";

export const bookRoutes = Router();

bookRoutes.post('/books', bookController.addBook); // add new book route
bookRoutes.get('/books', bookController.getBooks); // getting all the books route
bookRoutes.get('/books/:bookId', bookController.getBookById); // getting book-by-id route
bookRoutes.put('/books/:bookId', bookController.updateBook); // updating book-by-id route
bookRoutes.delete('/books/:bookId', bookController.deleteBook); // deleting book-by-id route
