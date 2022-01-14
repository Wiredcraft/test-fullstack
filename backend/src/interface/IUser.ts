/**
 * Database interface of an User.
 */
interface IUser {
    name: string
    password: string
}

interface IUserInputDTO {
    name: string
    password: string
}

export {IUserInputDTO};
export default IUser;
