import { atom } from "recoil";

interface ITodo {
  startDate: string;
  endDate: string;
  planTitle: string;
  planTarget: string;
  intervalSet: number;
  repeat: string;
  id: number;
}

export const toDoState = atom<ITodo[]>({
  key: "toDoState",
  default: [],
});

export const dateState = atom({
  key: "dateState",
  default: { start: "", end: "" },
});

export const startDateState = atom({
  key: "startDateState",
  default: null,
});

export const endDateState = atom({
  key: "endDateState",
  default: null,
});
