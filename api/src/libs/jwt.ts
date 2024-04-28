import jwt, { JwtPayload } from 'jsonwebtoken'

export const createToken = (content: string | object): string => {
  const jwt_secret = process.env.JWT_SECRET || ''
  return jwt.sign(content, jwt_secret)
}

export const verifyToken = (token: string): JwtPayload | string => {
  const jwt_secret = process.env.JWT_SECRET || ''
  return jwt.verify(token, jwt_secret)
}
