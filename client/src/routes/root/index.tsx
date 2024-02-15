import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import Header from "@/components/header";
import List from "@/components/list";

export default function Root() {
  const getMyUser = useUserStore((state) => state.getMyUser);

  useEffect(() => {
    getMyUser();
  }, []);

  return (
    <div>
      <Header />
      <List />
    </div>
  );
}
