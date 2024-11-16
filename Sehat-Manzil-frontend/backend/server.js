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

app.listen(3000, ()=>{console.log('listening on on 3000')});