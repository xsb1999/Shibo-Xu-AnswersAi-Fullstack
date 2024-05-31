const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const cors = require('cors');

const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb+srv://shiboxu09:LsB270mFASXMN6Y9@cluster0.bjlyqlb.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
