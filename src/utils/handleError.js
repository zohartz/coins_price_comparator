const Response = require("../utils/response");
const { STATUS } = require("../utils/constants");

exports.handleError = (req, res, err) => {
  const errorStatus = err.errorCode || 500;
  const errorResponse = new Response(STATUS.ERROR, err.message);
  res.status(errorStatus).send(errorResponse);
};
