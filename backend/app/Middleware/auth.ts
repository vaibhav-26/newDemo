import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = <string>req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let jwtPayload;
  if (token == null) return res.sendStatus(401);
  try {
    jwtPayload = <any>jwt.verify(token, process.env.TOKEN_SECRET!);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }
  next();
};

export default authenticateToken;