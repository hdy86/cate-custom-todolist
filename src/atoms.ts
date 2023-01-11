import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const TODO_KEY = "toDos";
export const CATEGORIES_KEY = "categories";

const localCategory = localStorage.getItem("categories");
const localCategoryObj = JSON.parse(localCategory ?? "[]");
export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: localCategoryObj.length === 0 ? "" : localCategoryObj[0],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: localCategoryObj,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem(TODO_KEY) ?? "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((item) => item.category === category);
  },
});
