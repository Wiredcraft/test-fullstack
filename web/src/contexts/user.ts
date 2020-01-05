import { createContext } from "react";
import { User } from "../typings";

const UserContext = createContext<{
  user?: User;
  setUser: (user?: User) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {}
});

export default UserContext;
