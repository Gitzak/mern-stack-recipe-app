const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  // check mongoose object id:
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: err.stack,
  });
};

module.exports = { errorHandler };
