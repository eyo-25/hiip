import { atom } from "recoil";

export interface ITodo {
  startDate: any;
  endDate: any;
  planTitle: any;
  planTarget: any;
  intervalSet: any;
  creatorId?: any;
  creatorAt?: any;
  repeat: any;
  id: any;
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
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

export const editPopupState = atom({
  key: "editPopupState",
  default: false,
});
