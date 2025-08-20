const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// This will handle the preflight OPTIONS request
app.options('/contact', cors());

// This will handle the actual POST request
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint
app.post('/contact', (req, res) => {
  const timestamp = new Date().toISOString();
  console.log("📩 Form data received:", req.body);
  console.log("🕒 Recieved at:", timestamp);
  res.json({ success: true, message: "Message received!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});