export const userDataValidator = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error("email and password are required."));
  }
  next();
};

export const signupUserDataValidator = (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(email, password, name);
  if (!email || !password || !name) {
    return next(new Error("email, password and username are required."));
  }
  next();
};
