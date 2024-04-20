const express = require('express');
const cors = require('cors');

require('./db/mongoose');
require('dotenv').config();


const userRouter = require('./routes/user');
//------Main App------//

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
