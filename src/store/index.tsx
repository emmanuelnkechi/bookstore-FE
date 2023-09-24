import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { generalApi } from "../services";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";



const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth", "bulkProduct"],
  };


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(generalApi.middleware)

  });
  
  export const persistor = persistStore(store);
  
  export default store;