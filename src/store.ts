import { configureStore } from "@reduxjs/toolkit" 
import { clickerConfig } from "./reducers/clickerConfig"
import { clicker } from "./reducers/clicker"
import { sideBar } from "./reducers/sideBar" 
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
}

export const store = configureStore({
	reducer: {
		"clickerConfig": persistReducer(persistConfig, clickerConfig),
		"sideBar": persistReducer(persistConfig, sideBar),
		"clicker": persistReducer(persistConfig, clicker)
	}
})

// rely on type inference for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
export const persistor = persistStore(store)