import { create } from "zustand";
import { getVotes } from "@/services/votes";

export type ListItem = {
  title: string;
  id: number;
};

type State = {
  list: ListItem[];
  limit: number;
  total: number;
  offset: number;
  init: () => void;
};

export const useListStore = create<State>((set) => ({
  list: [],
  limit: 10,
  total: 0,
  offset: 0,
  init: async () => {
    const voteRes = await getVotes();
    const newList: ListItem[] = voteRes.map((item) => ({
      title: item.title,
      id: item.id,
    }));
    set({ list: newList });
  },
}));
