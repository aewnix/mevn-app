const express = require('express');
const app = express();
const cors = require('cors');
const API = require('./controllers/api');

require('./db');
const PORT = 3070;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/', require('./routes/api-routes'));


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}!`)
});
