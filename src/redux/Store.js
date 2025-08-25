import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import UserSlice from "./UserSlice";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};
const persistUserReducer = persistReducer(persistConfig, UserSlice);
export const Store = configureStore({
  reducer: {
    user: persistUserReducer,
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[
                "persist/PERSIST"
            ]
        }
    })
  }
});
export const persistor=persistStore(Store)
