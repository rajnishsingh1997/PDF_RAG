const userInputValidation = (req, res, next) => {
  const { question } = req.body;
  if (!question || typeof question !== "string" || question.trim() === "") {
    return next(
      new Error(
        "Invalid input: question is required and must be a non-empty string."
      )
    );
  }
    next();
};

export default userInputValidation;
