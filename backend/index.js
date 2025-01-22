// Import necessary modules
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

// Define constants
const salt = 10;
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true
}));

// Serve static files from the public directory
app.use(express.static('public'));

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Received token:", token); // Log the received token
    if (!token) {
        console.log("No token found."); // Log if no token is found
        return res.status(401).json({ Error: "You are not authorized" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                console.error("Error verifying token:", err); // Log any errors in token verification
                return res.status(401).json({ Error: "Token not correct" });
            } else {
                console.log("Decoded token:", decoded); // Log the decoded token
                req.id = decoded.id;
                req.name = decoded.name;
                next();
            }
        });
    }
};

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1349",
    database: "signup"
});

// Register route
app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ Error: "Error hashing password" });
        }

        const sql = "INSERT INTO user(`name`, `email`, `password`) VALUES(?, ?, ?)";
        const values = [req.body.name, req.body.email, hash];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).json({ Error: "Error inserting data" });
            }
            return res.json({ Status: "success" });
        });
    });
});
app.post('/newsletter', (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({ Error: "Email is required" });
    }

    const sql = "INSERT INTO newsletter(`email`) VALUES(?)";
    const values = [req.body.email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ Error: "Error inserting data" });
        }
        return res.json({ Status: "success" });
    });
});

app.post('/signin', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ Error: "Email and password are required" });
    }

    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ Error: "Error querying database" });
        }

        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.status(500).json({ Error: "Error comparing passwords" });
                }

                if (response) {
                    const { id, name } = data[0];
                    const token = jwt.sign({ id, name }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
                    console.log("Token set in cookie:", token); // Log the token being set
                    return res.json({ Status: "success" });
                } else {
                    return res.json({ Error: "Password not matching" });
                }
            });
        } else {
            return res.json({ Error: "Email does not exist" });
        }
    });
});


// Logout route
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "successful" });
});

// ShowProduct route
app.get('/ShowProduct', (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ Error: "Error fetching data" });
        }
        return res.json({ Status: "success", products: result });
    });
});

// Post products to UserCart
app.post('/UserCart', (req, res) => {
    const sql = `INSERT INTO usercart (Userid, pName, img, des, PP, quantity, totalP) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [req.body.Userid, req.body.pName, req.body.img, req.body.des, req.body.PP, req.body.quantity, req.body.totalP];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ Error: "Duplicate entry for user cart" });
            } else {
                return res.status(500).json({ Error: "Database error occurred" });
            }
        }

        return res.json({ Status: "success" });
    });
});

app.get('/ShowUserCart', verifyUser, (req, res) => {
    const userId = req.id; // Get the authenticated user ID from the request object

    const sql = "SELECT * FROM usercart WHERE Userid = ?"; // Fetch user-specific cart items

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching user cart:", err);
            return res.status(500).json({ Error: "Error fetching user cart" });
        }
        return res.json({ Status: "success", cart: result });
    });
});

// ShowProduct by ID route
app.get('/ShowProduct/:productId', (req, res) => {
    const productId = req.params.productId; // Get the product ID from the request parameters
  
    const sql = "SELECT * FROM products WHERE id = ?"; // Adjust your table name and column as necessary
  
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error("Error fetching product:", err);
        return res.status(500).json({ Status: "error", Error: "Error fetching product" });
      }
      if (result.length > 0) {
        return res.json({ Status: "success", product: result[0] });
      } else {
        return res.status(404).json({ Status: "error", Error: "Product not found" });
      }
    });
  });
  
  app.post('/addReview', verifyUser, (req, res) => {
    const { productId, review, rating } = req.body;
    const userId = req.id; // Get the authenticated user ID from the request object

    const sql = "INSERT INTO addreview (productId, userId, review, rating) VALUES (?, ?, ?, ?)";
    const values = [productId, userId, review, rating];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error adding review:", err);
            return res.status(500).json({ Error: "Error adding review" });
        }
        return res.json({ Status: "success" });
    });
});


// Auth route to check if the user is authenticated
app.get('/authenticate', verifyUser, (req, res) => {
    return res.json({ user: { id: req.id, name: req.name } });
});
// Show reviews for a specific product route
app.get('/ShowReviews/:productId', (req, res) => {
    const productId = req.params.productId; // Get the product ID from the request parameters

    const sql = "SELECT * FROM addreview WHERE productId = ?"; // Adjust your table name and column as necessary

    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error("Error fetching reviews:", err);
            return res.status(500).json({ Status: "error", Error: "Error fetching reviews" });
        }
        return res.json({ Status: "success", reviews: result });
    });
});

// Start the server
app.listen(8800, () => {
    console.log("Server running on port 8800");
});
