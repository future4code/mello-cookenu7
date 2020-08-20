import * as jwt from "jsonwebtoken";

export class Authenticator {
    static generateToken(arg0: { id: string; role: any; }) {
        throw new Error("Method not implemented.");
    }
    public generateToken(data: AuthenticationData) :string {
        return jwt.sign(
            data,
            process.env.JWT_KEY as string,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
    }

    public getData(token: string) :AuthenticationData {
        const data = jwt.verify(
            token,
            process.env.JWT_KEY as string,
        ) as any;
        return {
            id: data.id,
            role: data.role
        }
    }
}

enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
  }

interface AuthenticationData {
    id: string,
    role: USER_ROLES
}