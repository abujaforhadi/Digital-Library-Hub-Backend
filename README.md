# Book 

Book library management system aims to simplify library operations by automating book tracking and borrowing processes. This system offers a structured way to manage books, track borrowing history, and generate summaries of borrowed records, all through a well-organized API. 

## 🚀 Live API
📍 Base URL:https://bookmanagment.vercel.app

## Tech Stack:
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**


## Key features:
1. **Add new books to the library database.**
2. **Retrieve books with optional filters (e.g., by genre-filter, sortBy, sort, limit).**
3. **Fetch a specific book by its unique ID.**
4. **Update existing book details (title, author, copies, etc.).**
5. **Borrowed books Record along with user information.**
6. **Generate summaries of borrowing activity.**


## Dev Dependencies:
    -@types/cors: ^2.8.19,
    -@types/express: ^5.0.3,
    -@types/mongodb: ^4.0.6,
    -ts-node-dev: ^2.0.0,
    -typescript: ^5.8.3,
    

## Dependencies:
    -cors: ^2.8.5,
    -dotenv: ^16.5.0,
    -express: ^5.1.0,
    -mongodb: ^6.17.0,
    -mongodb: ^8.16.0


## Installation:
1. **First, clone the repository to your local machine. you can do this by downloading the zip file or by cloning it using the web URL**
2. **Navigate to the project folder and open it with cmd terminal**
3. **Write <code>npm i</code> in the terminal. This will install all the necessary packages on your system**
4. **Create a file name <code>.env</code>, inside the project root folder**
5. **Save your MongoDB uri here as environment variables in this file:**
    - **DATABASE_URL=your-mongoDb-uri**
6. **After the installation is complete, start the application by typing <code>npm run dev</code> in terminal**

- **You should now be able interact with the application on your local machine!**


### Add new Book:
    POST -/api/books

### Get All Books:
    GET -/api/books

### Get Flitted Books:
    GET -/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

### Get Specific Book By Id:
    GET -/api/books/:bookId

### Update Book Information:
    PUT -/api/books/:bookId

### Delete Book:
    DELETE -/api/books/:bookId

### Borrow Books:
    post -/api/borrow

### Summary Of Borrowed Books:
    GET -/api/borrow


