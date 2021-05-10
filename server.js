const express = require('express');
const connectDB = require('./config/db')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/idea', require('./routes/idea'));
app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'client','build', 'index.html')));
app.listen(PORT, ()=> console.log(`Server listening on port:${PORT}`));