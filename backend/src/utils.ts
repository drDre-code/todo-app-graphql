import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface Info {
  [key: string]: string | number;
}
declare module 'express' {
  interface Request {
    user?: Info;
  }
}

export const generateToken = (user: { [key: string]: string; }) => {
  const { _id, name, email, password } = user;
  const pass = process.env.JWT_SECRET || 'takeaguess';
  return jwt.sign({ _id, name, email, password }, pass, { expiresIn: '30d' });
};

export const isAuth = (req:Request) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    const decode = jwt.verify(token, process.env.JWT_SECRET || 'takeaguess')
      if (!decode) {
        return { message: 'Invalid Token' };
      } else {
        return decode;
      }

  } else {
    return { message: 'No Token' };
  }
};

