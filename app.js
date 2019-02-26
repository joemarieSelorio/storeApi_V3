require('app-module-path').addPath(require('app-root-path').toString());
require('dotenv').config();

const HttpError = require('api/responses/HttpError');
const {HOST, USERNAME, PASSWORD, DATABASE} = process.env;
const {createConnection} = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('api/utilities/logger');
const app = express();

const connection = createConnection({
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
});

connection.connect((err)=>{
  if (err) {
    logger.error(err.message);
    return;
  }
  logger.info('mysql intiatated');
});

app.use(bodyParser.json());
app.use('/api/supplies/',
    require('api/routes/SuppliesRoutes'), _processResponse);

/**
 * Uniform JSON response object sendin
 * @param {objec} req - Request object
 * @param {oject} res - Response object
 * @return {function} - Function call to send response to user
 */
function _processResponse(req, res) {
  return res.status(res.locals.respObj.status).json(res.locals.respObj);
}

app.use((error, req, res, next)=>{
  if (!(error instanceof HttpError)) {
    const errorObj = new HttpError();
    return res.status(errorObj.status).json(error);
  } else {
    return res.status(error.status).json(error);
  }
});

app.listen(process.env.PORT || 8080, ()=>{
  logger.info(`Listening to port ${process.env.PORT}`);
});


