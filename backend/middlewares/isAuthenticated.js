import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token hain ye : ",token);
    if (!token) {
      return res.status(401).json({ message: "unauthorized", success: false });
    }
    localStorage.setItem('token', response.data.token);
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "invalid token", success: false });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;