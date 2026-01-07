export const userDataValidator = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error("email and password are required."));
  }
  next();
};

export const signupUserDataValidator = (req, res, next) => {
  const { email, password, name } = req.body;
 
  if (!email || !password || !name) {
    return next(new Error("email, password and name are required."));
  }
  next();
};
