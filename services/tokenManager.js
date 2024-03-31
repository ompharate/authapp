import jwt from "jsonwebtoken"

export const getToken = (user) => {
    const token = jwt.sign({user},process.env.JWT_SECRET_KEY)
    return token;
}

export const verifyToken = (token) => {
    const user = jwt.verify(token,process.env.JWT_SECRET_KEY);
    return user;
}