const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('develop/public'));

const htmlRouter = require('./Routes/htmlRoutes');
const apiRouter = require('./Routes/apiRoutes');

app.use('/', htmlRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
