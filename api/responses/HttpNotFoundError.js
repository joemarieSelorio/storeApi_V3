require('app-module-path').addPath(require('app-root-path').toString());

const HttpError = require('api/responses/HttpError');
/**
 * Class to provide uniform instance/formatting
 * for resource not found error responses
 */
class HttpNotFoundError extends HttpError {
  /**
   * @constructor
   * @param {string} message - generic message for resource not found error
   */
  constructor(message = 'Not found ') {
    super(404, 9997, message);
  }
}
module.exports = HttpNotFoundError;
