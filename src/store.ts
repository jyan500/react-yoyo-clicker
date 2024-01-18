import { configureStore } from "@reduxjs/toolkit" 
import { clickerConfig } from "./reducers/clickerConfig"
import { clicker } from "./reducers/clicker"
import { sideBar } from "./reducers/sideBar" 

export const store = configureStore({
	reducer: {
		clickerConfig,
		sideBar,
		clicker
	}
})

// rely on type inference for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store