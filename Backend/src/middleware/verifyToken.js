import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return next(new Error("Access Denied. No token provided."));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new Error("Access Denied. No token provided."));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next(new Error("Invalid token."));
  }
};

export default verifyToken;
