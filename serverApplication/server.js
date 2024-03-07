const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');   
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/user')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Route to insert user data
app.post('/users', async (req, res) => {
  
  const { firstName, lastName } = req.body;
  console.log(`request called : ${firstName} , ${lastName}`)

  if (!firstName || !lastName) {
    return res.status(400).send('Name and Family are required');
    }

    try {
    const newUser = new User({ firstName, lastName });
    await newUser.save();

    const userData = `${firstName},${lastName}\n`;
    const filePath = path.join(__dirname, 'data', 'users.txt');
    fs.appendFile(filePath, userData, (err) => {
      if (err) {
          console.error('Error writing to file:', err);
      } else {
          console.log('User data saved successfully.');
      }
  });

    res.status(200).json(newUser);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});


app.get('/users', async (req, res) => {
    console.log('fetch users data');
    try {
      const users = await User.find();
      res.status(200).json({
        users: users.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        })),
      });
      console.log('fetched users');
    } catch (err) {
      console.error('error fetching users');
      console.error(err.message);
      res.status(500).json({ message: 'failed to load users.' });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
