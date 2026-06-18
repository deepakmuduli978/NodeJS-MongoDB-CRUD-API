# NodeJS-MongoDB-CRUD-API
A RESTful Contact Management API built using Node.js, Express.js, MongoDB, and Mongoose. Supports Create, Read, Update, and Delete (CRUD) operations with MongoDB database integration.
# Contact Management API

A simple REST API built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** to perform CRUD operations on contact details.

---

# Project Structure

```bash
project-folder/
│
├── dbconnection/
│   └── dbcon.js
│
├── model/
│   └── contact_details.js
│
├── routes/
│   └── web.js
│
├── node_modules/
│
├── .env
├── package.json
├── package-lock.json
├── server.js
│
└── README.md
```

---

# Step 1: Create Project Folder

```bash
mkdir contact-api
cd contact-api
```

---

# Step 2: Initialize Node Project

```bash
npm init -y
```

This creates:

```bash
package.json
```

---

# Step 3: Install Required Packages

### Express

```bash
npm install express
```

Used to create APIs and routes.

### MongoDB Mongoose

```bash
npm install mongoose
```

Used to connect MongoDB with Node.js.

### Dotenv

```bash
npm install dotenv
```

Used to store environment variables.

### CORS

```bash
npm install cors
```

Used to allow frontend applications to access backend APIs.

---

# Step 4: Create Folder Structure

```bash
mkdir dbconnection
mkdir model
mkdir routes
```

Create files:

```bash
touch server.js
touch .env

touch dbconnection/dbcon.js

touch model/contact_details.js

touch routes/web.js
```

For Windows:

```bash
type nul > server.js
type nul > .env
```

---

# Step 5: Configure MongoDB

Create `.env`

```env
PORT=3000

MONGO_URL=mongodb://localhost:27017/contactdb
```

---

# Step 6: Database Connection

File:

```bash
dbconnection/dbcon.js
```

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
```

### Explanation

- `mongoose.connect()` connects MongoDB.
- `process.env.MONGO_URL` reads URL from `.env`.
- `module.exports` exports the function.

---

# Step 7: Create Model

File:

```bash
model/contact_details.js
```

```javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneno: String,
    city: String,
    address: String
});

module.exports = mongoose.model('Contact', contactSchema);
```

### Explanation

Schema defines:

| Field | Type |
|---------|---------|
| name | String |
| email | String |
| phoneno | String |
| city | String |
| address | String |

---

# Step 8: Create Routes

File:

```bash
routes/web.js
```

```javascript
const express = require('express');
const router = express.Router();

const Contact = require('../model/contact_details');

router.get('/', (req, res) => {
    res.send('Home Page');
});

router.get('/about', (req, res) => {
    res.send('About Page');
});

router.post('/create', async (req, res) => {
    try {
        const newContact = new Contact(req.body);

        const savedData = await newContact.save();

        res.status(201).json(savedData);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
```

### Explanation

- GET `/` → Home Page
- GET `/about` → About Page
- POST `/create` → Insert data into MongoDB

---

# Step 9: Create Main Server

File:

```bash
server.js
```

```javascript
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./dbconnection/dbcon');

const routes = require('./routes/web');

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});
```

### Explanation

- Loads environment variables.
- Connects MongoDB.
- Enables JSON support.
- Loads routes.
- Starts server.

---

# Step 10: Start MongoDB Server

Open Terminal:

```bash
mongod
```

If not added to PATH:

```bash
"C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe"
```

---

# Step 11: Run Project

```bash
node server.js
```

Output:

```bash
MongoDB Connected Successfully
Server Running On Port 3000
```

---

# Step 12: Test API

### Home

```http
GET http://localhost:3000/
```

### About

```http
GET http://localhost:3000/about
```

### Create Contact

```http
POST http://localhost:3000/create
```

JSON Body:

```json
{
  "name": "Deepak",
  "email": "deepak@gmail.com",
  "phoneno": "9876543210",
  "city": "Berhampur",
  "address": "Odisha"
}
```

---

# MongoDB Commands

### Show Databases

```bash
show dbs
```

### Create / Use Database

```bash
use contactdb
```

### Show Collections

```bash
show collections
```

### View Records

```bash
db.contacts.find()
```

### Pretty Format

```bash
db.contacts.find().pretty()
```

### Count Records

```bash
db.contacts.countDocuments()
```

---

# Future APIs

### Get All Contacts

```javascript
router.get('/contacts', async (req,res)=>{
    const data = await Contact.find();
    res.json(data);
});
```

### Get Contact By ID

```javascript
router.get('/contact/:id', async(req,res)=>{
    const data = await Contact.findById(req.params.id);
    res.json(data);
});
```

### Update Contact

```javascript
router.put('/update/:id', async(req,res)=>{
    const data = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(data);
});
```

### Delete Contact

```javascript
router.delete('/delete/:id', async(req,res)=>{
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
        message:"Deleted Successfully"
    });
});
```

---

# Technology Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv
- CORS

---

# Author

Deepak Muduli

MCA Student | MERN Stack Learner