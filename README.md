# Online Shop Backend API

A minimalistic backend web application for an online shop with CRUD operations for customers, categories, items, and orders.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Jest and Supertest for testing

## Data Entities

- **Customer**: ID, Name, Surname, Email
- **ShopItemCategory**: ID, Title, Description
- **ShopItem**: ID, Title, Description, Price, Categories
- **OrderItem**: ID, ShopItem, Quantity
- **Order**: ID, Customer, Items (list of OrderItems), Total Amount, Status

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository: