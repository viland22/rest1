const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const data = require('./data');

// Membuat koneksi ke MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
  });

// Menghubungkan ke MySQL saat server Express.js dijalankan
connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database');
    }
  });

app.get('/lagulist', (req, res) => {
    connection.query('SELECT * FROM vw_lagulist', (error, results) => {
        if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.json(results);
        }
    });
}); 

app.get('/bandlist', (req, res) => {
    connection.query('SELECT * FROM vw_bandlist', (error, results) => {
        if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.json(results);
        }
    });
}); 

app.get('/lagulist/:id', (req, res) => {
    const NotId = req.params.id;
    connection.query('SELECT * FROM vw_lagulist where id = ?',[NotId], (error, results) => {
        if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.json(results);
        }
    });
}); 

app.get('/lagudata', (req, res) => {
    console.log(data);
    res.json(data); 
});

app.get('/user', (req, res) => {
  const user = {
    name: 'John Doe',
    profileImage: '/uploads/profile.jpg'
  };

  res.json(user);
});

// Menyajikan gambar dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Menjalankan server
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
