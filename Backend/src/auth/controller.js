import { LoginRequest, RegisterRequest } from "./models.js";
import {db} from "../index.js";
import {users} from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createToken } from "../utilities/token.js";
class AuthController {
    async handleRegister(req, res) {
        try {
            const { email, password, name } = RegisterRequest.parse(req.body);
            const existingUser = await db
                          .select()
                        .from(users)
                        .where(eq(users.email, email));
            if (existingUser.length > 0) {
                return res.status(400).json({ message: "Email already in use" });
            }
            const token = createToken({ id: email });
            const newUser = await db.insert(users).values({ email, password, name }).returning();
            //res.status(201).json({ ...newUser[0] });
             res.status(201).json({ ...newUser[0], token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async handleLogin(req, res) {
        try {
            const { email, password } = LoginRequest.parse(req.body);
            const user = await db.select().from(users).where(eq(users.email, email));
            if (user.length === 0 || user[0].password !== password) {
                return res.status(401).json({
                message: "Invalid email or password"
             });
    }
            res.status(200).json({ message: "Login successful", user: user[0] });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}
export default AuthController;