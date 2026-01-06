export const globalErrorHandler = (err, req, res, next) => {
  console.log("coming from global error handler");
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
