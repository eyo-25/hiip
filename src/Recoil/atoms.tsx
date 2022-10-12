import { atom, selector } from "recoil";
const Moment = require("moment");

export interface ITodo {
  startDate: string;
  endDate: string;
  planTitle: string;
  planTarget: string;
  intervalSet: any;
  creatorId?: any;
  creatorAt?: any;
  repeat: any;
  id: any;
  status: string;
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});

export const editPopupState = atom({
  key: "editPopupState",
  default: false,
});

export const nowDateState = atom({
  key: "nowDateState",
  default: Moment().format("YYYY-MM-DD"),
});

export const startDateState = atom<any>({
  key: "startDateState",
  default: null,
});

export const startDateStatus = atom<any>({
  key: "startDateStatus",
  default: null,
});

export const startChange = selector<any>({
  key: "startChange",
  get: ({ get }) => {
    const oldStartDate = get(startDateStatus);
    if (oldStartDate) {
      return new Date(oldStartDate.split("-"));
    }
    return null;
  },
  set: ({ set }, newValue) => {
    const Moment = require("moment");
    let newStartDate = newValue;
    if (newValue !== null) {
      newStartDate = Moment(newValue).format("YYYY-MM-DD");
    }
    set(startDateStatus, newStartDate);
  },
});

export const endDateStatus = atom<any>({
  key: "endDateStatus",
  default: null,
});

export const endChange = selector<any>({
  key: "endChange",
  get: ({ get }) => {
    const oldEndDate = get(endDateStatus);
    if (oldEndDate !== null) {
      return new Date(oldEndDate.split("-"));
    }
    return null;
  },
  set: ({ set }, newValue) => {
    const Moment = require("moment");
    let newEndDate = newValue;
    if (newValue !== null) {
      newEndDate = Moment(newValue).format("YYYY-MM-DD");
    }
    set(endDateStatus, newEndDate);
  },
});

export const endDateState = atom<any>({
  key: "endDateState",
  default: null,
});

export const clickState = atom<any>({
  key: "clickState",
  default: 0,
});

export const readyState = atom<any>({
  key: "readyState",
  default: {
    readyId: "",
    status: false,
  },
});

export const indexState = atom<any>({
  key: "indexState",
  default: 0,
});

export const timeState = atom<any>({
  key: "timeState",
  default: {
    setIntervalSet: 0,
    setBreakSet: 0,
    intervalSet: 0,
    breakSet: 0,
    min: 0,
    sec: 0,
    breakMin: 0,
    breakSec: 0,
    setMin: 0,
    setSec: 0,
    setBreakMin: 0,
    setBreakSec: 0,
    breakMSec: 0,
    mSec: 0,
  },
});

export const counterState = atom<any>({
  key: "counterState",
  default: false,
});
