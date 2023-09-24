import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { generateId } from "../utils";
import {
  hideToast,
  messageType,
  removeToast,
  toastMessage,
} from "./slice/ToasterSlice";
import store from "./index";
import type { RootState, AppDispatch } from "./store.types";



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const getToken = () => store.getState().auth.token;

// show toaster function
export const showToast = (
  text: string,
  messageType?: messageType,
  duration: number = 3000
) => {
  const id = generateId();
  store.dispatch(
    toastMessage({
      text,
      messageType: messageType || "success",
      id,
    })
  );
  setTimeout(() => {
    closeToast(id);
  }, duration);
};


// close toaster
export const closeToast = (id: string) => {
  store.dispatch(removeToast(id));
  setTimeout(() => {
    store.dispatch(removeToast(id));
  }, 700);
};




