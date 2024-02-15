import Header from "@/components/header";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

export default function User() {
  const user = useUserStore((state) => state.user);
  const getMyUser = useUserStore((state) => state.getMyUser);

  useEffect(() => {
    getMyUser();
  }, []);

  return (
    <div>
      <Header />
      <div>{user?.email}</div>
      <div>{user?.name}</div>
    </div>
  );
}
