require('dotenv').config();
const express = require('express');
const routes = require('./interfaces/routes');
const errorHandler = require('./shared/errors/errorHandler');
const requestLogger = require('./interfaces/middlewares/requestLogger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
