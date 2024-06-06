const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  handler: (req, res, next) => {
    res.status(429).json({
      status: 429,
      message: 'Too many requests from this IP, please try again later'
    });
  }
});

// Apply rate limit to all requests
app.use(limiter);

// Serve static files
app.use(express.static('public'));

// Endpoint to provide scrapable data
app.get('/data', (req, res) => {
  res.json({ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
