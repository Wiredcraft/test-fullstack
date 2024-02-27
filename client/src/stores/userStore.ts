import { create } from "zustand";
import { getMyInfo, login } from "@/services/users";

export type User = {
  name: string;
  id: number;
  email: string;
};

type State = {
  user: User | null;
  getMyUser: () => void;
};

export const useUserStore = create<State>((set) => ({
  user: null,
  getMyUser: async () => {
    try {
      const userRes = await getMyInfo();
      if (userRes) {
        const { id, email, name } = userRes;
        set({
          user: {
            id,
            name,
            email,
          },
        });
      }
    } catch (err) {}
  },
}));
