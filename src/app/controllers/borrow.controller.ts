import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

// borrow book
const borrowBook = async (req: Request, res: Response): Promise<any> => {
    try {
        const { book, quantity } = req.body;

        // book quantity check
        const checkAvailability = await Borrow.handleBookQuantity(book, quantity);
        if (!checkAvailability) {
            return res.status(400).send(
                {
                    success: false,
                    message: "Not enough copies available. Book borrow unsuccessful."
                }
            );
        }

        const borrowed = await Borrow.create(req.body);
        res.status(200).send(
            {
                success: true,
                message: "Book borrowed successfully",
                data: {
                    "_id": borrowed._id,
                    "book": borrowed.book,
                    "quantity": borrowed.quantity,
                    "dueDate": borrowed.dueDate,
                    "createdAt": borrowed.createdAt,
                    "updatedAt": borrowed.updatedAt
                }
            }
        );

    } catch (error) {
        const err = error as any;
        res.status(400).send(
            {
                success: false,
                message: "Error Occurred",
                errors: err.errors
            }
        );
    }
}

// borrowed summary
const borrowedSummary = async (req: Request, res: Response) => {
    try {
        const summery = await Borrow.aggregate(
            [
                {
                    $lookup: {
                        from: 'books',               
                        localField: 'book',  
                        foreignField: '_id',        
                        as: 'borrowedBooks'             
                    }
                },
                {
                    $unwind: '$borrowedBooks'
                },
                {
                    $group: {
                        _id: '$book',
                        book: {
                            $addToSet: {
                                title: '$borrowedBooks.title',
                                isbn: '$borrowedBooks.isbn'
                            }
                        },  
                        totalQuantity: { $sum: '$quantity' },
                    }
                },
                {
                    $unwind: '$book'
                },
                {
                    $project: {
                        _id: 0,
                        book: '$book',                
                        totalQuantity: '$totalQuantity',       
                    }
                }
            ]
        );

        res.status(200).send(
            {
                success: true,
                message: "Borrowed books summary retrieved successfully",
                data: summery
            }
        );

    } catch (error) {
        const err = error as any;
        res.status(400).send(
            {
                success: false,
                message: "Error Occurred",
                errors: err.errors
            }
        );
    }
}


export const borrowedController = {
    borrowBook,
    borrowedSummary
};
