const express = require('express');
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/idea', require('./routes/idea'));
app.listen(PORT, ()=> console.log(`Server listening on port:${PORT}`));