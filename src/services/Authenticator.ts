import * as jwt from "jsonwebtoken";

export class Authenticator {
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
            id: data.id
        }
    }
}

interface AuthenticationData {
    id: string
}