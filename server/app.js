const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 3070;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/', require('./routes/api-routes'));


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}!`)
});
