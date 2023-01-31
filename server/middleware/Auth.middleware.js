import jwt from "jsonwebtoken";
import UserModal from "../models/Account.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoced = jwt.verify(token, process.env.ACCESS_TOKEN);

    const author = await UserModal.findById(decoced.id);
    req.author = author._id;
    next();
  } catch (error) {
    res.status(500).json({message: "Interval server error",error});  
  }
};

export default auth;

