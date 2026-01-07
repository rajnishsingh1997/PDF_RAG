const userDataValidator = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new Error("Username and password are required."));
  }
  next();
};

export default userDataValidator;
