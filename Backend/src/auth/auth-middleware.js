import { verifyToken } from "../uitilites/token";

export function authMiddleware() {
    return function(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const payload = verifyToken(token);
            req.user = payload;
            
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
        }
    }




    
}
