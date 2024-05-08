import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from "./slices/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
    key: 'persistStorage',
    storage,
    whiteList: ['accessToken']
};

const store = configureStore({
    reducer:{
        reminders: persistReducer<ReturnType<typeof reminderReducer>>(persistConfig, reminderReducer)
    },
});
export default store;