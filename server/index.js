const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const EmployeeModel = require('./models/Employee');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET || "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Error with token" });
            } else {
                if (decoded.role === "admin") {
                    next();
                } else {
                    return res.status(403).json({ error: "Not authorized" });
                }
            }
        });
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/dashboard', verifyUser, (req, res) => {
    res.json({ status: "Success" });
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const existingUser = await EmployeeModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const user = await EmployeeModel.create({ name, email, password: hash });
        res.json({ status: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await EmployeeModel.findOne({ email });
        if (user) {
            const response = await bcrypt.compare(password, user.password);
            if (response) {
                const token = jwt.sign({ email: user.email, role: user.role },
                    process.env.JWT_SECRET || "jwt-secret-key", { expiresIn: '1d' });
                res.cookie('token', token);
                return res.json({ status: "Success", role: user.role });
            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            return res.status(401).json({ error: "No record existed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
