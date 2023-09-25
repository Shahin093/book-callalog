My Project Name : Book Catalog
###Live Link : https://book-catallog-assginment-8.vercel.app/api/v1/
###github Repo Link :https://github.com/Shahin093/book-callalog-assignment-8

## API End points

## Implement Create, Read, Update, and Delete Operations for Users Listing

### User Sign Up

Route: /api/v1/auth/signup (POST)

### User Login

Route: /api/v1/auth/signin (POST)
You can create accessToken and RefreshToken.

### Get All Users → Only Allowed For Admin

Route: /api/v1/users (GET)

### Update a Single User → Only Allowed For Admin

Route: /api/v1/users/4a93d8a9-3327-40d8-ba08-d39813902eb9 (PATCH)

### Get a Single User → Only Allowed For Admin

Route: /api/v1/users/4a93d8a9-3327-40d8-ba08-d39813902eb9 (GET)

### Delete a Single User → Only Allowed For Admin

Route: /api/v1/users/62554621-66f8-44fd-918a-9dede76c2534 (DELETE)

## Category:

Route: /api/v1/categories/create-category (POST) → Only Allowed For Admin
Route: /api/v1/categories (GET)
Route: /api/v1/categories/:id (GET)

### Update a Category → Only Allowed For Admin

Route: /api/v1/categories/ca40ee6b-9552-4844-baf9-8d8fed99d6d1 (PATCH)

### Delete a Category → Only Allowed For Admin

Route: /api/v1/categories/:id ( DELETE)

## Implement Create, Read, Update, and Delete Operations for Book listings.

### ### Delete a Category → Only Allowed For Admin

Route: /api/v1/categories/b36fc850-1b5b-4bfa-a0c5-649cda41ddc7 ( DELETE)

### Create a New Book

Route: /api/v1/books/create-book (POST) → Only Allowed For Admin

{
"title": "The Catcher in the Rye",
"author": "J.D. Salinger",
"genre": "Fiction",
"price": 350.75,
"publicationDate": "1951-07-16T00:00:00Z",
"categoryId": "46043382-e9a7-406b-9521-39652e7c4733"
}

###Get All Books
Route: /api/v1/books (GET)

### Get Books By CategoryId

Route: /api/v1/books/:categoryId/category (GET)

### Update a Single Book → Only Allowed For Admin

Route: /api/v1/books/:id (PATCH)

### Delete a book → Only Allowed for admins

Route: /api/v1/books/:id ( DELETE)

## Implement Create, Read Operations for Order Listings.

### Create Order → Only Allowed For Customer

Route: /api/v1/orders/create-order (POST)

### Get all Orders → Only Allowed For Admins

Route: /api/v1/orders (GET)

### Get single Order → Only Allowed For customer

Route: /api/v1/6a3449d5-fc0a-4e75-b7b4-5e7f594008f1 (GET)
