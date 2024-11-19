const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({
    origin: '*', // Allow all origins
}));
app.use(bodyParser.json());

const {Client} = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
})
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));

    app.get('/getuser', async (req, res) => {
        try {
            const results = await client.query('SELECT * FROM users');
            res.json(results.rows); // Send rows to the client
        } catch (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        }
    });

    app.post('/adduser', async (req, res) => {
        try {
            const { email, pass } = req.body;
            console.log(email, pass);
            
            // Validate inputs
            if (!email || !pass ) {
                return res.status(400).send('All fields (email, pass) are required.');
            }
    
            // Parameterized INSERT query
            const query = 'INSERT INTO users (email, pass) VALUES ($1, $2)';
            const values = [email, pass];
    
            // Execute query
            await client.query(query, values);
            res.status(201).send('User added successfully');
        } catch (err) {
            console.error('Error inserting user:', err.stack);
            res.status(500).send('Internal Server Error');
        }
    });

    app.post('/signin', async (req, res) => {
        try {
            const { email, pass } = req.body;
            
            // Validate inputs
            if (!email || !pass) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Email and password are required' 
                });
            }
    
            // Query to check if user exists with provided credentials
            const query = 'SELECT * FROM users WHERE email = $1 AND pass = $2';
            const values = [email, pass];
    
            const result = await client.query(query, values);
    
            if (result.rows.length > 0) {
                // User found - login successful
                res.status(200).json({ 
                    success: true, 
                    message: 'Login successful',
                    user: {
                        email: result.rows[0].email,
                        // Add any other user data you want to send
                        // Don't send sensitive information like passwords
                    }
                });
            } else {
                // No user found with those credentials
                res.status(401).json({ 
                    success: false, 
                    message: 'Invalid email or password' 
                });
            }
        } catch (err) {
            console.error('Error during signin:', err.stack);
            res.status(500).json({ 
                success: false, 
                message: 'Internal Server Error' 
            });
        }
    });

    app.post('/adduserprofile', async (req, res) => {
        console.log(req.body)
        const { email, date_of_birth, gender, weight, height, goal } = req.body; // Extract values from the request body
        console.log(email, date_of_birth, gender, weight, height, goal); // For debugging purposes
        try {
            // Insert query to add a new user profile
            const query = 'INSERT INTO user_profile (email, date_of_birth, gender, weight, height, goal) VALUES ($1, $2, $3, $4, $5, $6)';
            const values = [email, date_of_birth, gender, weight, height, goal];
    
            // Execute the query
            await client.query(query, values);
    
            // Respond with success
            res.status(201).json({
                success: true,
                message: 'User profile added successfully',
                user: {
                    email,
                    date_of_birth,
                    gender,
                    weight,
                    height,
                    goal
                }
            });
        } catch (err) {
            console.error('Error during adding user profile:', err.stack);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    });
    
app.listen(3000, ()=>{console.log('listening on on 3000')});