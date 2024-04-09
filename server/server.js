//server

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const userRouter = require('./routes/user.router');
const messageRouter = require('./routes/message.router');
const chatRouter = require('./routes/chat.router');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('user');
});

app.listen(port, () => {
  console.log(`Server is listening at  on port ${port}`);
});

app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use('/chat', chatRouter);

//{ useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://idonice3:2RK38XFi5bRnPF1w@cluster0.7notbsl.mongodb.net/mailbox')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));
