import JWT from "jsonwebtoken";
dotenv.config();
import dotenv from "dotenv";
// interface UserTokenPayload{
//     id: string;
// }

const jwtSecret = process.env.JWT_SECRET_KEY;

export function createToken(payload){
    const token = JWT.sign(payload,jwtSecret)
    return token
}

export function verifyToken(token){
    try{
        const payload = JWT.verify(token,jwtSecret)
        return payload

    }
    catch(error){
        throw new Error("Invalid token")
    }

}
