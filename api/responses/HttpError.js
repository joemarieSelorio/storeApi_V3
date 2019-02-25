
/**
 * Class that provides uniform instance/formatting for Http error responses
 * @module HttpError
 */
class HttpError extends Error {
  /**
     * @constructor
     * @param {naumber} status - generic Http status code
     * @param {number} code - Application specific error code
     * @param {string} message - generic error message
     */
  constructor(
      status = 500,
      code = 9999,
      message = 'System error') {
    super();
    this.timestamp = new Date();
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

module.exports = HttpError;
