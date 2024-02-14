import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { Link } from "react-router-dom";

export default function HeaderUser() {
  const user = useUserStore((state) => state.user);
  const getMyUser = useUserStore((state) => state.getMyUser);

  useEffect(() => {
    getMyUser();
  }, []);

  if (!user) {
    return <Link to={"/login"}>login</Link>;
  }
  return <a>{user.name}</a>;
}
