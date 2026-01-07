const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(("in loginController", email, password));
  } catch (error) {
    console.log("Error in loginController:", error);
    next(error);
  }
};
 export default  loginController
