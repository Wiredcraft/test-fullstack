export class User {
    username: string;
    jwt?: {
        accessToken: string;
        expiresIn: string;
    };
}
