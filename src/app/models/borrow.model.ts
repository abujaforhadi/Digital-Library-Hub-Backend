import { model, Schema } from "mongoose";
import { BorrowBook, IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow, BorrowBook>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Please provide a valid book-id."]
    },
    quantity: {
        type: Number,
        required: [true, "Please provide quantity."],
        min: [0, 'Quantity have to be a positive number, got {VALUE}'], 
    },
    dueDate: {
        type: Date,
        required: [true, "Please provide the book returned date."],
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

// For checking book quantity  
borrowSchema.static("handleBookQuantity", async function (bookId: string, bookQuantity: number): Promise<boolean> {

    const book = await Book.findById(bookId);

    // If book isn't found or book copies are insufficient
    if (!book || book.copies < bookQuantity) {
        return false;
    }

    // update book quantity if book is borrowed
    await Book.findByIdAndUpdate(bookId, { $inc: { copies: -bookQuantity } },{new: true}
    );
    return true;
});

// Post Hook: for changing book available status
borrowSchema.post('save', async function (doc, next) {
    const book = await Book.findById(doc.book);
    if (book && book.copies === 0) {
        await Book.findByIdAndUpdate(doc.book, { available: 'false' }, { new: true }); 
    }
    next();
});

export const Borrow = model<IBorrow, BorrowBook>('Borrow', borrowSchema);

    