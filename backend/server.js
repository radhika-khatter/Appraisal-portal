const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

connectToMongo();

app.use(cors());
app.use(express.json());

// Ensure the routes are correctly set
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
