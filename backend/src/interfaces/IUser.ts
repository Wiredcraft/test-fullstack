/**
 * Database interface of an User.
 */
interface IUser {
    username: string;
    password: string;
    role: string;
}

interface IUserInputDTO {
    username: string;
    password: string;
}

export {IUserInputDTO};
export default IUser;
